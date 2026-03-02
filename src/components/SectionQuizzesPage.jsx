import { useMemo, useState } from "react";
import { SECTION_QUIZZES } from "../data/courseData";
import QuizPanel from "./QuizPanel";

function SectionQuizzesPage({ onSaveScore }) {
  const [active, setActive] = useState("lec1");
  const questions = useMemo(() => SECTION_QUIZZES[active].questions, [active]);

  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">Assessment</div>
        <h3>SECTION QUIZZES</h3>
        <p>Three major section quizzes, 4 questions each, with detailed feedback.</p>
      </div>

      <div className="filters">
        <button
          className={`pill ${active === "lec1" ? "active" : ""}`}
          onClick={() => setActive("lec1")}
        >
          Lecture 1
        </button>
        <button
          className={`pill ${active === "note1" ? "active" : ""}`}
          onClick={() => setActive("note1")}
        >
          Note One
        </button>
        <button
          className={`pill ${active === "note2" ? "active" : ""}`}
          onClick={() => setActive("note2")}
        >
          Note Two
        </button>
      </div>

      <QuizPanel
        key={`section-${active}`}
        questions={questions}
        quizKey={`section_${active}`}
        onScoreSaved={onSaveScore}
      />
    </section>
  );
}

export default SectionQuizzesPage;
