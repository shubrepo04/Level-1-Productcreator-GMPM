# 01-llm-apis

This folder contains LLM API-powered tools built for product managers.

## Structure

```
01-llm-apis/
├── research assistant/   # Research assistant tool using LLM APIs
├── prd-generator/        # PRD generation tool using LLM APIs
├── shared/
│   ├── prompts/          # Shared prompt templates across tools
│   └── schemas/          # Shared JSON schemas (inputs/outputs)
└── .claude/
    └── commands/         # Custom Claude slash commands
```

## Conventions

- Use `claude-sonnet-4-6` as the default model for all tools
- Store reusable prompt templates in `shared/prompts/`
- Store input/output JSON schemas in `shared/schemas/`
- Each tool lives in its own subfolder with its own README

## Models

| Model | ID | Use case |
|---|---|---|
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | Default — balanced quality and speed |
| Claude Opus 4.6 | `claude-opus-4-6` | Complex reasoning tasks |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | Fast, lightweight tasks |

## Tools

- **Research Assistant** (`research assistant/`) — Synthesizes research from multiple sources
- **PRD Generator** (`prd-generator/`) — Generates product requirement documents



# Project: Godmode PM — Level 01
## What we are building
Two AI-powered PM tools, both deployed on Vercel:
1. PM Research Assistant — in research-assistant/
2. PRD Generator — in prd-generator/
## Stack
Node.js 18, Express, ES modules (import/export — never require)
AI calls use Groq API (not Anthropic) — npm package: groq-sdk
Model: llama-3.3-70b-versatile
Prompts: versioned .txt files in shared/prompts/
Schemas: shared/schemas/
## Rules- Load API key from .env as GROQ_API_KEY- Never hardcode prompts in app code — always load from file- After any deploy, confirm the Vercel URL is live- Show diffs before changing existing files