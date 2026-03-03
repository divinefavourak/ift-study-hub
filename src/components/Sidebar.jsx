import { useState } from "react";
import { NAV_ITEMS } from "../data/courseData";
import { signOut, getInitials, BADGE_DEFS } from "../services/supabase";
import { playHover, playClick } from "../services/audio";

function Sidebar({ activePage, onNavigate, progressPct, user, profile, onSignInClick, onSignOut }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleNav(id) {
    playClick();
    onNavigate(id);
    setMobileOpen(false);
  }

  async function handleSignOut() {
    playClick();
    await signOut();
    onSignOut?.();
    setShowUserMenu(false);
  }

  const navContent = (
    <>
      <div className="brand">
        <div className="brand-code">IFT 211</div>
        <h1>DIGITAL LOGIC<br />STUDY HUB</h1>
        
      </div>

      <nav>
        {NAV_ITEMS.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => handleNav(item.id)}
                onMouseEnter={playHover}
              >
                <span className="nav-dot">{item.short}</span>
                <span>{item.title}</span>
              </button>
            ))}
            
            {/* Insert Cheatsheet link in the Practice/Tools section */}
            {group.label === "Practice" && (
              <>
                <button
                  className={`nav-item ${activePage === "cheatsheet" ? "active" : ""}`}
                  onClick={() => handleNav("cheatsheet")}
                  onMouseEnter={playHover}
                >
                  <span className="nav-dot text-lg">📄</span>
                  <span>PDF Cheatsheet</span>
                </button>
                <button
                  className={`nav-item ${activePage === "logic-builder" ? "active" : ""}`}
                  onClick={() => handleNav("logic-builder")}
                  onMouseEnter={playHover}
                >
                  <span className="nav-dot text-lg">⚡</span>
                  <span>Logic Gate Builder</span>
                </button>
                <button
                  className={`nav-item highlight ${activePage === "battle" ? "active" : ""}`}
                  style={{ border: "1px dashed var(--orange)" }}
                  onClick={() => handleNav("battle")}
                  onMouseEnter={playHover}
                >
                  <span className="nav-dot text-lg">⚔️</span>
                  <span style={{ color: "var(--orange)", fontWeight: "bold" }}>Live Arena</span>
                </button>
                <button
                  className={`nav-item highlight ${activePage === "h2h" ? "active" : ""}`}
                  style={{ border: "1px dashed var(--cyan)" }}
                  onClick={() => handleNav("h2h")}
                  onMouseEnter={playHover}
                >
                  <span className="nav-dot text-lg">🏟️</span>
                  <span style={{ color: "var(--cyan)", fontWeight: "bold" }}>H2H Scoreboard</span>
                </button>
              </>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="progress-head">
          <span>PROGRESS</span>
          <span>{progressPct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        {/* ── User section ──────────────────────────────────── */}
        <div className="sidebar-user">
          {user ? (
            <div className="sidebar-user-row" onClick={() => setShowUserMenu((v) => !v)}>
              <div
                className="sidebar-avatar"
                style={{ background: profile?.avatar_color ?? "var(--blue)" }}
              >
                {getInitials(profile?.full_name || profile?.username || user.email)}
              </div>
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">
                  {profile?.username ?? user.email.split("@")[0]}
                </span>
                {profile?.badges && profile.badges.length > 0 ? (
                  <div className="sidebar-user-badges">
                    {profile.badges.map((b) => (
                      <span key={b} title={BADGE_DEFS[b]?.desc || ""}>
                        {BADGE_DEFS[b]?.icon || "🏅"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="sidebar-user-matric">New Student</span>
                )}
              </div>
              <span className="sidebar-user-caret">{showUserMenu ? "▲" : "▼"}</span>
            </div>
          ) : (
            <button className="sidebar-signin-btn" onClick={onSignInClick}>
              🔑 Sign In / Join
            </button>
          )}

          {showUserMenu && user && (
            <div className="sidebar-user-menu">
              <button onClick={() => { handleNav("leaderboard"); setShowUserMenu(false); }}>
                🏆 Leaderboard
              </button>
              <button className="signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────── */}
      <aside className="sidebar">{navContent}</aside>

      {/* ── Mobile top bar ───────────────────────────────────── */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <span className="mobile-brand-code">IFT 211</span>
          <span className="mobile-brand-title">DIGITAL LOGIC</span>
        </div>
        <div className="mobile-header-right">
          {/* Avatar or sign-in on mobile */}
          {user ? (
            <div
              className="sidebar-avatar sm"
              style={{ background: profile?.avatar_color ?? "var(--blue)" }}
              onClick={() => setShowUserMenu((v) => !v)}
            >
              {getInitials(profile?.full_name || profile?.username || user.email)}
            </div>
          ) : (
            <button className="mobile-signin-btn" onClick={onSignInClick}>🔑</button>
          )}
          <button
            className={`hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay & drawer ──────────────────────────── */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        {navContent}
      </aside>
    </>
  );
}

export default Sidebar;
