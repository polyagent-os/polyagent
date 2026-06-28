import hashlib
import time
from .vector_store import store, retrieve, count

def add_to_knowledge_base(content: str, source: str = "user", tag: str = "general") -> str:
    """
    Save any content into long-term memory.
    Returns the document ID.
    """
    # Generate unique ID from content + timestamp
    doc_id = hashlib.md5(f"{content}{time.time()}".encode()).hexdigest()[:12]
    
    store(
        text=content,
        metadata={
            "source": source,
            "tag": tag,
            "timestamp": str(time.time()),
        },
        doc_id=doc_id
    )
    return doc_id

def get_relevant_context(query: str, n_results: int = 3) -> str:
    """
    Given a query, retrieve the most relevant past memories.
    Returns a formatted string ready to inject into an agent prompt.
    """
    memories = retrieve(query, n_results=n_results)
    
    if not memories:
        return ""  # No relevant memory found
    
    formatted = "\n---\n".join(memories)
    return f"Relevant context from memory:\n{formatted}"

def save_agent_output(agent_name: str, task: str, output: str) -> str:
    """
    Automatically saves every agent's response to memory.
    So future tasks can benefit from past work.
    """
    content = f"Agent: {agent_name}\nTask: {task}\nOutput: {output}"
    return add_to_knowledge_base(
        content=content,
        source=agent_name,
        tag="agent_output"
    )

def memory_stats() -> dict:
    """Returns how many items are stored in memory."""
    total = count()
    return {
        "total_memories": total,
        "status": "active" if total >= 0 else "error"
    }