import { useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import SourceMapPage from "./components/SourceMapPage";
import TopicPage from "./components/TopicPage";
import FlashcardsPage from "./components/FlashcardsPage";
import SectionQuizzesPage from "./components/SectionQuizzesPage";
import FullQuizPage from "./components/FullQuizPage";
import GlossaryPage from "./components/GlossaryPage";
import AIQuizPage from "./components/AIQuizPage";
import { PAGE_IDS } from "./data/courseData";

const STORAGE_KEYS = {
  visited: "ift211_react_visited",
  scores: "ift211_react_scores",
};

function App() {
  const [activePage, setActivePage] = useState("home");
  const [visitedPages, setVisitedPages] = useState(() => {
    try {
      const savedVisited = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.visited) || "[]"
      );
      if (Array.isArray(savedVisited) && savedVisited.length > 0) {
        const restored = new Set(savedVisited);
        restored.add("home");
        return restored;
      }
    } catch {
      // Ignore malformed local storage.
    }
    return new Set(["home"]);
  });
  const [scoreBook, setScoreBook] = useState(() => {
    try {
      const savedScores = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.scores) || "{}"
      );
      if (savedScores && typeof savedScores === "object") {
        return savedScores;
      }
    } catch {
      // Ignore malformed local storage.
    }
    return {};
  });

  const progressPct = useMemo(() => {
    if (PAGE_IDS.length === 0) return 0;
    return Math.round((visitedPages.size / PAGE_IDS.length) * 100);
  }, [visitedPages]);

  function saveScore(scoreKey, scorePct) {
    setScoreBook((prev) => {
      const best = Math.max(prev[scoreKey] || 0, scorePct);
      const next = { ...prev, [scoreKey]: best };
      localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(next));
      return next;
    });
  }

  function navigate(pageId) {
    setActivePage(pageId);
    setVisitedPages((prev) => {
      const next = new Set(prev);
      next.add(pageId);
      localStorage.setItem(STORAGE_KEYS.visited, JSON.stringify([...next]));
      return next;
    });
  }

  function renderPage() {
    if (activePage === "home") {
      return <HomePage onNavigate={navigate} scoreBook={scoreBook} />;
    }
    if (activePage === "source-map") {
      return <SourceMapPage />;
    }
    if (activePage.startsWith("lec") || activePage.startsWith("note")) {
      return <TopicPage pageId={activePage} />;
    }
    if (activePage === "flashcards") {
      return <FlashcardsPage />;
    }
    if (activePage === "section-quizzes") {
      return <SectionQuizzesPage onSaveScore={saveScore} />;
    }
    if (activePage === "full-quiz") {
      return <FullQuizPage onSaveScore={saveScore} />;
    }
    if (activePage === "ai-quiz") {
      return <AIQuizPage onSaveScore={saveScore} />;
    }
    if (activePage === "glossary") {
      return <GlossaryPage />;
    }
    return <HomePage onNavigate={navigate} scoreBook={scoreBook} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        progressPct={progressPct}
      />
      <main className="main-panel">{renderPage()}</main>
    </div>
  );
}

export default App;
