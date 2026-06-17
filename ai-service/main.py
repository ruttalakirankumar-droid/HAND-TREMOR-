from fastapi import FastAPI
app = FastAPI()
@app.get("/")
def home():
    return {"message": "CalmHands AI Service Running"}
