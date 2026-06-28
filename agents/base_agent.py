from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

class BaseAgent:
    def __init__(self, system_prompt: str):
        self.system_prompt = system_prompt
        self.llm = ChatGroq(model="llama-3.3-70b-versatile")
    
    def run(self, message: str) -> str:
        history = [
            SystemMessage(content=self.system_prompt),
            HumanMessage(content=message)
        ]
        response = self.llm.invoke(history)
        return response.content

