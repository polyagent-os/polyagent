import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from memory.rag import add_to_knowledge_base, get_relevant_context, save_agent_output, memory_stats
from memory.session_memory import get_session

print("=" * 50)
print("TEST 1: Storing memories")
print("=" * 50)

add_to_knowledge_base(
    "LangGraph is a library for building stateful multi-agent applications using LLMs.",
    source="user",
    tag="ai_concepts"
)
add_to_knowledge_base(
    "ChromaDB is an open-source vector database used for storing embeddings.",
    source="user",
    tag="ai_concepts"
)
add_to_knowledge_base(
    "FastAPI is a modern Python web framework for building APIs quickly.",
    source="user",
    tag="frameworks"
)
add_to_knowledge_base(
    "RAG stands for Retrieval Augmented Generation — combining search with LLM generation.",
    source="user",
    tag="ai_concepts"
)

print()
print("=" * 50)
print("TEST 2: Retrieving relevant context")
print("=" * 50)

context = get_relevant_context("Tell me about vector databases")
print(context)

print()
print("=" * 50)
print("TEST 3: Saving agent output to memory")
print("=" * 50)

save_agent_output(
    agent_name="ResearchAgent",
    task="Research what is RAG",
    output="RAG combines retrieval systems with LLMs to ground responses in real data."
)
print("Agent output saved.")

print()
print("=" * 50)
print("TEST 4: Session memory")
print("=" * 50)

session = get_session("user_123")
session.add("user", "What is ChromaDB?")
session.add("agent", "ChromaDB is a vector database for storing embeddings.", agent="ResearchAgent")
session.add("user", "How does RAG work?")

print(session.format_for_prompt())
print("Session summary:", session.summary())

print()
print("=" * 50)
print("TEST 5: Memory stats")
print("=" * 50)
print(memory_stats())