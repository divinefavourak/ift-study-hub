import { useEffect, useState, useMemo } from "react";
import { fetchUserProgress } from "../services/supabase";

function gradeColor(pct) {
  if (pct >= 80) return "var(--green)";
  if (pct >= 60) return "var(--cyan)";
  if (pct >= 40) return "var(--orange)";
  return "#f87171"; // red
}

export default function ProgressDashboard({ user, onNavigate }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchUserProgress(user.id).then((data) => {
      setAttempts(data);
      setLoading(false);
    });
  }, [user]);

  const stats = useMemo(() => {
    const map = {};
    for (const a of attempts) {
      if (!map[a.topic_id]) {
        map[a.topic_id] = { id: a.topic_id, label: a.topic_label, count: 0, totalPct: 0 };
      }
      map[a.topic_id].count++;
      map[a.topic_id].totalPct += a.pct;
    }
    const arr = Object.values(map).map(t => ({
      ...t,
      avg: Math.round(t.totalPct / t.count)
    }));
    return arr.sort((a, b) => a.avg - b.avg); // Weakest first
  }, [attempts]);

  if (!user) {
    return (
      <section className="page active-page lb-page">
        <div className="lb-header">
           <h2 className="lb-title">📊 My Progress</h2>
        </div>
        <div className="lb-guest-banner" style={{ marginTop: 20 }}>
          🔒 Sign in to track your progress and highlight weak areas.
        </div>
      </section>
    );
  }

  return (
    <section className="page active-page lb-page">
      <div className="lb-header">
        <div className="lb-header-left">
          <div className="lb-eyebrow">IFT 211 · PERSONAL ANALYTICS</div>
          <h2 className="lb-title">📊 My Weaknesses</h2>
          <p className="lb-sub">
            Your average scores separated by topic. Topics needing the most review are listed first.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="lb-loading" style={{ marginTop: 40 }}>
          <div className="lb-spinner" />
          Analyzing performance...
        </div>
      ) : stats.length === 0 ? (
        <div className="lb-empty" style={{ marginTop: 40 }}>
          No quiz attempts found. Take an AI Quiz to generate your progress report! 🚀
        </div>
      ) : (
        <div className="progress-grid" style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", marginTop: "24px" }}>
          {stats.map(s => {
            const isWeak = s.avg < 70;
            return (
              <div key={s.id} className="interactive-card" style={{ 
                border: isWeak ? "1px solid rgba(248, 113, 113, 0.3)" : "1px solid var(--border)",
                display: "flex", flexDirection: "column"
              }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "16px", lineHeight: 1.3 }}>{s.label || s.id}</h3>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                  <span style={{ color: "var(--muted)" }}>Average Score</span>
                  <span style={{ fontWeight: "bold", fontSize: "1.4rem", color: gradeColor(s.avg) }}>
                    {s.avg}%
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: "0.9rem", marginBottom: isWeak ? "20px" : "0" }}>
                  <span>Quizzes Taken</span>
                  <span>{s.count}</span>
                </div>

                {isWeak && (
                  <button 
                    className="action outline small" 
                    style={{ marginTop: "auto", width: "100%", borderColor: "var(--orange)", color: "var(--orange)" }}
                    onClick={() => onNavigate(s.id)}
                  >
                    📖 Review Material
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
