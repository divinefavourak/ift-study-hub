import { useState } from "react";
import { NAV_ITEMS } from "../data/courseData";

function Sidebar({ activePage, onNavigate, progressPct }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(id) {
    onNavigate(id);
    setMobileOpen(false); // close drawer on mobile after picking
  }

  const navContent = (
    <>
      <div className="brand">
        <div className="brand-code">IFT 211</div>
        <h1>
          DIGITAL LOGIC
          <br />
          STUDY HUB
        </h1>
        <p>React + Vite course companion</p>
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
              >
                <span className="nav-dot">{item.short}</span>
                <span>{item.title}</span>
              </button>
            ))}
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
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────── */}
      <aside className="sidebar">{navContent}</aside>

      {/* ── Mobile top bar ────────────────────────────────── */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <span className="mobile-brand-code">IFT 211</span>
          <span className="mobile-brand-title">DIGITAL LOGIC</span>
        </div>
        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ── Mobile drawer overlay ─────────────────────────── */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        {navContent}
      </aside>
    </>
  );
}

export default Sidebar;
