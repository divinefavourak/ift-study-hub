import { useMemo, useState } from "react";
import { GLOSSARY } from "../data/courseData";

function moduleLabel(module) {
  if (module === "lec1") return "Lecture 1";
  if (module === "note1") return "Note One";
  return "Note Two";
}

function GlossaryPage() {
  const [filter, setFilter] = useState("all");

  const entries = useMemo(
    () => GLOSSARY.filter((item) => filter === "all" || item.module === filter),
    [filter]
  );

  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">Reference</div>
        <h3>KEY TERM GLOSSARY</h3>
        <p>Definitions aligned to your uploaded lecture and note terminology.</p>
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

      <div className="glossary-grid">
        {entries.map((entry) => (
          <article className="glossary-card" key={`${entry.module}-${entry.term}`}>
            <h5>{entry.term}</h5>
            <p>{entry.definition}</p>
            <small>{moduleLabel(entry.module)}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GlossaryPage;

