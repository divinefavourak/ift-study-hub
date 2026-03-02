import { useMemo, useState } from "react";

const LETTERS = ["A", "B", "C", "D"];

function moduleLabel(module) {
  if (module === "lec1") return "Lecture 1";
  if (module === "lec2") return "Lecture 2";
  if (module === "lec3") return "Lecture 3";
  if (module === "lec4") return "Lecture 4";
  if (module === "lec5") return "Lecture 5";
  if (module === "lec6") return "Lecture 6";
  if (module === "note1") return "Note One";
  if (module === "note2") return "Note Two";
  if (module === "note3") return "Note Three";
  return module;
}

function QuizPanel({ questions, quizKey, onScoreSaved }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  // Track user's answer for each question (null = not answered yet)
  const [userAnswers, setUserAnswers] = useState(() => Array(questions.length).fill(null));

  const total = questions.length;

  if (total === 0) {
    return <p className="empty-state">No questions available for this section.</p>;
  }

  function handleSelect(oIndex) {
    if (hasSubmittedCurrent) return;
    setSelectedOption(oIndex);
  }

  function handleSubmit() {
    if (selectedOption === null || hasSubmittedCurrent) return;
    setHasSubmittedCurrent(true);
    // Record this answer
    setUserAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = selectedOption;
      return next;
    });
    const q = questions[currentIdx];
    if (selectedOption === q.correct) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIdx < total - 1) {
      setCurrentIdx((idx) => idx + 1);
      setSelectedOption(null);
      setHasSubmittedCurrent(false);
    } else {
      setShowResults(true);
      const lastCorrect = selectedOption === questions[currentIdx].correct ? 1 : 0;
      const finalScore = score + lastCorrect;
      const pct = Math.round((finalScore / total) * 100);
      // Build final answers array including last answer
      const finalAnswers = [...userAnswers];
      finalAnswers[currentIdx] = selectedOption;
      onScoreSaved(quizKey, pct, finalAnswers);
    }
  }

  function resetQuiz() {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasSubmittedCurrent(false);
    setScore(0);
    setShowResults(false);
  }

  if (showResults) {
    const finalScore = score; 
    const pct = Math.round((finalScore / total) * 100);
    
    return (
      <div className="quiz-results">
        <h4>Quiz Complete!</h4>
        <div className="score-box large">
          <h2>{finalScore} / {total}</h2>
          <p>{pct}%</p>
        </div>
        <button className="action primary" onClick={resetQuiz}>
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];
  const correct = selectedOption === q.correct;

  return (
    <div className="quiz-container interactive">
      <div className="quiz-progress-bar">
        <div 
          className="quiz-progress-fill" 
          style={{ width: `${((currentIdx) / total) * 100}%` }}
        />
      </div>

      <article className="quiz-card interactive-card">
        <div className="quiz-meta">
          <span>
            Question {currentIdx + 1} of {total}
          </span>
          <span className={`module-badge ${q.module}`}>{moduleLabel(q.module)}</span>
        </div>
        
        <h5>{q.question}</h5>

        <div className="quiz-options">
          {q.options.map((option, oIndex) => {
            const isSelected = selectedOption === oIndex;
            const selectedClass = isSelected ? "selected" : "";
            
            let correctnessClass = "";
            if (hasSubmittedCurrent) {
              if (oIndex === q.correct) {
                correctnessClass = "correct";
              } else if (isSelected && !correct) {
                correctnessClass = "wrong";
              }
            }

            return (
              <button
                key={`${quizKey}-${currentIdx}-${oIndex}`}
                className={`quiz-option ${selectedClass} ${correctnessClass} ${
                  hasSubmittedCurrent ? "locked" : ""
                }`}
                onClick={() => handleSelect(oIndex)}
                disabled={hasSubmittedCurrent}
              >
                <span className="letter">{LETTERS[oIndex]}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {hasSubmittedCurrent && (
          <div className={`interactive-feedback ${correct ? "ok" : "bad"}`}>
            <strong>{correct ? "Correct!" : "Incorrect."}</strong>{" "}
            <span className="feedback-text">{q.feedback[selectedOption]}</span>
          </div>
        )}
      </article>

      <div className="button-row interactive-row">
        {!hasSubmittedCurrent ? (
          <button 
            className="action primary" 
            onClick={handleSubmit} 
            disabled={selectedOption === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="action primary highlight" onClick={handleNext}>
            {currentIdx < total - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPanel;
