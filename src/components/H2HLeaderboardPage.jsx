import { useEffect, useState, useCallback } from "react";
import { fetchH2HLeaderboard, subscribeBattleResults, getInitials } from "../services/supabase";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function buildPlayerStats(matches) {
  const stats = {};
  matches.forEach((m) => {
    [
      { id: m.player1_id, name: m.player1_name, score: m.player1_score, opScore: m.player2_score },
      { id: m.player2_id, name: m.player2_name, score: m.player2_score, opScore: m.player1_score },
    ].forEach(({ id, name, score, opScore }) => {
      if (!id) return;
      if (!stats[id]) stats[id] = { id, name, wins: 0, losses: 0, draws: 0, played: 0, points: 0, scored: 0, conceded: 0, form: [] };
      stats[id].played++;
      stats[id].scored += score;
      stats[id].conceded += opScore;
      if (score > opScore) {
        stats[id].wins++;
        stats[id].points += 3;
        stats[id].form.push("W");
      } else if (score < opScore) {
        stats[id].losses++;
        stats[id].form.push("L");
      } else {
        stats[id].draws++;
        stats[id].points += 1;
        stats[id].form.push("D");
      }
    });
  });
  // Keep only last 5 form entries and sort by points desc, then goal difference
  return Object.values(stats)
    .map((s) => ({ ...s, form: s.form.slice(0, 5) }))
    .sort((a, b) => b.points - a.points || (b.scored - b.conceded) - (a.scored - a.conceded));
}

export default function H2HLeaderboardPage({ user }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchH2HLeaderboard();
    setMatches(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const unsub = subscribeBattleResults(setMatches);
    return unsub;
  }, [load]);

  const playerStats = buildPlayerStats(matches);

  return (
    <section className="page active-page lb-page h2h-page">
      {/* ── Header ───────────────────────────────────────── */}
      <div className="lb-header">
        <div className="lb-header-left">
          <div className="lb-eyebrow">IFT 211 · HEAD TO HEAD · ARENA RECORDS</div>
          <h2 className="lb-title">⚔️ H2H Scoreboard</h2>
          <p className="lb-sub">
            Every battle ever fought — football-style match results updated live.
          </p>
        </div>
        <div className="lb-live-dot">
          <span className="lb-live-pulse" />
          LIVE
        </div>
      </div>

      {/* ── Player Standing Cards ────────────────────────── */}
      {!loading && playerStats.length > 0 && (
        <>
          <div className="h2h-section-label">🏟️ PLAYER STANDINGS</div>
          <div className="h2h-standings">
            {playerStats.map((p, idx) => {
              const isMe = p.id === user?.id;
              return (
                <div key={p.id} className={`h2h-standing-card ${isMe ? "h2h-me" : ""}`}>
                  <div className="h2h-standing-rank">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                  </div>
                  <div className="h2h-standing-avatar" style={{ background: isMe ? "var(--cyan)" : "var(--orange)" }}>
                    {getInitials(p.name)}
                  </div>
                  <div className="h2h-standing-info">
                    <div className="h2h-standing-name">
                      {p.name}
                      {isMe && <span className="lb-me-badge">you</span>}
                    </div>
                    <div className="h2h-standing-record">
                      <span className="h2h-w">{p.wins}W</span>
                      <span className="h2h-d">{p.draws}D</span>
                      <span className="h2h-l">{p.losses}L</span>
                    </div>
                  </div>
                  <div className="h2h-standing-right">
                    <div className="h2h-standing-pts" title="League points (W=3, D=1, L=0)">
                      {p.points} <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>PTS</span>
                    </div>
                    <div className="h2h-standing-gd" title="Goal difference (scored − conceded)">
                      {p.scored - p.conceded >= 0 ? "+" : ""}{p.scored - p.conceded}
                    </div>
                    <div className="h2h-form-guide">
                      {p.form.map((f, i) => (
                        <span key={i} className={`h2h-form-badge h2h-form-${f}`}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ── Recent Matches ───────────────────────────────── */}
      <div className="h2h-section-label" style={{ marginTop: 32 }}>📋 RECENT MATCHES</div>

      {loading ? (
        <div className="lb-loading">
          <div className="lb-spinner" />
          Loading match history…
        </div>
      ) : matches.length === 0 ? (
        <div className="h2h-empty">
          <div className="h2h-empty-icon">🏟️</div>
          <h3>No Matches Yet</h3>
          <p>Head to the <strong>Live Arena</strong> and battle a classmate — results will appear here!</p>
        </div>
      ) : (
        <div className="h2h-match-list">
          {matches.map((m) => {
            const p1Won = m.winner_id === m.player1_id;
            const p2Won = m.winner_id === m.player2_id;
            const isDraw = !m.winner_id;
            return (
              <div key={m.id} className="h2h-match-card">
                {/* Left player */}
                <div className={`h2h-player h2h-player-left ${p1Won ? "h2h-winner" : !isDraw ? "h2h-loser" : ""}`}>
                  <div className="h2h-player-avatar" style={{ background: m.player1_id === user?.id ? "var(--cyan)" : "var(--blue)" }}>
                    {getInitials(m.player1_name)}
                  </div>
                  <div className="h2h-player-name">{m.player1_name}</div>
                  {p1Won && <div className="h2h-crown">👑</div>}
                </div>

                {/* Scoreboard center */}
                <div className="h2h-scoreboard">
                  <span className={`h2h-score h2h-score-left ${p1Won ? "h2h-score-win" : ""}`}>{m.player1_score}</span>
                  <span className="h2h-vs">VS</span>
                  <span className={`h2h-score h2h-score-right ${p2Won ? "h2h-score-win" : ""}`}>{m.player2_score}</span>
                </div>

                {/* Right player */}
                <div className={`h2h-player h2h-player-right ${p2Won ? "h2h-winner" : !isDraw ? "h2h-loser" : ""}`}>
                  {p2Won && <div className="h2h-crown">👑</div>}
                  <div className="h2h-player-name">{m.player2_name}</div>
                  <div className="h2h-player-avatar" style={{ background: m.player2_id === user?.id ? "var(--cyan)" : "var(--orange)" }}>
                    {getInitials(m.player2_name)}
                  </div>
                </div>

                {/* Match meta */}
                <div className="h2h-match-meta">
                  <span>Best of {m.match_length}</span>
                  <span>{isDraw ? "DRAW" : p1Won ? `${m.player1_name} wins` : `${m.player2_name} wins`}</span>
                  <span>{timeAgo(m.created_at)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
