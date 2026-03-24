import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'LLM APIs server is running' });
});

// POST /analyze — takes a product research question, returns structured JSON analysis
app.post('/analyze', async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({ error: 'Missing or invalid "question" field in request body.' });
  }

  try {
    // Placeholder: replace with Groq-powered analysis in research-assistant/
    res.json({
      question,
      analysis: null,
      message: 'Route ready — wire up Groq handler in research-assistant/',
    });
  } catch (err) {
    console.error('Error in /analyze:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
