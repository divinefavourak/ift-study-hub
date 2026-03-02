/**
 * aiQuiz.js — AI quiz generation
 *
 * In PRODUCTION (Vercel):
 *   → Calls /api/generate-quiz  (serverless function, keys stay server-side)
 *
 * In LOCAL DEV (npm run dev):
 *   → Calls Gemini/OpenRouter directly using VITE_ keys from .env
 *     (your own machine, never deployed, acceptable)
 */

const IS_PROD = import.meta.env.PROD;               // true on Vercel, false locally
const IS_DEV  = import.meta.env.DEV;

// Dev-only direct keys (only loaded locally, stripped from production bundle)
const DEV_GEMINI_KEY     = IS_DEV ? import.meta.env.VITE_GEMINI_API_KEY     : "";
const DEV_OPENROUTER_KEY = IS_DEV ? import.meta.env.VITE_OPENROUTER_API_KEY : "";

const GEMINI_URL = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/* ─── Provider metadata (used by the UI) ─────────────────── */
export const PROVIDERS = [
  {
    id: "openrouter",
    label: "✦ Free (OpenRouter)",
    sublabel: "stepfun/step-3.5-flash:free",
    free: true,
  },
  {
    id: "gemini",
    label: "Gemini 2.5 Flash",
    sublabel: "Google — may hit quota",
    free: false,
  },
];

/* ─── Topic descriptions ──────────────────────────────────── */
const TOPIC_MAP = {
  lec1: "Digital Foundations: analog vs digital signals, ADC/DAC, frequency, period, duty cycle",
  lec2: "Number Systems: binary, hexadecimal, octal, BCD, Gray code, positional notation and conversion",
  lec3: "Binary Math & Signed Representations: two's complement, sign extension, binary addition/subtraction, overflow vs carry, ASCII encoding",
  lec4: "Logic Gates: NOT, AND, OR, XOR, NAND, NOR, XNOR gates, truth tables, combinational logic circuits",
  lec5: "Boolean Algebra: commutative/associative/distributive laws, DeMorgan's theorem, simplification rules and operator precedence",
  lec6: "SOP & POS Formats: sum-of-products, product-of-sums, converting truth tables to Boolean expressions",
  "lec7-kmap": "Karnaugh Maps (K-Maps): grouping rules, 2/3/4-variable K-maps, don't-care conditions, SOP and POS simplification",
  "lec8-binops": "Binary Operation Applications: ALU operations, arithmetic/logical bit shifts, parity bits, CRC checksums, bit masking",
  "lec10-mem": "Memory Cells & Flip-Flops: SR latch, D flip-flop, JK flip-flop, T flip-flop — truth tables, characteristic equations, SRAM vs DRAM",
  "lec11-fsm": "State Machines: Finite State Machines (FSM), Moore vs Mealy models, state diagrams, state tables, counter design with flip-flops",
  "lec12-memorg": "Memory Organization: address lines and capacity formula (2^k × w), SRAM, DRAM, ROM, PROM, EPROM, EEPROM, Flash memory, chip expansion",
  "lec13-hierarchy": "Memory Hierarchy: registers, L1/L2/L3 cache, DRAM, secondary/tertiary storage; cache HIT/MISS, hit rate, average access time, locality of reference",
  "lec14-serial": "Serial Protocol Basics: UART (frame structure, baud rate), SPI (MOSI/MISO/SCLK/SS), I2C (SDA/SCL, addressing, ACK/NACK); protocol comparison",
  "note1-core": "Combinational Logic Core: truth tables, Boolean expression derivation, logic diagrams, memoryless circuits",
  "note1-mux": "Multiplexer Logic: 2-to-1 and 4-to-1 MUX, selection lines, Boolean implementation from truth tables",
  "note2-encoder": "Priority Encoders: encoding multiple active inputs with priority resolution, 4-to-2 and 8-to-3 encoders",
  "note2-decoder": "Binary Decoders: n-to-2^n line decoding, active-high/low outputs, enable lines, address decoding",
  "note2-adder": "Binary Adders: half adder (SUM/CARRY), full adder, ripple carry adder, carry look-ahead adder",
  note3: "Binary Subtractors & Comparators: half/full subtractor, 2's complement subtraction, identity vs magnitude comparator, BCD-to-7-segment decoder",
};

/* ─── Shared prompt builder ───────────────────────────────── */
function buildPrompt(topicId, count) {
  const label = TOPIC_MAP[topicId] ?? topicId;
  return `You are an expert digital logic and computer engineering professor.

Generate exactly ${count} rigorous, exam-style multiple-choice questions on:
"${label}"

Requirements:
- Test understanding and application, not just recall.
- Include at least one numerical/calculation question.
- Include conceptual and scenario-based questions.
- All 4 options (A, B, C, D) must be plausible — no obviously wrong distractors.
- Each feedback entry must clearly explain WHY that option is correct or incorrect.
- University intermediate-to-advanced difficulty.

CRITICAL: Respond ONLY with a valid raw JSON array. No markdown fences, no preamble, no extra text.

JSON format (strict):
[
  {
    "question": "Full question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "feedback": [
      "Explanation for option A.",
      "Explanation for option B.",
      "Explanation for option C.",
      "Explanation for option D."
    ]
  }
]

Rules:
- "correct" is the 0-based index (0=A, 1=B, 2=C, 3=D).
- Every question must cover a unique concept — no repetition.`;
}

function parseQuestions(rawText, topicId) {
  const cleaned = rawText
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim();
  const parsed = JSON.parse(cleaned);
  if (!Array.isArray(parsed)) throw new Error("Unexpected non-array response from AI");
  return parsed.map((q) => ({ ...q, module: topicId }));
}

/* ─── PRODUCTION: call via serverless proxy ───────────────── */
async function generateViaProxy(topicId, count, provider) {
  const res = await fetch("/api/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topicId, count, provider }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? res.statusText);
  }
  const { questions } = await res.json();
  return questions;
}

/* ─── DEV: direct Gemini call (uses local .env key) ──────── */
async function generateViaGeminiDirect(topicId, count) {
  const prompt = buildPrompt(topicId, count);
  const res = await fetch(GEMINI_URL(DEV_GEMINI_KEY), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.75 },
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return parseQuestions(raw, topicId);
}

/* ─── Explain Question (DEV and PROD) ─────────────────────── */
function buildExplainPrompt(questionObj, wrongAnswerIndex) {
  const { question, options, correct } = questionObj;
  return `You are an expert digital logic professor. A student missed a question.
QUESTION: ${question}
OPTIONS: A) ${options[0]}  B) ${options[1]}  C) ${options[2]}  D) ${options[3]}
CORRECT: ${options[correct]}
THEY SELECTED: ${options[wrongAnswerIndex]}

Please explicitly explain why their answer was incorrect, and why the actual correct answer is right. Output only the explanation using clear markdown formatting. break it down step-by-step.`;
}

async function explainViaProxy(questionObj, wrongAnswerIndex, provider) {
  const res = await fetch("/api/explain-question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionObj, wrongAnswerIndex, provider }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? res.statusText);
  }
  const { explanation } = await res.json();
  return explanation;
}

async function explainViaGeminiDirect(questionObj, wrongAnswerIndex) {
  const prompt = buildExplainPrompt(questionObj, wrongAnswerIndex);
  const res = await fetch(GEMINI_URL(DEV_GEMINI_KEY), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No explanation generated.";
}

async function explainViaOpenRouterDirect(questionObj, wrongAnswerIndex) {
  const prompt = buildExplainPrompt(questionObj, wrongAnswerIndex);
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEV_OPENROUTER_KEY}`,
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "IFT 211 Study Hub",
    },
    body: JSON.stringify({
      model: "stepfun/step-3.5-flash:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "No explanation generated.";
}


/* ─── DEV: direct OpenRouter call (uses local .env key) ───── */
async function generateViaOpenRouterDirect(topicId, count) {
  const prompt = buildPrompt(topicId, count);
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEV_OPENROUTER_KEY}`,
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "IFT 211 Study Hub",
    },
    body: JSON.stringify({
      model: "stepfun/step-3.5-flash:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "";
  return parseQuestions(raw, topicId);
}

/* ─── Public API ──────────────────────────────────────────── */
/**
 * Generate quiz questions.
 * @param {string} topicId   - Course topic ID (e.g. "lec1", "lec7-kmap")
 * @param {number} count     - Number of questions (default 5)
 * @param {string} provider  - "gemini" | "openrouter" (default "openrouter")
 */
export async function generateQuiz(topicId, count = 5, provider = "openrouter") {
  if (IS_PROD) {
    // Production: all calls go through the serverless proxy (keys never in bundle)
    return generateViaProxy(topicId, count, provider);
  }

  // Local dev: call directly using VITE_ keys from .env
  if (provider === "gemini") {
    return generateViaGeminiDirect(topicId, count);
  }
  return generateViaOpenRouterDirect(topicId, count);
}

/**
 * Get an AI explanation for a missed question.
 * @param {object} questionObj - The question object containing question, options, correct index
 * @param {number} wrongAnswerIndex - The index the user guessed incorrectly
 * @param {string} provider - "gemini" | "openrouter"
 */
export async function explainQuestion(questionObj, wrongAnswerIndex, provider = "openrouter") {
  if (IS_PROD) {
    return explainViaProxy(questionObj, wrongAnswerIndex, provider);
  }
  if (provider === "gemini") {
    return explainViaGeminiDirect(questionObj, wrongAnswerIndex);
  }
  return explainViaOpenRouterDirect(questionObj, wrongAnswerIndex);
}
