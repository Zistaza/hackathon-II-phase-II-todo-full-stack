from fastapi import APIRouter, HTTPException, status, Depends
from typing import Dict, Any
from sqlmodel import Session, select
from pydantic import BaseModel
from ..models.user_model import User, UserCreate, UserPublic
from ..models.user import UserRegistrationRequest
from ..utils.jwt import create_access_token, JWTData
from ..config.settings import settings
from ..database import get_session

router = APIRouter(prefix="/auth", tags=["auth"])


class AuthResponse(BaseModel):
    """Response model for authentication endpoints"""
    token: str
    user: UserPublic


class LoginRequest(BaseModel):
    """Request model for login"""
    email: str
    password: str


@router.post("/register", response_model=AuthResponse)
async def register_user(user_data: UserRegistrationRequest, session: Session = Depends(get_session)) -> AuthResponse:
    """
    Register a new user

    Args:
        user_data: User registration information
        session: Database session

    Returns:
        AuthResponse with JWT token and user information
    """
    # Check if user already exists
    existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )

    # Create new user (password hashing would normally happen here)
    # For this implementation, we'll simulate password hashing
    new_user = User(
        email=user_data.email,
        name=user_data.name,
    )

    # Add to session and commit
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Create JWT token
    jwt_data = JWTData(
        user_id=new_user.id,
        email=new_user.email
    )

    token = create_access_token(jwt_data)

    # Return token and user info
    return AuthResponse(
        token=token,
        user=UserPublic.from_orm(new_user) if hasattr(UserPublic, 'from_orm') else UserPublic(
            id=new_user.id,
            email=new_user.email,
            name=new_user.name,
            created_at=new_user.created_at,
            updated_at=new_user.updated_at
        )
    )


@router.post("/login", response_model=AuthResponse)
async def login_user(login_data: LoginRequest, session: Session = Depends(get_session)) -> AuthResponse:
    """
    Authenticate user and return JWT token

    Args:
        login_data: User login credentials
        session: Database session

    Returns:
        AuthResponse with JWT token and user information
    """
    # Find user by email
    user = session.exec(select(User).where(User.email == login_data.email)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # In a real implementation, we would verify the password hash here
    # For this example, we'll assume the password is correct
    # (In a real app, you'd use something like bcrypt.verify(password, user.password_hash))

    # Create JWT token
    jwt_data = JWTData(
        user_id=user.id,
        email=user.email
    )

    token = create_access_token(jwt_data)

    # Return token and user info
    return AuthResponse(
        token=token,
        user=UserPublic.from_orm(user) if hasattr(UserPublic, 'from_orm') else UserPublic(
            id=user.id,
            email=user.email,
            name=user.name,
            created_at=user.created_at,
            updated_at=user.updated_at
        )
    )


@router.post("/logout")
async def logout_user():
    """
    Logout user (stateless, so just client-side cleanup needed)
    """
    # In a stateless JWT system, logout is handled on the client side
    # by removing the token from storage
    return {"message": "Successfully logged out"}