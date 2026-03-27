import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { researchQuestion } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = process.env.PORT ?? 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

// GET / — serve the single-page UI
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// POST /api/research — run research analysis
app.post('/api/research', async (req, res) => {
  const { question, promptVersion = 'research-v1' } = req.body ?? {};

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({ error: 'question is required and must be a non-empty string.' });
  }

  try {
    const result = await researchQuestion(question, promptVersion);
    return res.json(result);
  } catch (err) {
    console.error('[/api/research]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Research Assistant running → http://localhost:${PORT}`);
});
