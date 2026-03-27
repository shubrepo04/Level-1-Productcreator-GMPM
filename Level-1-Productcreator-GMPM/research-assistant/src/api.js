import Groq from 'groq-sdk';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MODEL = 'llama-3.3-70b-versatile';
const MAX_TOKENS = 2048;

/**
 * Load a versioned system prompt from shared/prompts/{promptVersion}.txt
 * @param {string} promptVersion - e.g. "research-v1"
 * @returns {Promise<string>}
 */
async function loadPrompt(promptVersion) {
  const promptPath = join(__dirname, '../prompts', `${promptVersion}.txt`);
  try {
    return await readFile(promptPath, 'utf-8');
  } catch (err) {
    throw new Error(`Prompt file not found: "${promptVersion}.txt" (looked in shared/prompts/)`);
  }
}

/**
 * Send a product research question to Groq and return structured JSON analysis.
 *
 * @param {string} question      - The product research question from the user
 * @param {string} promptVersion - Filename (without .txt) of the system prompt in shared/prompts/
 * @returns {Promise<{ data: object, meta: { ms: number, model: string } }>}
 */
export async function researchQuestion(question, promptVersion) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables.');
  }

  if (!question || typeof question !== 'string' || question.trim() === '') {
    throw new Error('question must be a non-empty string.');
  }

  if (!promptVersion || typeof promptVersion !== 'string') {
    throw new Error('promptVersion must be a non-empty string (e.g. "research-v1").');
  }

  const systemPrompt = await loadPrompt(promptVersion);

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const start = Date.now();

  const completion = await client.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: question.trim() },
    ],
    response_format: { type: 'json_object' },
  });

  const ms = Date.now() - start;

  const raw = completion.choices?.[0]?.message?.content ?? '';

  let parsedJSON;
  try {
    parsedJSON = JSON.parse(raw);
  } catch {
    throw new Error(
      `Groq returned a response that could not be parsed as JSON.\n` +
      `Model: ${MODEL}\n` +
      `Raw response (first 300 chars): ${raw.slice(0, 300)}`
    );
  }

  return {
    data: parsedJSON,
    meta: {
      ms,
      model: MODEL,
    },
  };
}
