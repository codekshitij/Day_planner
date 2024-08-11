from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/", StaticFiles(directory="static", html=True), name="static")

# In-memory storage for demonstration
tasks = [
    {"id": 1, "name": "Task 1", "completed": False},
    {"id": 2, "name": "Task 2", "completed": True},
]

class Task(BaseModel):
    name: str
    completed: bool

@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    return tasks

@app.patch("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    for t in tasks:
        if t["id"] == task_id:
            t.update(task.dict())
            return t
    raise HTTPException(status_code=404, detail="Task not found")
