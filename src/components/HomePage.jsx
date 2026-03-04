import { useEffect, useState } from "react";
import { HOME_TAGS } from "../data/courseData";

const QUICK_LINKS = [
  {
    id: "lec1",
    tag: "Lecture 1",
    title: "Digital Foundations",
    desc: "Analog vs digital, signal behavior, timing equations.",
    icon: "⚡",
    color: "var(--blue)",
  },
  {
    id: "lec4",
    tag: "Lecture 4",
    title: "Logic Gates",
    desc: "NOT, AND, OR, XOR — truth tables and combinational circuits.",
    icon: "⊕",
    color: "var(--cyan)",
  },
  {
    id: "note1-core",
    tag: "Note One",
    title: "Combinational Core",
    desc: "Memoryless circuit logic and function representation.",
    icon: "◈",
    color: "var(--orange)",
  },
  {
    id: "note2-adder",
    tag: "Note Two",
    title: "Adders & Decoders",
    desc: "Priority resolution, address decoding, arithmetic logic.",
    icon: "∑",
    color: "var(--green)",
  },
  {
    id: "ai-quiz",
    tag: "AI Practice",
    title: "✦ AI Quiz Generator",
    desc: "Gemini generates fresh exam-style questions in real time.",
    icon: "✦",
    color: "#a78bfa",
  },
  {
    id: "section-quizzes",
    tag: "Assessment",
    title: "Section Quizzes",
    desc: "Cambridge-style quizzes with per-option feedback.",
    icon: "✓",
    color: "#f472b6",
  },
];

const STATS = [
  { value: "14+", label: "Lectures" },
  { value: "50+", label: "Flashcards" },
  { value: "∞", label: "AI Quizzes" },
  { value: "100%", label: "Free" },
];

function HomePage({ onNavigate, scoreBook, user, onSignInClick }) {
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const summary = [
    ["section_lec1", "Lecture 1 quiz"],
    ["section_note1", "Note One quiz"],
    ["section_note2", "Note Two quiz"],
    ["full_all", "Full mixed quiz"],
  ]
    .filter(([key]) => typeof scoreBook[key] === "number")
    .map(([key, label]) => ({ key, label, score: scoreBook[key] }));

  return (
    <section className={`page active-page home-page ${visible ? "hp-visible" : ""}`}>

      {/* ── Animated background particles ─────────────── */}
      <div className="hp-particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="hp-particle" style={{
            "--i": i,
            left: `${(i * 17 + 7) % 100}%`,
            animationDelay: `${(i * 0.4) % 6}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }} />
        ))}
      </div>

      {/* ── Hero ──────────────────────────────────────── */}
      <div className="hp-hero">
        <div className="hp-eyebrow hp-anim" style={{ "--d": "0ms" }}>
          IFT 211 · MATERIAL-ALIGNED INTERACTIVE HUB
          <span className="hp-eyebrow-dot">·</span>
          BY JESUTOBI-001 OF CSC
        </div>

        <h2 className="hp-title hp-anim" style={{ "--d": "120ms" }}>
          <span className="hp-title-line1">DIGITAL LOGIC</span>
          <br />
          <span className="hp-title-line2">AND DESIGN</span>
        </h2>

        <p className="hp-subtitle hp-anim" style={{ "--d": "240ms" }}>
          Your complete IFT 211 companion — lecture notes, flashcards, section
          quizzes and <em>AI-generated</em> practice questions, all in one place.
        </p>

        <div className="hp-cta-row hp-anim" style={{ "--d": "360ms" }}>
          <button className="hp-cta-primary" onClick={() => onNavigate("lec1")}>
            Start Studying →
          </button>
          <button className="hp-cta-secondary" onClick={() => onNavigate("ai-quiz")}>
            ✦ AI Quiz
          </button>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────── */}
      <div className="hp-stats hp-anim" style={{ "--d": "480ms" }}>
        {STATS.map((s) => (
          <div key={s.label} className="hp-stat">
            <span className="hp-stat-val">{s.value}</span>
            <span className="hp-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Tags ──────────────────────────────────────── */}
      <div className="tags hp-anim" style={{ "--d": "540ms" }}>
        {HOME_TAGS.map((tag) => (
          <span className={`tag ${tag.tone}`} key={tag.label}>
            {tag.label}
          </span>
        ))}
      </div>

      {/* ── Sign-in banner (shown when not logged in) ────────── */}
      {!user && onSignInClick && (
        <div className="hp-signin-banner hp-anim" style={{ "--d": "580ms" }}>
          <div className="hp-signin-banner-content">
            <div className="hp-signin-banner-icon">🔑</div>
            <div>
              <div className="hp-signin-banner-title">Track your progress</div>
              <div className="hp-signin-banner-sub">Sign in to sync quiz scores, earn badges, and compete on the leaderboard.</div>
            </div>
          </div>
          <button className="hp-signin-banner-btn" onClick={onSignInClick}>
            Sign In with Google
          </button>
        </div>
      )}

      {/* ── Quick-access cards ────────────────────────── */}
      <div className="hp-section-label hp-anim" style={{ "--d": "600ms" }}>
        QUICK ACCESS
      </div>

      <div className="hp-card-grid hp-anim" style={{ "--d": "640ms" }}>
        {QUICK_LINKS.map((card) => (
          <button
            key={card.id}
            className="hp-card"
            style={{ "--accent": card.color }}
            onClick={() => onNavigate(card.id)}
          >
            <div className="hp-card-icon">{card.icon}</div>
            <div className="hp-card-body">
              <span className="hp-card-tag">{card.tag}</span>
              <h4 className="hp-card-title">{card.title}</h4>
              <p className="hp-card-desc">{card.desc}</p>
            </div>
            <div className="hp-card-arrow">→</div>
          </button>
        ))}
      </div>

      {/* ── Study flow ────────────────────────────────── */}
      <div className="hp-flow hp-anim" style={{ "--d": "720ms" }}>
        <h4 className="hp-flow-title">📐 Recommended Study Flow</h4>
        <ol className="hp-flow-steps">
          {[
            "Read topics from Lecture 1 through Note Three.",
            "Use inline key-term tooltips while reading.",
            "Drill flashcards after each lecture section.",
            "Take section quizzes to test your understanding.",
            "Use the ✦ AI Quiz Generator for unlimited practice.",
            "Finish with the Full Quiz for final revision.",
          ].map((step, i) => (
            <li key={i} className="hp-flow-step">
              <span className="hp-step-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Performance ───────────────────────────────── */}
      {summary.length > 0 && (
        <div className="hp-perf hp-anim" style={{ "--d": "800ms" }}>
          <h4 className="hp-flow-title">📊 Your Best Scores</h4>
          <div className="hp-perf-grid">
            {summary.map(({ key, label, score }) => (
              <div key={key} className="hp-perf-card">
                <div
                  className="hp-perf-ring"
                  style={{ "--pct": score }}
                >
                  <span>{score}%</span>
                </div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}

export default HomePage;
