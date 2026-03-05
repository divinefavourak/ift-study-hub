import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import H2HLeaderboardPage from "./components/H2HLeaderboardPage";
import SplashScreen from "./components/SplashScreen";
import AuthModal from "./components/AuthModal";
import ErrorBoundary from "./components/ErrorBoundary";
import { PAGE_IDS } from "./data/courseData";
import { onAuthChange, getProfile, getSession, signOut, updateProfile } from "./services/supabase";
import AvatarPicker from "./components/AvatarPicker";
import Avatar from "./components/Avatar";
import { PRESET_AVATARS } from "./data/avatars";

const STORAGE_KEYS = { visited: "ift211_react_visited", scores: "ift211_react_scores" };

function App() {
  const rNavigate = useNavigate();
  const location = useLocation();

  // Derive active page from URL (e.g. "/lec1" → "lec1", "/" → "home")
  const activePage = location.pathname.slice(1) || "home";

  function navigate(pageId) {
    rNavigate(pageId === "home" ? "/" : `/${pageId}`);
  }

  // ── Splash ────────────────────────────────────────────────────
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem("ift211_splash_seen")
  );

  // ── Auth ──────────────────────────────────────────────────────
  const [session, setSession]           = useState(null);
  const [profile, setProfile]           = useState(null);
  const [authLoading, setAuthLoading]   = useState(true);

  // Auth modal control
  const [showAuth, setShowAuth]             = useState(false);
  const [needUsername, setNeedUsername]     = useState(false);
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [editUsernameValue, setEditUsernameValue] = useState("");
  const [editAvatarId, setEditAvatarId]           = useState("");
  const [editUsernameError, setEditUsernameError] = useState("");
  const [editUsernameLoading, setEditUsernameLoading] = useState(false);

  useEffect(() => {
    // Immediately restore session from storage (fixes logout-on-refresh)
    getSession().then(async (s) => {
      setSession(s);
      if (s?.user) {
        await resolveProfile(s.user);
      } else {
        setProfile(null);
        setNeedUsername(false);
      }
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
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  async function resolveProfile(user) {
    const p = await getProfile(user.id);
    if (p) {
      // Migrate any non-peep avatar (legacy hex colours or old av_* emoji IDs)
      if (!p.avatar_color || !p.avatar_color.startsWith("peep_")) {
        const randomPreset = PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)];
        await updateProfile(user.id, { avatarId: randomPreset.id });
        p.avatar_color = randomPreset.id;
      }
      setProfile(p);
      setNeedUsername(false);
      setShowAuth(false);
    } else {
      setProfile(null);
      setNeedUsername(true);
      setShowAuth(true);
    }
  }

  const showAuthGate = splashDone && !authLoading && !session && !showAuth;

  // ── Progress tracking ─────────────────────────────────────────
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

  // Track visited pages from URL changes
  const prevPath = useRef(null);
  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;
    const pageId = location.pathname.slice(1) || "home";
    setVisitedPages((prev) => {
      if (prev.has(pageId)) return prev;
      const next = new Set(prev);
      next.add(pageId);
      localStorage.setItem(STORAGE_KEYS.visited, JSON.stringify([...next]));
      return next;
    });
  }, [location.pathname]);

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

  async function handleEditUsername(e) {
    e.preventDefault();
    setEditUsernameError("");
    const uname = editUsernameValue.trim().toLowerCase();
    if (!uname.match(/^[a-z0-9_]{3,20}$/)) {
      setEditUsernameError("3–20 characters, letters/numbers/underscores only.");
      return;
    }
    setEditUsernameLoading(true);
    const { error } = await updateProfile(session.user.id, {
      username: uname,
      avatarId: editAvatarId || undefined,
    });
    setEditUsernameLoading(false);
    if (error) { setEditUsernameError(error.message); return; }
    await resolveProfile(session.user);
    setShowEditUsername(false);
    setEditUsernameValue("");
    setEditAvatarId("");
  }

  // ── Page renderer ─────────────────────────────────────────────
  const PAGE_MAP = {
    home:              () => <HomePage onNavigate={navigate} scoreBook={scoreBook} user={session?.user} onSignInClick={() => setShowAuth(true)} />,
    "source-map":      () => <SourceMapPage />,
    flashcards:        () => <FlashcardsPage user={session?.user} />,
    "section-quizzes": () => <SectionQuizzesPage onSaveScore={saveScore} user={session?.user} />,
    "full-quiz":       () => <FullQuizPage onSaveScore={saveScore} user={session?.user} />,
    "ai-quiz":         () => <AIQuizPage onSaveScore={saveScore} user={session?.user} defaultTopic={defaultTopic} />,
    cheatsheet:        () => <Cheatsheet onBack={() => navigate("home")} />,
    "logic-builder":   () => <LogicGateBuilder />,
    battle:            () => <BattlePage user={session?.user} profile={profile} />,
    h2h:               () => <H2HLeaderboardPage user={session?.user} />,
    glossary:          () => <GlossaryPage />,
    leaderboard:       () => <LeaderboardPage user={session?.user} profile={profile} />,
  };

  function renderPage() {
    if (activePage.startsWith("lec") || activePage.startsWith("note"))
      return <TopicPage pageId={activePage} onNavigate={navigate} onQuickQuiz={handleQuickQuiz} />;
    const render = PAGE_MAP[activePage];
    return render ? render() : <HomePage onNavigate={navigate} scoreBook={scoreBook} />;
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
            onClose={null}
          />
        </div>
      )}

      {/* ── Edit profile modal ──────────────────────────────────── */}
      {showEditUsername && session?.user && (
        <div className="auth-overlay" onClick={() => setShowEditUsername(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-hex-logo">IFT<br /><span>211</span></div>
            <h3 className="auth-title">Edit Profile</h3>

            <div className="auth-avatar-preview">
              <Avatar
                avatarId={editAvatarId || profile?.avatar_color}
                name={editUsernameValue || profile?.username || ""}
                size="lg"
              />
            </div>

            <form onSubmit={handleEditUsername} className="auth-form">
              <div className="auth-field">
                <label>Username <span className="auth-field-hint">(3–20 chars, letters/numbers/_)</span></label>
                <input
                  type="text"
                  placeholder={profile?.username || "e.g. jesutobi001"}
                  value={editUsernameValue}
                  onChange={(e) => { setEditUsernameValue(e.target.value); setEditUsernameError(""); }}
                  autoFocus
                  required
                />
              </div>

              <AvatarPicker
                selected={editAvatarId || profile?.avatar_color}
                onSelect={setEditAvatarId}
              />

              {editUsernameError && <p className="auth-error">{editUsernameError}</p>}
              <button type="submit" className="auth-btn primary" disabled={editUsernameLoading}>
                {editUsernameLoading ? "Saving…" : "Save Profile →"}
              </button>
            </form>
            <button className="auth-close" onClick={() => setShowEditUsername(false)} aria-label="Close">✕</button>
          </div>
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
        onEditUsername={() => {
          setEditUsernameValue(profile?.username || "");
          setEditAvatarId(profile?.avatar_color || "");
          setShowEditUsername(true);
        }}
        onSignOut={() => { setSession(null); setProfile(null); navigate("home"); signOut(); }}
      />

      <main className="main-panel">
        <ErrorBoundary key={activePage}>
          {renderPage()}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
