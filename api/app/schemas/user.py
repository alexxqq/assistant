from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    name: str | None = None
    picture: str | None = None

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: int
    provider: str

    class Config:
        orm_mode = True
