from agents.writer_agent import WriterAgent
from agents.coder_agent import CoderAgent
from agents.analyst_agent import AnalystAgent
from agents.research_agent import ResearchAgent

def get_agent(name: str):
    agents = {
        "writer": WriterAgent(),
        "coder": CoderAgent(),
        "analyst": AnalystAgent(),
        "research": ResearchAgent()
    }
    return agents.get(name)