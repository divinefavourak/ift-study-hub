import { useState, useCallback, useRef } from "react";
import { generateQuiz, PROVIDERS } from "../services/aiQuiz";
import { syncAttempt } from "../services/supabase";
import QuizPanel from "./QuizPanel";

/* ─── Gemini access code ─────────────────────────────────────── */
// Set VITE_GEMINI_ACCESS_CODE in your .env to customise the code.
// Default access code: IFT211
const GEMINI_ACCESS_CODE =
  import.meta.env.VITE_GEMINI_ACCESS_CODE ?? "WUNMI";
const GEMINI_LOCK_KEY = "ift211_gemini_unlocked";

function isGeminiUnlocked() {
  return sessionStorage.getItem(GEMINI_LOCK_KEY) === "1";
}

/* ─── Gemini lock modal ─────────────────────────────────────── */
function GeminiLockModal({ onUnlock, onClose }) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (code.trim().toUpperCase() === GEMINI_ACCESS_CODE.toUpperCase()) {
      sessionStorage.setItem(GEMINI_LOCK_KEY, "1");
      onUnlock();
    } else {
      setShake(true);
      setError("Incorrect access code.");
      setCode("");
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="gem-lock-overlay" onClick={onClose}>
      <div
        className={`gem-lock-modal ${shake ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gem-lock-icon">🔒</div>
        <h3 className="gem-lock-title">Gemini Access Required</h3>
        <p className="gem-lock-desc">
          This model uses your Google Gemini quota. Enter the access code to
          unlock it for this session.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="gem-lock-input"
            type="password"
            placeholder="Access code…"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            autoFocus
            autoComplete="off"
          />
          {error && <p className="gem-lock-error">{error}</p>}
          <div className="gem-lock-actions">
            <button type="button" className="gem-lock-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="gem-lock-btn unlock">
              🔓 Unlock
            </button>
          </div>
        </form>
        <p className="gem-lock-hint">
          💡 Use the <strong>✦ Free (OpenRouter)</strong> option for unlimited
          questions at no cost.
        </p>
      </div>
    </div>
  );
}

/* ─── Constants ─────────────────────────────────────────────── */
const STORAGE_KEY = "ift211_ai_sessions";
const MAX_SESSIONS = 30; // keep the last 30 attempts

const TOPICS = [
  { id: "lec1",          label: "L1 · Digital Foundations" },
  { id: "lec2",          label: "L2 · Number Systems" },
  { id: "lec3",          label: "L3 · Binary Math" },
  { id: "lec4",          label: "L4 · Logic Gates" },
  { id: "lec5",          label: "L5 · Boolean Algebra" },
  { id: "lec6",          label: "L6 · SOP & POS" },
  { id: "lec7-kmap",     label: "L7 · Karnaugh Maps" },
  { id: "lec8-binops",   label: "L8 · Binary Ops" },
  { id: "lec10-mem",     label: "L10 · Memory Cells" },
  { id: "lec11-fsm",     label: "L11 · State Machines" },
  { id: "lec12-memorg",  label: "L12 · Memory Org" },
  { id: "lec13-hierarchy",label: "L13 · Mem Hierarchy" },
  { id: "lec14-serial",  label: "L14 · Serial Protocols" },
  { id: "note1-core",    label: "N1 · Comb. Core" },
  { id: "note1-mux",     label: "N1 · Multiplexer" },
  { id: "note2-encoder", label: "N2 · Encoder" },
  { id: "note2-decoder", label: "N2 · Decoder" },
  { id: "note2-adder",   label: "N2 · Adders" },
  { id: "note3",         label: "N3 · Subtractors" },
];

const COUNTS = [3, 5, 8, 10];

/* ─── localStorage helpers ───────────────────────────────────── */
function loadSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function createSession(topic, topicLabel, questions) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    topic,
    topicLabel,
    generatedAt: new Date().toISOString(),
    questions,
    completed: false,
    score: null,
    total: questions.length,
    pct: null,
    completedAt: null,
    answers: null,        // array parallel to questions, each is the chosen option index
  };
}

function topicLabel(id) {
  return TOPICS.find((t) => t.id === id)?.label ?? id;
}

/* ─── Score colour helper ────────────────────────────────────── */
function gradeClass(pct) {
  if (pct >= 80) return "grade-a";
  if (pct >= 60) return "grade-b";
  if (pct >= 40) return "grade-c";
  return "grade-d";
}

/* ─── Main component ─────────────────────────────────────────── */
function AIQuizPage({ onSaveScore, user }) {
  const [topic, setTopic]       = useState("lec1");
  const [count, setCount]       = useState(5);
  const [provider, setProvider] = useState("openrouter");
  const [geminiUnlocked, setGeminiUnlocked] = useState(isGeminiUnlocked);
  const [showGeminiLock, setShowGeminiLock] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // Active quiz state
  const [activeSession, setActiveSession] = useState(null);
  const [quizKey, setQuizKey]  = useState(0);

  // History drawn from localStorage (re-read on each render via useState init)
  const [sessions, setSessions] = useState(loadSessions);

  /* ─── Generate ───────────────────────────────────────────── */
  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setActiveSession(null);

    try {
      const qs = await generateQuiz(topic, count, provider);
      const label = topicLabel(topic);
      const session = createSession(topic, label, qs);

      // Persist immediately so the user's questions are never lost
      const updated = [session, ...loadSessions()].slice(0, MAX_SESSIONS);
      saveSessions(updated);
      setSessions(updated);

      setActiveSession(session);
      setQuizKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to generate quiz. Check your connection and try again.\n" +
          (err.message || "")
      );
    } finally {
      setLoading(false);
    }
  }

  /* ─── Score saved (quiz completed) ──────────────────────── */
  const handleScoreSaved = useCallback(
    (quizKeyStr, pct, answers) => {
      // Forward to parent for overall progress tracking
      onSaveScore(quizKeyStr, pct);

      if (!activeSession) return;

      const completedSession = {
        ...activeSession,
        completed: true,
        score: Math.round((pct / 100) * activeSession.total),
        pct,
        completedAt: new Date().toISOString(),
        answers: answers ?? null,
      };

      const updated = loadSessions().map((s) =>
        s.id === activeSession.id ? completedSession : s
      );
      saveSessions(updated);
      setSessions(updated);
      setActiveSession(completedSession);

      // Sync to Supabase leaderboard if user is signed in
      if (user?.id) {
        syncAttempt(user.id, {
          topicId:    activeSession.topic,
          topicLabel: activeSession.topicLabel,
          score:      completedSession.score,
          total:      activeSession.total,
          pct,
          provider,
        }).catch(console.error);
      }
    },
    [activeSession, onSaveScore, provider, user]
  );

  /* ─── Load a past session ─────────────────────────────────── */
  function handleReplay(session) {
    setError(null);
    setActiveSession(session);
    setTopic(session.topic);
    setCount(session.total);
    setQuizKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ─── Delete a session ───────────────────────────────────── */
  function handleDelete(id) {
    const updated = loadSessions().filter((s) => s.id !== id);
    saveSessions(updated);
    setSessions(updated);
    if (activeSession?.id === id) setActiveSession(null);
  }

  /* ─── Clear all history ──────────────────────────────────── */
  function handleClearAll() {
    if (!confirm("Delete all quiz history? This cannot be undone.")) return;
    saveSessions([]);
    setSessions([]);
    setActiveSession(null);
  }

  /* ──────────────────────────────────────────────────────────── */
  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag ai-badge">✦ AI Generated</div>
        <h3>AI QUIZ GENERATOR</h3>
        <p>
          Gemini 2.5 Flash generates fresh, exam-style questions in real time.
          Every attempt is saved automatically — revisit past quizzes any time.
        </p>
      </div>

      {/* ── Config panel ────────────────────────────────── */}
      <div className="ai-quiz-config">
        <div className="ai-config-row">
          <label>🤖 Model</label>
          <div className="provider-pills">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                className={`provider-pill ${provider === p.id ? "active" : ""} ${p.free ? "free" : ""} ${p.id === "gemini" && !geminiUnlocked ? "locked" : ""}`}
                onClick={() => {
                  if (p.id === "gemini" && !geminiUnlocked) {
                    setShowGeminiLock(true);
                  } else {
                    setProvider(p.id);
                  }
                }}
              >
                {p.free && <span className="free-tag">FREE</span>}
                {p.id === "gemini" && !geminiUnlocked && (
                  <span className="lock-tag">🔒</span>
                )}
                <span className="provider-name">{p.label}</span>
                <span className="provider-sub">{p.sublabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="ai-config-row">
          <label htmlFor="ai-topic-select">📚 Topic</label>
          <select
            id="ai-topic-select"
            className="ai-select"
            value={topic}
            onChange={(e) => { setTopic(e.target.value); setActiveSession(null); }}
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="ai-config-row">
          <label>🔢 Questions</label>

          <div className="count-pills">
            {COUNTS.map((c) => (
              <button
                key={c}
                className={`pill ${count === c ? "active" : ""}`}
                onClick={() => setCount(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          className="action primary ai-generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <span className="ai-generating">
              <span className="ai-spinner" /> Generating…
            </span>
          ) : (
            "✦ Generate Quiz"
          )}
        </button>
      </div>

      {/* ── Error ──────────────────────────────────────── */}
      {error && (
        <div className="info-box bad ai-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* ── Shimmer ────────────────────────────────────── */}
      {loading && (
        <div className="ai-loading-area">
          <div className="ai-shimmer" />
          <div className="ai-shimmer short" />
          <div className="ai-shimmer" />
          <div className="ai-shimmer short" />
          <p className="ai-loading-label">✦ Gemini 2.5 Flash is crafting your questions…</p>
        </div>
      )}

      {/* ── Active quiz ────────────────────────────────── */}
      {activeSession && !loading && (
        <>
          <div className="ai-fresh-badge">
            ✦ {activeSession.completed ? "Reviewing" : "Fresh set"} —{" "}
            {activeSession.questions.length} questions ·{" "}
            {activeSession.topicLabel}
          </div>
          <QuizPanel
            key={quizKey}
            questions={activeSession.questions}
            quizKey={`ai_${activeSession.id}`}
            onScoreSaved={handleScoreSaved}
          />
        </>
      )}

      {/* ── Idle placeholder ───────────────────────────── */}
      {!activeSession && !loading && !error && (
        <div className="ai-idle-area">
          <div className="ai-idle-icon">✦</div>
          <p>Select a topic above and click <strong>Generate Quiz</strong> to begin.</p>
          <p className="ai-idle-sub">
            Each generation creates unique questions — no two quizzes are the same.
          </p>
        </div>
      )}

      {/* ── Session history ─────────────────────────────── */}
      {sessions.length > 0 && (
        <div className="ai-history">
          <div className="ai-history-header">
            <h4 className="ai-history-title">📋 Quiz History</h4>
            <button className="ai-clear-btn" onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          <div className="ai-session-list">
            {sessions.map((s) => (
              <div key={s.id} className={`ai-session-card ${s.completed ? "completed" : "pending"}`}>
                <div className="ai-session-info">
                  <span className="ai-session-topic">
                    {s.topicLabel || topicLabel(s.topic) || s.topic}
                  </span>
                  <span className="ai-session-date">
                    {new Date(s.generatedAt).toLocaleString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="ai-session-meta">
                  <span className="ai-session-qcount">{s.total} Qs</span>
                  {s.completed ? (
                    <span className={`ai-session-score ${gradeClass(s.pct)}`}>
                      {s.score}/{s.total} · {s.pct}%
                    </span>
                  ) : (
                    <span className="ai-session-pending">Not completed</span>
                  )}
                </div>

                <div className="ai-session-actions">
                  <button
                    className="ai-session-btn replay"
                    title={s.completed ? "Review this quiz" : "Resume this quiz"}
                    onClick={() => handleReplay(s)}
                  >
                    {s.completed ? "Review" : "Resume"}
                  </button>
                  <button
                    className="ai-session-btn delete"
                    title="Delete this session"
                    onClick={() => handleDelete(s.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showGeminiLock && (
        <GeminiLockModal
          onUnlock={() => {
            setGeminiUnlocked(true);
            setProvider("gemini");
            setShowGeminiLock(false);
          }}
          onClose={() => setShowGeminiLock(false)}
        />
      )}
    </section>
  );
}

export default AIQuizPage;
