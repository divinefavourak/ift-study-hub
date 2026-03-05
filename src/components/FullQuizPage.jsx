import { useMemo, useState } from "react";
import { FULL_QUIZ } from "../data/courseData";
import QuizPanel from "./QuizPanel";
import { syncAttempt } from "../services/supabase";

const FILTER_LABELS = {
  all:   "Full Quiz",
  lec1:  "Full Quiz — Lecture 1",
  note1: "Full Quiz — Note One",
  note2: "Full Quiz — Note Two",
};

const MAX_QUESTIONS = 60;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FullQuizPage({ onSaveScore, user }) {
  const [filter, setFilter] = useState("all");

  const questions = useMemo(() => {
    const pool = FULL_QUIZ.filter((q) => filter === "all" || q.module === filter);
    return shuffle(pool).slice(0, MAX_QUESTIONS);
  }, [filter]);

  function handleScoreSaved(quizKeyStr, pct) {
    onSaveScore(quizKeyStr, pct);
    if (user?.id) {
      const total = questions.length;
      const score = Math.round((pct / 100) * total);
      syncAttempt(user.id, {
        topicId:    `full_${filter}`,
        topicLabel: FILTER_LABELS[filter] ?? `Full Quiz — ${filter}`,
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
        <h3>FULL COURSE QUIZ</h3>
        <p>60 questions randomly drawn from the full question bank — a fresh set every attempt.</p>
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

      <QuizPanel
        key={`full-${filter}`}
        questions={questions}
        quizKey={`full_${filter}`}
        onScoreSaved={handleScoreSaved}
      />
    </section>
  );
}

export default FullQuizPage;
