# We use try-except so your code doesn't crash if the other team's files are missing
try:
    from backend.agents.research_agent import ResearchAgent
    from backend.agents.coder_agent import CoderAgent
    from backend.agents.analyst_agent import AnalystAgent
    from backend.agents.writer_agent import WriterAgent
except ImportError:
    # If the files are missing, we create "Mock" versions so you can still test your routing
    class MockAgent:
        def __init__(self, name): self.name = name
        async def run(self, query): return f"Mock {self.name}: Received '{query}'"

    ResearchAgent = lambda: MockAgent("ResearchAgent")
    CoderAgent = lambda: MockAgent("CoderAgent")
    AnalystAgent = lambda: MockAgent("AnalystAgent")
    WriterAgent = lambda: MockAgent("WriterAgent")

class Orchestrator:
    def __init__(self):
        self.agents = {
            "research": ResearchAgent(),
            "coder": CoderAgent(),
            "analyst": AnalystAgent(),
            "writer": WriterAgent()
        }

    async def route_query(self, query: str):
        query_lower = query.lower()
        
        # Your Routing Logic
        if any(word in query_lower for word in ["code", "python", "debug"]):
            selected = "coder"
        elif any(word in query_lower for word in ["data", "analyze", "chart"]):
            selected = "analyst"
        elif any(word in query_lower for word in ["search", "find", "who"]):
            selected = "research"
        else:
            selected = "writer"
        
        response = await self.agents[selected].run(query)
        return {"agent": selected, "response": response}
