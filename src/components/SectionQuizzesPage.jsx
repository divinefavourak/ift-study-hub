import { useMemo, useState } from "react";
import { SECTION_QUIZZES } from "../data/courseData";
import QuizPanel from "./QuizPanel";
import { syncAttempt } from "../services/supabase";

const SECTION_KEYS = Object.keys(SECTION_QUIZZES);

const SECTION_LABELS = {
  lec1: "Lecture 1",
  note1: "Note One",
  note2: "Note Two",
};

function sectionLabel(key) {
  return SECTION_LABELS[key] ?? key;
}

function SectionQuizzesPage({ onSaveScore, user }) {
  const [active, setActive] = useState(SECTION_KEYS[0]);
  const questions = useMemo(() => SECTION_QUIZZES[active].questions, [active]);

  function handleScoreSaved(quizKeyStr, pct) {
    onSaveScore(quizKeyStr, pct);
    if (user?.id) {
      const total = questions.length;
      const score = Math.round((pct / 100) * total);
      syncAttempt(user.id, {
        topicId:    active,
        topicLabel: `Section Quiz — ${sectionLabel(active)}`,
        score,
        total,
        pct,
        provider:   "static",
      }).catch(console.error);
    }
  }

  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">Assessment</div>
        <h3>SECTION QUIZZES</h3>
        <p>Three major section quizzes, 4 questions each, with detailed feedback.</p>
      </div>

      <div className="filters">
        {SECTION_KEYS.map((key) => (
          <button
            key={key}
            className={`pill ${active === key ? "active" : ""}`}
            onClick={() => setActive(key)}
          >
            {sectionLabel(key)}
          </button>
        ))}
      </div>

      <QuizPanel
        key={`section-${active}`}
        questions={questions}
        quizKey={`section_${active}`}
        onScoreSaved={handleScoreSaved}
      />
    </section>
  );
}

export default SectionQuizzesPage;
