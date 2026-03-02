import { useMemo, useState, useEffect } from "react";
import { FLASHCARDS } from "../data/courseData";
import { fetchFlashcards, syncFlashcards } from "../services/supabase";

function labelForModule(module) {
  if (module === "lec1") return "Lecture 1";
  if (module === "note1") return "Note One";
  return "Note Two";
}

export default function FlashcardsPage({ user }) {
  const [filter, setFilter] = useState("all"); // 'all', 'lec1', 'note1', 'note2'
  const [showOnlyReview, setShowOnlyReview] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [mastery, setMastery] = useState({}); // { [cardIndex]: 'mastered' | 'review' }
  const [loading, setLoading] = useState(true);

  // Load mastery state from Supabase on mount
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

  // Handle Mastery update
  async function handleMastery(e, index, status) {
    e.stopPropagation(); // prevent flipping the card back
    const newMastery = { ...mastery, [index]: status };
    setMastery(newMastery);
    if (user) {
      await syncFlashcards(user.id, newMastery);
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
        <button
          className={`pill ${filter === "lec1" ? "active" : ""}`}
          onClick={() => setFilter("lec1")}
        >
          Lecture 1
        </button>
        <button
          className={`pill ${filter === "note1" ? "active" : ""}`}
          onClick={() => setFilter("note1")}
        >
          Note One
        </button>
        <button
          className={`pill ${filter === "note2" ? "active" : ""}`}
          onClick={() => setFilter("note2")}
        >
          Note Two
        </button>
      </div>

      <div className="filters" style={{ marginTop: '10px' }}>
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
                      {isMastered && <span style={{color:"var(--green)", float:"right"}}>✓ Mastered</span>}
                    </div>
                    <p>{card.question}</p>
                  </div>
                  <div className="flash-back" style={{ border: isMastered ? "2px solid var(--green)" : "none" }}>
                    <div className="flash-meta">Answer</div>
                    <p>{card.answer}</p>
                    
                    {/* Mastery Controls */}
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

