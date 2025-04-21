from fastapi import Header, HTTPException, Depends,Request
from sqlalchemy.orm import Session
import jwt

from config import settings
from database import get_db
from models.user import User

def get_or_create_user(db: Session, user_info: dict) -> User:
    user = db.query(User).filter_by(id=user_info["sub"]).first()
    if not user:
        user = User(
            id=user_info["sub"],
            name=user_info["name"],
            email=user_info["email"],
            picture=user_info.get("picture")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user
        
def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get(settings.cookie_token)
    if not token:
        raise HTTPException(status_code=401, detail="Missing auth token")

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = db.query(User).filter_by(id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))