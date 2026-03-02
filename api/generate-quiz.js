/**
 * api/generate-quiz.js
 * Vercel Serverless Function — server-side proxy for quiz generation.
 *
 * In production the browser calls this endpoint instead of Gemini/OpenRouter 
 * directly, so API keys NEVER appear in the client bundle.
 *
 * Env vars needed in Vercel dashboard (NO VITE_ prefix = never exposed to browser):
 *   GEMINI_API_KEY       — Google Gemini API key
 *   OPENROUTER_API_KEY   — OpenRouter API key
 */

const GEMINI_URL = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

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

function buildPrompt(topicId, count) {
  const topicLabel = TOPIC_MAP[topicId] ?? topicId;
  return `You are an expert digital logic and computer engineering professor.

Generate exactly ${count} rigorous, exam-style multiple-choice questions on:
"${topicLabel}"

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
  if (!Array.isArray(parsed)) throw new Error("Response is not a JSON array");
  return parsed.map((q) => ({ ...q, module: topicId }));
}

async function callGemini(topicId, count, apiKey) {
  const prompt = buildPrompt(topicId, count);
  const res = await fetch(GEMINI_URL(apiKey), {
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

async function callOpenRouter(topicId, count, apiKey) {
  const prompt = buildPrompt(topicId, count);
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://ift211-study-hub.vercel.app",
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

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topicId, count = 5, provider = "openrouter" } = req.body;

  if (!topicId) {
    return res.status(400).json({ error: "Missing topicId" });
  }

  try {
    let questions;

    if (provider === "gemini") {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
      questions = await callGemini(topicId, count, apiKey);
    } else {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "OPENROUTER_API_KEY not configured on server" });
      questions = await callOpenRouter(topicId, count, apiKey);
    }

    return res.status(200).json({ questions });
  } catch (err) {
    console.error("[generate-quiz]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
