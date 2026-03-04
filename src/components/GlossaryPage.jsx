import { useMemo, useState } from "react";
import { GLOSSARY } from "../data/courseData";

const MODULE_LABELS = {
  lec1: "Lecture 1",
  note1: "Note One",
  note2: "Note Two",
};

function moduleLabel(module) {
  return MODULE_LABELS[module] ?? module;
}

function GlossaryPage() {
  const [filter, setFilter] = useState("all");

  const modules = useMemo(
    () => [...new Set(GLOSSARY.map((e) => e.module))],
    []
  );

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
        {modules.map((mod) => (
          <button
            key={mod}
            className={`pill ${filter === mod ? "active" : ""}`}
            onClick={() => setFilter(mod)}
          >
            {moduleLabel(mod)}
          </button>
        ))}
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
