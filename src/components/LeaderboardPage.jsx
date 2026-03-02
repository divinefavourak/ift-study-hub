import { useEffect, useState, useCallback } from "react";
import { fetchLeaderboard, subscribeLeaderboard, getInitials, BADGE_DEFS } from "../services/supabase";

const TROPHY = ["🥇", "🥈", "🥉"];

function medalClass(rank) {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  return "";
}

function gradeColor(pct) {
  if (pct == null) return "var(--muted)";
  if (pct >= 80) return "var(--green)";
  if (pct >= 60) return "var(--cyan)";
  if (pct >= 40) return "var(--orange)";
  return "#f87171";
}

export default function LeaderboardPage({ user, profile }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("avg"); // "avg" | "count" | "best"

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchLeaderboard();
    setRows(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeLeaderboard(setRows);
    return unsub;
  }, [load]);

  const sorted = [...rows].sort((a, b) => {
    if (filter === "avg")   return (b.avg_pct ?? 0)   - (a.avg_pct ?? 0);
    if (filter === "best")  return (b.best_pct ?? 0)  - (a.best_pct ?? 0);
    if (filter === "count") return (b.quiz_count ?? 0) - (a.quiz_count ?? 0);
    return 0;
  });

  const myRank = sorted.findIndex((r) => r.id === user?.id) + 1;

  return (
    <section className="page active-page lb-page">

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="lb-header">
        <div className="lb-header-left">
          <div className="lb-eyebrow">IFT 211 · CSC · COMPETITIVE MODE</div>
          <h2 className="lb-title">🏆 Class Leaderboard</h2>
          <p className="lb-sub">
            Real-time rankings updated after every quiz attempt.
            {user && myRank > 0 && (
              <span className="lb-my-rank"> Your rank: <strong>#{myRank}</strong></span>
            )}
          </p>
        </div>
        <div className="lb-live-dot">
          <span className="lb-live-pulse" />
          LIVE
        </div>
      </div>

      {/* ── Filter tabs ─────────────────────────────────────── */}
      <div className="lb-filters">
        {[
          { key: "avg",   label: "Avg Score" },
          { key: "best",  label: "Best Score" },
          { key: "count", label: "Most Quizzes" },
        ].map((f) => (
          <button
            key={f.key}
            className={`lb-filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Top 3 podium ────────────────────────────────────── */}
      {!loading && sorted.length >= 3 && (
        <div className="lb-podium">
          {[sorted[1], sorted[0], sorted[2]].map((row, i) => {
            const podiumRank = i === 0 ? 2 : i === 1 ? 1 : 3;
            const isMe = row?.id === user?.id;
            return row ? (
              <div key={row.id} className={`lb-podium-card rank-${podiumRank} ${isMe ? "is-me" : ""}`}>
                <div className="lb-avatar" style={{ background: row.avatar_color }}>
                  {getInitials(row.full_name || row.username)}
                </div>
                <div className="lb-podium-trophy">{TROPHY[podiumRank - 1]}</div>
                <div className="lb-podium-name">{row.username}</div>
                <div className="lb-podium-pct" style={{ color: gradeColor(row.avg_pct) }}>
                  {row.avg_pct ?? "—"}%
                </div>
                <div className="lb-podium-sub">{row.quiz_count} quiz{row.quiz_count !== 1 ? "zes" : ""}</div>
                
                {row.badges && row.badges.length > 0 && (
                  <div className="lb-podium-badges">
                    {row.badges.map((b) => (
                      <span key={b} title={BADGE_DEFS[b]?.desc || ""}>
                        {BADGE_DEFS[b]?.icon || "🏅"}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : null;
          })}
        </div>
      )}

      {/* ── Not signed in banner ────────────────────────────── */}
      {!user && (
        <div className="lb-guest-banner">
          🔒 Sign in to appear on the leaderboard. Guest scores are local only.
        </div>
      )}

      {/* ── Full table ──────────────────────────────────────── */}
      <div className="lb-table-wrap">
        {loading ? (
          <div className="lb-loading">
            <div className="lb-spinner" />
            Loading rankings…
          </div>
        ) : sorted.length === 0 ? (
          <div className="lb-empty">
            No scores yet — be the first to complete a quiz! 🚀
          </div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Badges</th>
                <th>Quizzes</th>
                <th>Avg %</th>
                <th>Best %</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, idx) => {
                const rank = idx + 1;
                const isMe = row.id === user?.id;
                return (
                  <tr key={row.id} className={`lb-row ${isMe ? "lb-row-me" : ""} ${medalClass(rank)}`}>
                    <td className="lb-rank-cell">
                      {rank <= 3 ? TROPHY[rank - 1] : <span className="lb-rank-num">#{rank}</span>}
                    </td>
                    <td className="lb-player-cell">
                      <div className="lb-avatar sm" style={{ background: row.avatar_color }}>
                        {getInitials(row.full_name || row.username)}
                      </div>
                      <div>
                        <div className="lb-username">
                          {row.username}
                          {isMe && <span className="lb-me-badge">you</span>}
                        </div>
                        <div className="lb-fullname">{row.full_name}</div>
                      </div>
                    </td>
                    <td className="lb-center">
                      {row.badges && row.badges.length > 0 ? (
                        <div className="lb-table-badges">
                          {row.badges.map((b) => (
                            <span key={b} title={BADGE_DEFS[b]?.desc || ""}>
                              {BADGE_DEFS[b]?.icon || "🏅"}
                            </span>
                          ))}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="lb-center">{row.quiz_count}</td>
                    <td className="lb-center">
                      <span className="lb-pct" style={{ color: gradeColor(row.avg_pct) }}>
                        {row.avg_pct != null ? `${row.avg_pct}%` : "—"}
                      </span>
                    </td>
                    <td className="lb-center">
                      <span className="lb-pct" style={{ color: gradeColor(row.best_pct) }}>
                        {row.best_pct != null ? `${row.best_pct}%` : "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </section>
  );
}
