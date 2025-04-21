from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
import jwt

from datetime import datetime, timedelta
from typing import Optional

from config import settings
from database import SessionLocal, get_db
from models.user import User
from services.auth import get_or_create_user, get_current_user
from utils.oauth import exchange_code_for_token, verify_id_token

router = APIRouter(prefix='/auth',tags=['Auth'])

@router.get("/callback")
async def google_auth_callback(code: Optional[str] = None , error: Optional[str] = None, db: Session = Depends(get_db)):
    try:
        if error == "access_denied":
            return RedirectResponse(url="http://localhost:3000/login")
        id_token_value = await exchange_code_for_token(code)
        
        user_info = verify_id_token(id_token_value)

        user = get_or_create_user(db, user_info)

        payload = {"sub": user.id, "email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)}
        token = jwt.encode(payload, settings.secret_key, algorithm="HS256")

        response = RedirectResponse(url="http://localhost:3000")
        response.set_cookie(
            settings.cookie_token, 
            token, 
            httponly=True, 
            secure=True,
            samesite="Strict",
            max_age=60 * 60
        )

        return response

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error during Google OAuth callback: {str(e)}")
    
@router.get("/me")
async def me(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return JSONResponse({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "picture": user.picture,
            "created_at": user.created_at.isoformat(),
        })

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/logout")
async def logout(response: JSONResponse, user: User = Depends(get_current_user)):
    try:
        response.delete_cookie(settings.cookie_token)
        
        return JSONResponse({"message": "Logged out successfully"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")