import { useEffect, useMemo, useState } from "react";
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
import LeaderboardPage from "./components/LeaderboardPage";
import Cheatsheet from "./components/Cheatsheet";
import LogicGateBuilder from "./components/LogicBuilder/LogicGateBuilder";
import BattlePage from "./components/BattlePage";
import SplashScreen from "./components/SplashScreen";
import AuthModal from "./components/AuthModal";
import { PAGE_IDS } from "./data/courseData";
import { onAuthChange, getSession, getProfile, signOut } from "./services/supabase";

const STORAGE_KEYS = { visited: "ift211_react_visited", scores: "ift211_react_scores" };

function App() {
  // ── Splash ────────────────────────────────────────────────────
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem("ift211_splash_seen")
  );

  // ── Auth ──────────────────────────────────────────────────────
  const [session, setSession]           = useState(null);
  const [profile, setProfile]           = useState(null);
  const [authLoading, setAuthLoading]   = useState(true);

  // Auth modal control
  const [showAuth, setShowAuth]         = useState(false);
  const [needUsername, setNeedUsername] = useState(false);

  useEffect(() => {
    getSession().then(async (s) => {
      setSession(s);
      if (s?.user) await resolveProfile(s.user);
      setAuthLoading(false);
    });

    const unsub = onAuthChange(async (s) => {
      setSession(s);
      if (s?.user) {
        await resolveProfile(s.user);
      } else {
        setProfile(null);
        setNeedUsername(false);
      }
    });
    return unsub;
  }, []);

  async function resolveProfile(user) {
    const p = await getProfile(user.id);
    if (p) {
      setProfile(p);
      setNeedUsername(false);
      setShowAuth(false);
    } else {
      // New Google user — need to collect username
      setProfile(null);
      setNeedUsername(true);
      setShowAuth(true);
    }
  }

  // Show auth gate after splash finishes for guests
  const showAuthGate = splashDone && !authLoading && !session && !showAuth;

  // ── Navigation & progress ─────────────────────────────────────
  const [activePage, setActivePage] = useState("home");
  const [visitedPages, setVisitedPages] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.visited) || "[]");
      if (Array.isArray(s) && s.length) { const r = new Set(s); r.add("home"); return r; }
    } catch { /**/ }
    return new Set(["home"]);
  });
  const [scoreBook, setScoreBook] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.scores) || "{}");
      if (s && typeof s === "object") return s;
    } catch { /**/ }
    return {};
  });

  const progressPct = useMemo(() => {
    if (PAGE_IDS.length === 0) return 0;
    return Math.round((visitedPages.size / PAGE_IDS.length) * 100);
  }, [visitedPages]);

  // ── Quick quiz from topic page ────────────────────────────────
  const [defaultTopic, setDefaultTopic] = useState(null);

  function handleQuickQuiz(topicId) {
    setDefaultTopic(topicId);
    navigate("ai-quiz");
  }

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

  // ── Page renderer ─────────────────────────────────────────────
  function renderPage() {
    if (activePage === "home")             return <HomePage onNavigate={navigate} scoreBook={scoreBook} />;
    if (activePage === "source-map")       return <SourceMapPage />;
    if (activePage === "flashcards")       return <FlashcardsPage user={session?.user} />;
    if (activePage === "section-quizzes")  return <SectionQuizzesPage onSaveScore={saveScore} user={session?.user} />;
    if (activePage === "full-quiz")        return <FullQuizPage onSaveScore={saveScore} user={session?.user} />;
    if (activePage === "ai-quiz")          return <AIQuizPage onSaveScore={saveScore} user={session?.user} defaultTopic={defaultTopic} />;
    if (activePage === "cheatsheet")       return <Cheatsheet onBack={() => navigate("home")} />;
    if (activePage === "logic-builder")    return <LogicGateBuilder />;
    if (activePage === "battle")           return <BattlePage user={session?.user} profile={profile} />;
    if (activePage === "glossary")         return <GlossaryPage />;
    if (activePage === "leaderboard")      return <LeaderboardPage user={session?.user} profile={profile} />;
    if (activePage.startsWith("lec") || activePage.startsWith("note"))
                                           return <TopicPage pageId={activePage} onNavigate={navigate} onQuickQuiz={handleQuickQuiz} />;
    return <HomePage onNavigate={navigate} scoreBook={scoreBook} />;
  }

  return (
    <div className="app-shell">

      {/* ── Splash ─────────────────────────────────────────────── */}
      {!splashDone && (
        <SplashScreen onDone={() => {
          sessionStorage.setItem("ift211_splash_seen", "1");
          setSplashDone(true);
        }} />
      )}

      {/* ── Post-splash auth gate ───────────────────────────────── */}
      {showAuthGate && (
        <div className="auth-gate-overlay">
          <AuthModal
            needUsername={false}
            onClose={null /* non-dismissible gate */}
          />
        </div>
      )}

      {/* ── Username collection (after Google OAuth) ────────────── */}
      {showAuth && needUsername && session?.user && (
        <AuthModal
          needUsername={true}
          user={session.user}
          onUsernameSet={async () => {
            await resolveProfile(session.user);
          }}
          onClose={null}
        />
      )}

      {/* ── Regular sign-in modal (from sidebar button) ─────────── */}
      {showAuth && !needUsername && session === null && (
        <AuthModal
          needUsername={false}
          onClose={() => setShowAuth(false)}
        />
      )}

      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        progressPct={progressPct}
        user={session?.user}
        profile={profile}
        onSignInClick={() => setShowAuth(true)}
        onSignOut={async () => { await signOut(); setSession(null); setProfile(null); }}
      />

      <main className="main-panel">{renderPage()}</main>
    </div>
  );
}

export default App;
