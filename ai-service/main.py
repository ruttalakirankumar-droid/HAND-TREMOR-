from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "CalmHands AI Service Running"}

@app.post("/analyze")
def analyze():
    return {"tremor_level": "Mild", "severity_score": 2.4}