/**
 * api/explain-question.js
 * Vercel Serverless Function — server-side proxy for explaining a missed quiz question.
 */

const GEMINI_URL = (key) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function buildPrompt(questionObj, wrongAnswerIndex) {
  const { question, options, correct, feedback } = questionObj;
  const wrongAnswer = options[wrongAnswerIndex];
  const correctAnswer = options[correct];
  
  return `You are an expert digital logic and computer engineering professor.
A student just answered a multiple-choice question incorrectly and wants a step-by-step breakdown.

QUESTION:
${question}

OPTIONS:
A) ${options[0]}
B) ${options[1]}
C) ${options[2]}
D) ${options[3]}

THE CORRECT ANSWER IS: ${correctAnswer}
THE STUDENT SELECTED: ${wrongAnswer}

Please provide a clear, encouraging, and detailed explanation analyzing WHY the student's answer was incorrect, and WHY the actual correct answer is right. 
Break down the steps if it's a calculation or a logic problem. Use markdown formatting to make it easy to read.
Do not output anything besides the explanation.`;
}

async function callGemini(questionObj, wrongAnswerIndex, apiKey) {
  const prompt = buildPrompt(questionObj, wrongAnswerIndex);
  const res = await fetch(GEMINI_URL(apiKey), {
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

async function callOpenRouter(questionObj, wrongAnswerIndex, apiKey) {
  const prompt = buildPrompt(questionObj, wrongAnswerIndex);
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
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "No explanation generated.";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { questionObj, wrongAnswerIndex, provider = "openrouter" } = req.body;

  if (!questionObj || wrongAnswerIndex === undefined) {
    return res.status(400).json({ error: "Missing questionObj or wrongAnswerIndex" });
  }

  try {
    let explanation;

    if (provider === "gemini") {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
      explanation = await callGemini(questionObj, wrongAnswerIndex, apiKey);
    } else {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) return res.status(500).json({ error: "OPENROUTER_API_KEY not configured on server" });
      explanation = await callOpenRouter(questionObj, wrongAnswerIndex, apiKey);
    }

    return res.status(200).json({ explanation });
  } catch (err) {
    console.error("[explain-question]", err.message);
    return res.status(500).json({ error: err.message });
  }
}
