# polyagent
PolyAgent — A Multi-Agent AI Operating System for Knowledge Work  An open-source, self-hosted platform where specialized AI agents collaborate autonomously to complete complex, multi-step tasks — with full observability, memory, and a beautiful UI.

# PolyAgent — Multi-Agent AI Operating System

An open-source platform where specialized AI agents collaborate to complete complex tasks.

## Features
- 🧠 Orchestrator Agent — breaks tasks into subtasks
- 🔍 Research Agent — web search + synthesis
- 💻 Coder Agent — code generation
- ✍️ Writer Agent — content creation
- 📊 Analyst Agent — data analysis
- 🗄️ Vector memory (ChromaDB) — long-term context

## Tech Stack
FastAPI · React · Groq (Llama 3.1) · ChromaDB · LangChain

## Setup

### Backend
\`\`\`bash
python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
\`\`\`

### Frontend
\`\`\`bash
cd frontend/polyagent-ui
npm install
npm start
\`\`\`

### Environment
Copy `.env.example` to `.env` and add your free Groq API key from console.groq.com

## Team
- Dev 1 — Backend/Orchestrator
- Dev 2 — AI Agents
- Dev 3 — Memory/RAG
- Dev 4 — Frontend
- Dev 5 — Tools/Infra
