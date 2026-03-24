import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generatePRD } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────

// GET / — serve the single-page UI
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// POST /api/prd — generate a PRD from a problem statement
app.post('/api/prd', async (req, res) => {
  const { problem, promptVersion = 'prd-v1' } = req.body ?? {};

  if (!problem || typeof problem !== 'string' || problem.trim() === '') {
    return res.status(400).json({ error: 'problem is required and must be a non-empty string.' });
  }

  try {
    const result = await generatePRD(problem, promptVersion);
    return res.json(result);
  } catch (err) {
    console.error('[/api/prd]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`PRD Generator running → http://localhost:${PORT}`);
});
