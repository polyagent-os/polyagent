from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.orchestrator.orchestrator import Orchestrator

router = APIRouter()
orchestrator = Orchestrator()

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    agent: str
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Pass the query to the orchestrator to route and get a response
        result = await orchestrator.route_query(request.query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))