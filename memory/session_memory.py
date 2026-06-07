from datetime import datetime

class SessionMemory:
    """
    Short-term memory for a single user session.
    Stores the conversation history in order.
    Resets when the session ends.
    """

    def __init__(self, user_id: str = "default"):
        self.user_id = user_id
        self.history = []
        self.created_at = datetime.now().isoformat()

    def add(self, role: str, content: str, agent: str = None):
        """
        Add an entry to session history.
        role: 'user' or 'agent'
        """
        entry = {
            "role": role,
            "content": content,
            "agent": agent,
            "timestamp": datetime.now().isoformat()
        }
        self.history.append(entry)

    def get_history(self) -> list[dict]:
        """Returns full session history."""
        return self.history

    def get_last_n(self, n: int = 5) -> list[dict]:
        """Returns last N exchanges."""
        return self.history[-n:]

    def format_for_prompt(self, n: int = 5) -> str:
        """
        Formats recent history as a string
        ready to inject into an agent prompt.
        """
        recent = self.get_last_n(n)
        if not recent:
            return ""

        lines = ["Recent conversation history:"]
        for entry in recent:
            prefix = f"[{entry['agent']}]" if entry.get("agent") else "[User]"
            lines.append(f"{prefix}: {entry['content'][:200]}")

        return "\n".join(lines)

    def clear(self):
        """Reset session memory."""
        self.history = []
        print(f"[SessionMemory] Cleared for user: {self.user_id}")

    def summary(self) -> dict:
        return {
            "user_id": self.user_id,
            "total_exchanges": len(self.history),
            "created_at": self.created_at
        }


# Global session store — one session per user
_sessions: dict[str, SessionMemory] = {}

def get_session(user_id: str = "default") -> SessionMemory:
    """Get or create a session for a user."""
    if user_id not in _sessions:
        _sessions[user_id] = SessionMemory(user_id)
        print(f"[SessionMemory] New session created for: {user_id}")
    return _sessions[user_id]