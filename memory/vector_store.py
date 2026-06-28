import os
import chromadb
from dotenv import load_dotenv

load_dotenv()

# Use ChromaDB's default embedding (all-MiniLM-L6-v2)
# Downloads model automatically on first run (~80MB, one time only)
embedder = None  # Use default embedding

# Persistent storage — data survives restarts
DB_PATH = os.getenv("CHROMA_DB_PATH", "./memory/chroma_db")
client = chromadb.PersistentClient(path=DB_PATH)

def get_collection(name: str = "polyagent_memory"):
    """Get or create a ChromaDB collection."""
    kwargs = {
        "name": name,
        "metadata": {"hnsw:space": "cosine"}  # cosine similarity
    }
    if embedder is not None:
        kwargs["embedding_function"] = embedder
    return client.get_or_create_collection(**kwargs)

def store(text: str, metadata: dict, doc_id: str, collection: str = "polyagent_memory"):
    """Store a piece of text with metadata into vector DB."""
    col = get_collection(collection)
    
    # If ID already exists, update it
    try:
        col.upsert(
            documents=[text],
            metadatas=[metadata],
            ids=[doc_id]
        )
        print(f"[VectorStore] Stored: {doc_id}")
    except Exception as e:
        print(f"[VectorStore] Error storing {doc_id}: {e}")

def retrieve(query: str, n_results: int = 3, collection: str = "polyagent_memory") -> list[str]:
    """Find the most similar stored texts to a query."""
    col = get_collection(collection)
    
    try:
        results = col.query(
            query_texts=[query],
            n_results=n_results
        )
        docs = results["documents"][0] if results["documents"] else []
        print(f"[VectorStore] Retrieved {len(docs)} results for: {query[:50]}")
        return docs
    except Exception as e:
        print(f"[VectorStore] Retrieval error: {e}")
        return []

def delete(doc_id: str, collection: str = "polyagent_memory"):
    """Delete a document by ID."""
    col = get_collection(collection)
    col.delete(ids=[doc_id])
    print(f"[VectorStore] Deleted: {doc_id}")

def count(collection: str = "polyagent_memory") -> int:
    """Count total stored documents."""
    col = get_collection(collection)
    return col.count()