import { useMemo, useState } from "react";
import { FLASHCARDS } from "../data/courseData";

function labelForModule(module) {
  if (module === "lec1") return "Lecture 1";
  if (module === "note1") return "Note One";
  return "Note Two";
}

function FlashcardsPage() {
  const [filter, setFilter] = useState("all");
  const [flipped, setFlipped] = useState({});

  const cards = useMemo(
    () => FLASHCARDS.filter((card) => filter === "all" || card.module === filter),
    [filter]
  );

  function toggleCard(index) {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
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

      <div className="flash-grid">
        {cards.map((card, index) => (
          <button
            key={`${card.module}-${index}`}
            className={`flash-card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => toggleCard(index)}
          >
            <div className="flash-inner">
              <div className="flash-front">
                <div className="flash-meta">
                  Card {index + 1} / {cards.length} | {labelForModule(card.module)}
                </div>
                <p>{card.question}</p>
              </div>
              <div className="flash-back">
                <div className="flash-meta">Answer</div>
                <p>{card.answer}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FlashcardsPage;

