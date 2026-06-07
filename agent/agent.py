from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile"
)

def ask_agent(question):
    response = llm.invoke(question)
    return response.content

if __name__ == "__main__":
    user_input = input("Ask something: ")
    print(ask_agent(user_input))