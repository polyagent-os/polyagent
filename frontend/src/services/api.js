const BASE_URL = "http://localhost:8000";
const ENDPOINT = "/api/chat";
const TIMEOUT_MS = 6000;

const MOCK_RESPONSES = [
  { agent: "Orchestrator",  response: "Decomposed task into 4 sub-tasks. Routing to agents." },
  { agent: "ResearchAgent", response: "Retrieved 8 sources. Key signals extracted." },
  { agent: "AnalystAgent",  response: "Identified 3 patterns across the dataset." },
  { agent: "WriterAgent",   response: "Draft generated — 640 tokens." },
  { agent: "Synthesizer",   response: "Final output assembled. [DEMO MODE — backend offline]" },
];

export async function runQuery(query) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    return { ...data, demo: false };
  } catch (err) {
    // backend offline / CORS / timeout → fallback
    return {
      agent: "System",
      response: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)].response,
      demo: true,
    };
  }
}
