from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session, select
from ..models.user import CurrentUser
from ..middleware.auth import get_current_user
from ..models.user_model import User
from ..database import get_session
from pydantic import BaseModel
from datetime import datetime
import uuid

router = APIRouter()


class TaskBase(BaseModel):
    title: str
    description: str = ""
    completed: bool = False


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str = None
    description: str = None
    completed: bool = None


class Task(TaskBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime


@router.get("/{user_id}/tasks", response_model=List[Task])
async def get_tasks(
    user_id: str,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get all tasks for the authenticated user

    Args:
        user_id: User ID from URL path
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        List of tasks belonging to the user
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    # This ensures multi-tenant data isolation
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access another user's tasks"
        )

    # In a real implementation, we would query the tasks table for this user
    # For now, returning an empty list to demonstrate the auth flow
    return []


@router.post("/{user_id}/tasks", response_model=Task)
async def create_task(
    user_id: str,
    task: TaskCreate,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the authenticated user

    Args:
        user_id: User ID from URL path
        task: Task data to create
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        Created task
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot create tasks for another user"
        )

    # In a real implementation, we would create a new task record
    # For now, returning a mock task to demonstrate the auth flow
    mock_task = Task(
        id=str(uuid.uuid4()),
        user_id=current_user.user_id,
        title=task.title,
        description=task.description,
        completed=task.completed,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    return mock_task


@router.get("/{user_id}/tasks/{id}", response_model=Task)
async def get_task(
    user_id: str,
    id: str,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task for the authenticated user

    Args:
        user_id: User ID from URL path
        id: Task ID to retrieve
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        Specific task if it belongs to the user
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot access another user's task"
        )

    # In a real implementation, we would query for the specific task
    # For now, returning a mock task to demonstrate the auth flow
    mock_task = Task(
        id=id,
        user_id=current_user.user_id,
        title="Mock Task",
        description="This is a mock task for demonstration",
        completed=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    return mock_task


@router.put("/{user_id}/tasks/{id}", response_model=Task)
async def update_task(
    user_id: str,
    id: str,
    task_update: TaskUpdate,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task for the authenticated user

    Args:
        user_id: User ID from URL path
        id: Task ID to update
        task_update: Updated task data
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        Updated task
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot update another user's task"
        )

    # In a real implementation, we would update the specific task record
    # For now, returning a mock task to demonstrate the auth flow
    mock_task = Task(
        id=id,
        user_id=current_user.user_id,
        title=task_update.title or "Updated Mock Task",
        description=task_update.description or "Updated mock task description",
        completed=task_update.completed if task_update.completed is not None else False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    return mock_task


@router.delete("/{user_id}/tasks/{id}")
async def delete_task(
    user_id: str,
    id: str,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task for the authenticated user

    Args:
        user_id: User ID from URL path
        id: Task ID to delete
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        Success message
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot delete another user's task"
        )

    # In a real implementation, we would delete the specific task record
    # For now, returning a success message to demonstrate the auth flow
    return {"message": f"Task {id} deleted successfully"}


@router.patch("/{user_id}/tasks/{id}/complete")
async def toggle_task_completion(
    user_id: str,
    id: str,
    current_user: CurrentUser = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle completion status of a specific task for the authenticated user

    Args:
        user_id: User ID from URL path
        id: Task ID to toggle
        current_user: Authenticated user from JWT token
        session: Database session

    Returns:
        Updated completion status
    """
    # Verify that the user_id in the URL matches the user_id from the JWT
    if user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: Cannot modify another user's task"
        )

    # In a real implementation, we would toggle the task's completion status
    # For now, returning a mock response to demonstrate the auth flow
    return {"id": id, "completed": True, "message": f"Task {id} marked as completed"}