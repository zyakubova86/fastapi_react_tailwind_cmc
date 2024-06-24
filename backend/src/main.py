from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.router import router


app = FastAPI()
app.include_router(router)

origins = [
    # "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)