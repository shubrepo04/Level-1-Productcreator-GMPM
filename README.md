# Godmode PM — Level 01: LLM-Powered PM Tools

Two production-ready AI tools built for product managers. Paste in a question or problem statement — get structured, actionable output in seconds. Built with Node.js, Express, and the Groq API (llama-3.3-70b-versatile). Deployed on Vercel.

---

## Live Demos

| Tool | URL | What it does |
|---|---|---|
| PM Research Assistant | [pm-research-assistant-two.vercel.app](https://pm-research-assistant-two.vercel.app) | Competitive research in seconds |
| PRD Generator | [prd-generator-sigma.vercel.app](https://prd-generator-sigma.vercel.app) | Full PRD from a problem statement |

---

## Tools

### 1. PM Research Assistant

**Who it's for:** PMs validating a market, preparing for a strategy review, or doing quick competitive diligence.

**What it does:** You paste in a product research question (e.g. *"What are the pain points and competitors in AI note-taking apps?"*) and get back a structured JSON analysis with:

- **Competitors** — name, positioning, and key weakness
- **Pain points** — the problem, severity (high/medium/low), and who feels it
- **Opportunity** — a synthesised paragraph on the market gap
- **Confidence** — the model's self-assessed confidence in the output
- **Follow-up questions** — specific questions to deepen the research

**Why it's useful:** Replaces 30 minutes of Googling with a structured brief you can paste into a deck or a Notion doc.

---

### 2. PRD Generator

**Who it's for:** PMs who need to go from "we should build this" to a shareable, structured PRD — fast.

**What it does:** You paste in a problem statement and get back a complete PRD with:

- **Problem definition** — restated clearly with target users and personas
- **Success metrics** — KPIs with measurable targets
- **Functional requirements** — numbered, with must/should/nice-to-have priority
- **Non-functional requirements** — performance, security, accessibility
- **User journeys** — step-by-step flows per persona
- **Risks** — with likelihood, impact, and mitigation
- **Open questions** — assigned, unresolved decisions that block engineering
- **Out of scope** — explicit boundaries to prevent scope creep
- **Follow-up questions** — what the PM should answer to improve the PRD

**Why it's useful:** Cuts first-draft PRD time from hours to minutes. The output is structured JSON — ready to render, export, or pipe into other tools.

---

## Stack

```
Node.js 18       — runtime
Express          — web server
groq-sdk         — AI API client
llama-3.3-70b-versatile  — model (via Groq)
dotenv           — environment variable management
Vercel           — deployment
```

**Design principles:**
- ES modules throughout (`import/export` — never `require`)
- Prompts are versioned `.txt` files — never hardcoded in app logic
- JSON schemas defined in `shared/schemas/`
- Each tool is independently deployable

---

## Folder Structure

```
01-llm-apis/
│
├── research assistant/          # Tool 1 — PM Research Assistant
│   ├── src/
│   │   ├── server.js            # Express server, GET / and POST /api/research
│   │   ├── api.js               # Groq API call, JSON parsing, error handling
│   │   └── index.html           # Single-page UI
│   ├── prompts/
│   │   └── research-v1.txt      # Versioned system prompt
│   ├── package.json
│   └── vercel.json
│
├── prd-generator/               # Tool 2 — PRD Generator
│   ├── src/
│   │   ├── server.js            # Express server, GET / and POST /api/prd
│   │   ├── api.js               # Groq API call, JSON fence fallback, error handling
│   │   └── index.html           # Single-page UI with Download JSON + Copy Markdown
│   ├── prompts/
│   │   └── prd-v1.txt           # Versioned system prompt
│   ├── package.json
│   └── vercel.json
│
├── shared/
│   ├── prompts/                 # Source-of-truth prompt templates
│   └── schemas/                 # JSON input/output schemas
│
├── .claude/
│   └── commands/                # Custom Claude slash commands
│       ├── eval-research.md     # /eval-research — test the research assistant
│       └── test-prd.md          # /test-prd — generate a sample PRD
│
├── CLAUDE.md                    # Project instructions for Claude Code
├── .env.example                 # Environment variable template
└── README.md
```

---

## Run Locally

### Prerequisites
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### Research Assistant

```bash
cd "research assistant"
npm install
cp .env.example .env        # then add your GROQ_API_KEY
node src/server.js
# → http://localhost:3000
```

### PRD Generator

```bash
cd prd-generator
npm install
cp .env.example .env        # then add your GROQ_API_KEY
node src/server.js
# → http://localhost:3000
```

### Environment Variables

Create a `.env` file in each tool's folder:

```
GROQ_API_KEY=gsk_your_key_here
PORT=3000
```

Get your key free at [console.groq.com](https://console.groq.com).

---

## Prompts

Prompts are versioned `.txt` files loaded at runtime — never hardcoded. To iterate on a prompt:

1. Duplicate the existing file: `research-v1.txt` → `research-v2.txt`
2. Edit the new version
3. Pass the new version name in the API call
4. Roll back by reverting the version string — no code changes needed

---

## Deploying to Vercel

```bash
npm install -g vercel

cd "research assistant" && vercel --prod
cd ../prd-generator && vercel --prod
```

Add `GROQ_API_KEY` as an environment variable in each project's Vercel dashboard, then redeploy.

---

Built as part of the **Godmode PM** curriculum — a series of AI-powered tools for modern product managers.
