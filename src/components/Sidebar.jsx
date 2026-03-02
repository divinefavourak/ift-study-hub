import { NAV_ITEMS } from "../data/courseData";

function Sidebar({ activePage, onNavigate, progressPct }) {
  return (
    <aside className="sidebar">
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
                onClick={() => onNavigate(item.id)}
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
    </aside>
  );
}

export default Sidebar;

