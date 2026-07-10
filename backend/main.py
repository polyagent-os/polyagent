from fastapi import FastAPI
from backend.routers import chat

app = FastAPI(title="PolyAgent Backend API")

# Include the chat router
app.include_router(chat.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "PolyAgent Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)