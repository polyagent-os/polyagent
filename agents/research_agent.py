from agents.base_agent import BaseAgent
from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(system_prompt="You are a professional research assistant. You are given real-time web search results and must use them to give accurate, well-summarized, and insightful answers. Always cite where the information comes from.")
        self.tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    
    def run(self, message: str) -> str:
        results = self.tavily.search(query=message)
        context = "\n".join([r['content'] for r in results['results']])
        full_message = f"Search results:\n{context}\n\nUser question: {message}"
        return super().run(full_message)