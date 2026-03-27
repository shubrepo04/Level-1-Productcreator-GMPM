import Groq from 'groq-sdk';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const MODEL      = 'llama-3.3-70b-versatile';
const MAX_TOKENS = 4096;

/**
 * Load a versioned system prompt from prompts/{promptVersion}.txt
 * @param {string} promptVersion - e.g. "prd-v1"
 * @returns {Promise<string>}
 */
async function loadPrompt(promptVersion) {
  const promptPath = join(__dirname, '../prompts', `${promptVersion}.txt`);
  try {
    return await readFile(promptPath, 'utf-8');
  } catch {
    throw new Error(`Prompt file not found: "${promptVersion}.txt" (looked in prompts/)`);
  }
}

/**
 * Strip ```json ... ``` fences if the model wraps its output in them.
 * Returns the raw string unchanged if no fences are detected.
 * @param {string} raw
 * @returns {string}
 */
function stripJsonFences(raw) {
  const fenced = raw.match(/^```(?:json)?\s*([\s\S]*?)```\s*$/i);
  return fenced ? fenced[1].trim() : raw.trim();
}

/**
 * Generate a complete PRD from a problem statement.
 *
 * @param {string} problem       - The problem statement from the PM
 * @param {string} promptVersion - Filename (without .txt) of the system prompt in prompts/
 * @returns {Promise<{ data: object, meta: { ms: number, model: string } }>}
 */
export async function generatePRD(problem, promptVersion) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables.');
  }

  if (!problem || typeof problem !== 'string' || problem.trim() === '') {
    throw new Error('problem must be a non-empty string.');
  }

  if (!promptVersion || typeof promptVersion !== 'string') {
    throw new Error('promptVersion must be a non-empty string (e.g. "prd-v1").');
  }

  const systemPrompt = await loadPrompt(promptVersion);
  const client       = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const start        = Date.now();

  const completion = await client.chat.completions.create({
    model:      MODEL,
    max_tokens: MAX_TOKENS,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: problem.trim() },
    ],
    response_format: { type: 'json_object' },
  });

  const ms  = Date.now() - start;
  const raw = completion.choices?.[0]?.message?.content ?? '';

  // Primary parse — works when response_format: json_object is respected
  // Fallback — strips ```json fences in case the model wraps its output anyway
  const cleaned = stripJsonFences(raw);

  let parsedJSON;
  try {
    parsedJSON = JSON.parse(cleaned);
  } catch {
    throw new Error(
      `Groq returned a response that could not be parsed as JSON.\n` +
      `Model: ${MODEL}\n` +
      `Raw response (first 500 chars): ${raw.slice(0, 500)}`
    );
  }

  return {
    data: parsedJSON,
    meta: { ms, model: MODEL },
  };
}
