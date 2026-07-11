//Mock data for polyagen frontned porotype 
//peplace this with real API call 

export const AGENTS = [
    {
        id: "orchestrator",
        number: "N`001",
        name : "Orchestrator",
        role: "Conductor",
        summary: "Decomposes intent, plans the path, routes work to the right specialist - and re-plans on the fly when reality disagress with the plan.",
        capabilities: ["intent.parse", "plan.generate","route.delegate","context.merge"],
        status: "primary",
        color: "#e8789a",
    },
    {
        id: "research",
        number: "N`002",
        name :"ResearchAgent",
        role: "Knowledge Hunter",
         summary:
      "Web search, document retrieval and RAG over your private knowledge base. Returns sourced, citation-ready evidence — never opinions.",
    capabilities: ["web.search", "rag.query", "source.cite", "freshness.check"],
    status: "ready",
  },
    {
    id: "coder",
    number: "N°003",
    name: "CoderAgent",
    role: "Builder",
    summary:
      "Generates, refactors and executes code inside a sandboxed runtime. Reads stack traces, writes tests, and ships diffs — not snippets.",
    capabilities: ["code.gen", "sandbox.run", "test.write", "diff.apply"],
    status: "ready",
  },
  {
    id: "analyst",
    number: "N°004",
    name: "AnalystAgent",
    role: "Quant",
    summary:
      "Runs tabular analysis, statistics and visual exploration over structured data — talks to CSVs, parquet and warehouses with equal calm.",
    capabilities: ["data.profile", "stats.compute", "chart.render", "sql.query"],
    status: "ready",
  },
  {
    id: "writer",
    number: "N°005",
    name: "WriterAgent",
    role: "Composer",
    summary:
      "Long-form prose, briefs, documentation and structured outputs. Respects voice, constraints, and the difference between accurate and good.",
    capabilities: ["draft.long", "voice.match", "outline.build", "edit.tighten"],
    status: "ready",
  },
  {
    id: "synthesizer",
    number: "N°006",
    name: "Synthesizer",
    role: "Closer",
    summary:
      "Folds every sub-agent's output into a single, coherent answer. Resolves contradictions, surfaces uncertainty, returns receipts.",
    capabilities: ["merge.outputs", "conflict.resolve", "uncertainty.flag", "final.compose"],
    status: "ready",
  },
];

export const TRACE_LOG =[
    { t: "00:00.142", agent: "Orchestrator",   level: "plan",  msg: "intent parsed → category=research+analysis" },
  { t: "00:00.318", agent: "Orchestrator",   level: "route", msg: "delegating subtask 1/3 → ResearchAgent" },
  { t: "00:00.402", agent: "ResearchAgent",  level: "tool",  msg: "web.search(q='LLM agent memory architectures 2025')" },
  { t: "00:01.117", agent: "ResearchAgent",  level: "info",  msg: "8 sources retrieved · 2 deprecated · 6 active" },
  { t: "00:01.244", agent: "ResearchAgent",  level: "rag",   msg: "rag.query(corpus='internal-notes') · 12 hits" },
  { t: "00:02.011", agent: "Orchestrator",   level: "route", msg: "delegating subtask 2/3 → AnalystAgent" },
  { t: "00:02.108", agent: "AnalystAgent",   level: "tool",  msg: "data.profile(rows=2.4M, cols=18)" },
  { t: "00:02.876", agent: "AnalystAgent",   level: "info",  msg: "feature drift detected on 3 columns" },
  { t: "00:03.214", agent: "Orchestrator",   level: "route", msg: "delegating subtask 3/3 → WriterAgent" },
  { t: "00:03.330", agent: "WriterAgent",    level: "draft", msg: "composing structured brief · 6 sections" },
  { t: "00:04.402", agent: "Synthesizer",    level: "merge", msg: "folding outputs · resolving 2 contradictions" },
  { t: "00:04.812", agent: "Synthesizer",    level: "done",  msg: "final.compose → response ready · 0 unresolved" },
];


export const METRICS = [
  { k: "agents.active",    v: "06" },
  { k: "tasks.completed",  v: "12,481" },
  { k: "median.latency",   v: "1.8s" },
  { k: "tools.connected",  v: "37" },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Intent",     body: "You speak in goals, not steps. The Orchestrator parses ambiguity into a structured intent." },
  { n: "02", title: "Plan",       body: "A directed graph of subtasks is composed — with dependencies, deadlines and rollback paths." },
  { n: "03", title: "Delegate",   body: "Each subtask is routed to the specialist agent built for that exact shape of problem." },
  { n: "04", title: "Execute",    body: "Agents call tools, write code, query data and search the web — inside a sandboxed runtime." },
  { n: "05", title: "Synthesize", body: "Outputs are merged, conflicts resolved, citations preserved. You see the work, not just the answer." },
];

export const PRINCIPLES = [
  { k: "open",       v: "Open-source, self-hosted. Your data never leaves your machine." },
  { k: "observable", v: "Every agent step is traced, replayable and auditable." },
  { k: "modular",    v: "Add an agent by writing one file. Remove one by deleting it." },
  { k: "memoryful",  v: "Short-term scratchpads, long-term vector memory, all addressable." },
];

export const FAQS = [
  { q: "What is PolyAgent, in one sentence?",
    a: "An open-source operating system where six specialised AI agents collaborate to complete multi-step knowledge work — with full observability, persistent memory, and no vendor lock-in." },
  { q: "How is this different from a single LLM with tools?",
    a: "A single model has one strategy. PolyAgent gives you a planner, specialists and a synthesiser — each tuned for its job and replaceable independently." },
  { q: "Can I run it locally?",
    a: "Yes. Self-hosted is the default path. Bring your own model provider or run open weights via Ollama / vLLM." },
  { q: "Is the dashboard real-time?",
    a: "Every tool call, plan revision and memory write streams into the trace log as it happens." },
];