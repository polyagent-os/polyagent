from agents.base_agent import BaseAgent

class CoderAgent(BaseAgent):
    def __init__(self):
        super().__init__(system_prompt="You are a professional coder with expertise in creating well-structured functional code in different programming languages. You write clearly, adapting your code based on what the user needs — whether it's a school assignment, developer project, debugging solution, or anything else. Always produce polished, high-quality code and adapt based on user requirements.")
    
    def run(self, message: str) -> str:
        return super().run(message)