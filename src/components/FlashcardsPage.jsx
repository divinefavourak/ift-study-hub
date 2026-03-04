import { useMemo, useRef, useState, useEffect } from "react";
import { FLASHCARDS } from "../data/courseData";
import { fetchFlashcards, syncFlashcards } from "../services/supabase";

const MODULE_LABELS = {
  lec1: "Lecture 1",
  note1: "Note One",
  note2: "Note Two",
};

function labelForModule(module) {
  return MODULE_LABELS[module] ?? module;
}

export default function FlashcardsPage({ user }) {
  const [filter, setFilter] = useState("all");
  const [showOnlyReview, setShowOnlyReview] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [mastery, setMastery] = useState({});
  const [loading, setLoading] = useState(true);
  const syncTimeout = useRef(null);

  // Derive unique modules from data (no hardcoding)
  const modules = useMemo(
    () => [...new Set(FLASHCARDS.map((c) => c.module))],
    []
  );

  useEffect(() => {
    async function load() {
      if (user) {
        const saved = await fetchFlashcards(user.id);
        if (saved) setMastery(saved);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  function handleMastery(e, index, status) {
    e.stopPropagation();
    const newMastery = { ...mastery, [index]: status };
    setMastery(newMastery);
    if (user) {
      clearTimeout(syncTimeout.current);
      syncTimeout.current = setTimeout(() => syncFlashcards(user.id, newMastery), 1500);
    }
  }

  const cards = useMemo(() => {
    return FLASHCARDS.map((card, idx) => ({ ...card, originalIndex: idx })).filter((card) => {
      const matchModule = filter === "all" || card.module === filter;
      const matchMastery = !showOnlyReview || mastery[card.originalIndex] !== "mastered";
      return matchModule && matchMastery;
    });
  }, [filter, showOnlyReview, mastery]);

  function toggleCard(index) {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  if (loading) {
    return (
      <section className="page active-page flex items-center justify-center">
        <div className="text-gray-400">Loading flashcards...</div>
      </section>
    );
  }

  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">Practice</div>
        <h3>FLASHCARDS</h3>
        <p>Click or tap any card to flip.</p>
      </div>

      <div className="filters">
        <button
          className={`pill ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {modules.map((mod) => (
          <button
            key={mod}
            className={`pill ${filter === mod ? "active" : ""}`}
            onClick={() => setFilter(mod)}
          >
            {labelForModule(mod)}
          </button>
        ))}
      </div>

      <div className="filters" style={{ marginTop: "10px" }}>
        <button
          className={`pill highlight ${showOnlyReview ? "active" : ""}`}
          onClick={() => setShowOnlyReview(!showOnlyReview)}
          style={{ width: "100%", justifyContent: "center", borderStyle: "dashed", borderColor: "var(--orange)" }}
        >
          {showOnlyReview ? "🧠 Showing 'Need Review' only" : "📚 Click to filter just 'Need Review'"}
        </button>
      </div>

      <div className="flash-grid">
        {cards.length === 0 ? (
          <div className="empty-state">No flashcards found for this filter.</div>
        ) : (
          cards.map((card) => {
            const idx = card.originalIndex;
            const isMastered = mastery[idx] === "mastered";

            return (
              <div
                key={`${card.module}-${idx}`}
                className={`flash-card ${flipped[idx] ? "flipped" : ""}`}
                onClick={() => toggleCard(idx)}
                style={{ cursor: "pointer" }}
              >
                <div className="flash-inner">
                  <div className="flash-front" style={{ border: isMastered ? "2px solid var(--green)" : "none" }}>
                    <div className="flash-meta">
                      Card {idx + 1} / {FLASHCARDS.length} | {labelForModule(card.module)}
                      {isMastered && <span style={{ color: "var(--green)", float: "right" }}>✓ Mastered</span>}
                    </div>
                    <p>{card.question}</p>
                  </div>
                  <div className="flash-back" style={{ border: isMastered ? "2px solid var(--green)" : "none" }}>
                    <div className="flash-meta">Answer</div>
                    <p>{card.answer}</p>

                    <div className="flash-mastery-controls" style={{
                      marginTop: "auto",
                      display: "flex",
                      gap: "10px",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "12px"
                    }}>
                      <button
                        className={`action outline small ${mastery[idx] === "review" ? "active" : ""}`}
                        style={{ flex: 1, borderColor: "var(--orange)", color: "var(--orange)" }}
                        onClick={(e) => handleMastery(e, idx, "review")}
                      >
                        Needs Review ↻
                      </button>
                      <button
                        className={`action outline small ${mastery[idx] === "mastered" ? "active" : ""}`}
                        style={{ flex: 1, borderColor: "var(--green)", color: "var(--green)" }}
                        onClick={(e) => handleMastery(e, idx, "mastered")}
                      >
                        Got It! ✓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
