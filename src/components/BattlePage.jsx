import { useState, useMemo } from "react";
import { useLobby, useMatch } from "../services/multiplayer";
import { FULL_QUIZ } from "../data/courseData";

const MATCH_LENGTH = 5;

// Deterministic shuffle based on seed string
function seededShuffle(array, seedStr) {
  let m = array.length, t, i;
  let seed = 0;
  for (let j = 0; j < seedStr.length; j++) seed += seedStr.charCodeAt(j);
  
  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const copy = [...array];
  while (m) {
    i = Math.floor(random() * m--);
    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
  }
  return copy;
}

const battleStyles = `
@keyframes battleBounce {
  0%, 100% { transform: translateY(0) scale(1.1); }
  50% { transform: translateY(-20px) scale(1.1); }
}
@keyframes battleShake {
  0%, 100% { transform: translateX(0) scale(0.9); opacity: 0.5; }
  25% { transform: translateX(-10px) rotate(-5deg); opacity: 0.8; }
  75% { transform: translateX(10px) rotate(5deg); opacity: 0.8; }
}
@keyframes battleFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.battle-victory { animation: battleBounce 1.5s infinite; color: var(--green); text-shadow: 0 0 40px var(--green); }
.battle-defeat { animation: battleShake 1s infinite; color: var(--muted); text-shadow: none; filter: grayscale(1); }
.battle-fade { animation: battleFadeIn 0.5s ease-out forwards; }
`;

export default function BattlePage({ user, profile }) {
  const [activeMatchId, setActiveMatchId] = useState(null);
  const [matchQuestions, setMatchQuestions] = useState([]);
  
  // Lobby State
  const { onlineUsers, incomingChallenge, sendChallenge, clearChallenge } = useLobby(user, profile);
  
  // Match State
  const { matchState, opponentInfo, myScore, opScore, updateScore, seed } = useMatch(activeMatchId, user, profile);

  // Derive questions once seed is ready
  useMemo(() => {
    if (seed) {
      const allQuestions = [...FULL_QUIZ];
      const shaken = seededShuffle(allQuestions, seed);
      setMatchQuestions(shaken.slice(0, MATCH_LENGTH));
    }
  }, [seed]);

  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Authentication gate specifically for multiplayer
  if (!user || (!profile && user)) {
    return (
      <section className="page active-page lb-page">
        <div className="lb-header">
           <h2 className="lb-title">⚔️ Arena</h2>
        </div>
        <div className="lb-guest-banner" style={{ marginTop: 20 }}>
          🔒 Real-time battles are only available to signed-in students.
        </div>
      </section>
    );
  }

  // Handle answering
  const handleAnswer = (correct) => {
    const newScore = myScore.score + (correct ? 1 : 0);
    const newProgress = myScore.progress + 1;
    updateScore(newScore, newProgress);
    setCurrentQIndex(newProgress);
  };

  // --- RENDERING VIEWS ---

  // 1. LOBBY VIEW
  if (!activeMatchId) {
    return (
      <section className="page active-page lb-page">
        <style dangerouslySetInnerHTML={{ __html: battleStyles }} />
        <div className="lb-header" style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
          <div className="lb-eyebrow">IFT 211 · MULTIPLAYER</div>
          <h2 className="lb-title">⚔️ Live Arena</h2>
          <p className="lb-sub">Challenge classmates to a real-time logical shootout.</p>
        </div>

        {incomingChallenge && (
          <div className="incoming-challenge" style={{ background: 'var(--blue)', color: '#090b11', padding: '24px', borderRadius: '12px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 0 20px rgba(0,214,255,0.4)', animation: 'battlePulse 2s infinite' }}>
            <div>
              <strong style={{ fontSize: '1.25rem' }}>⚔️ CHALLENGE!</strong>
              <p style={{ margin: 0, opacity: 0.9, fontWeight: 'bold' }}>{incomingChallenge.fromName} wants to battle!</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="action" 
                style={{ background: '#090b11', color: 'white', fontWeight: 'bold' }}
                onClick={() => { setActiveMatchId(incomingChallenge.matchId); clearChallenge(); }}
              >
                Accept
              </button>
              <button 
                className="action outline" 
                style={{ borderColor: 'rgba(9, 11, 17, 0.5)', color: '#090b11' }}
                onClick={clearChallenge}
              >
                Decline
              </button>
            </div>
          </div>
        )}

        <div className="lobby-list" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--muted)', fontWeight: "bold" }}>Online Contenders ({onlineUsers.length})</h3>
          {onlineUsers.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>It's quiet... too quiet. Wait for others to join.</p>
          ) : (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              {onlineUsers.map(u => (
                <div key={u.id} className="interactive-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#111', boxShadow: '0 0 10px rgba(24,217,218,0.5)' }}>
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{u.username}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span> Online
                      </div>
                    </div>
                  </div>
                  <button 
                    className="action small outline"
                    style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)', fontWeight: 'bold' }}
                    onClick={() => {
                      const mId = sendChallenge(u.id);
                      setActiveMatchId(mId);
                    }}
                  >
                    Challenge ⚔️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // 2. WAITING FOR OPPONENT VIEW
  if (matchState === 'waiting') {
    return (
      <section className="page active-page flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="lb-spinner mb-4" style={{'--sz': '50px'}} />
        <h2 className="text-2xl font-bold mb-2">Waiting for connection...</h2>
        <p className="text-gray-400">Waiting for your opponent to accept the challenge.</p>
        <button className="action outline mt-8 text-gray-400 border-gray-600" onClick={() => setActiveMatchId(null)}>
          Cancel Challenge
        </button>
      </section>
    );
  }

  // 3. ABANDONED VIEW
  if (matchState === 'finished_abandoned') {
    return (
      <section className="page active-page flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-4">💨</div>
        <h2 className="text-2xl font-bold mb-2">Opponent Fled!</h2>
        <p className="text-gray-400">They couldn't handle the heat. You win by forfeit!</p>
        <button className="action primary mt-8" onClick={() => setActiveMatchId(null)}>
          Back to Lobby
        </button>
      </section>
    );
  }

  // 4. ACTIVE MATCH / RESULTS VIEW
  const isFinished = currentQIndex >= MATCH_LENGTH;

  return (
    <section className="page active-page" style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px' }}>
      <style dangerouslySetInnerHTML={{ __html: battleStyles }} />
      {/* HUD Tracker */}
      <div className="match-hud" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '32px', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', background: 'rgba(24, 217, 218, 0.05)', filter: 'blur(100px)', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
          
          {/* Player 1 (You) */}
          <div style={{ width: '40%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--cyan)', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                😎 You
              </span>
              <span style={{ fontWeight: '900', fontSize: '1.5rem', color: 'white' }}>{myScore.score} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--muted)' }}>pts</span></span>
            </div>
            <div style={{ width: '100%', background: 'var(--surface)', borderRadius: '999px', height: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ background: 'var(--cyan)', height: '100%', transition: 'all 0.3s', width: `${(myScore.progress / MATCH_LENGTH) * 100}%` }}></div>
            </div>
          </div>

          {/* VS Divider */}
          <div style={{ fontWeight: '900', fontStyle: 'italic', color: 'var(--muted)', fontSize: '1.5rem', padding: '0 16px' }}>VS</div>

          {/* Player 2 (Opponent) */}
          <div style={{ width: '40%', textAlign: 'right' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px', flexDirection: 'row-reverse' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--orange)', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row-reverse' }}>
                😈 {opponentInfo?.username || 'Opponent'}
              </span>
              <span style={{ fontWeight: '900', fontSize: '1.5rem', color: 'white' }}>{opScore.score} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--muted)' }}>pts</span></span>
            </div>
            <div style={{ width: '100%', background: 'var(--surface)', borderRadius: '999px', height: '16px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: 'var(--orange)', height: '100%', transition: 'all 0.3s', width: `${(opScore.progress / MATCH_LENGTH) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Global Progress Text */}
        <div style={{ textAlign: 'center', fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 'bold', position: 'relative', zIndex: 10 }}>
          Race to {MATCH_LENGTH} Questions
        </div>
      </div>

      {/* Match Content */}
      <div className="match-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isFinished ? (
          <div className="results battle-fade" style={{ textAlign: 'center', padding: '48px 0' }}>
            <div className={myScore.score > opScore.score ? 'battle-victory' : myScore.score === opScore.score ? '' : 'battle-defeat'} style={{ fontSize: '6rem', marginBottom: '24px', display: 'inline-block' }}>
              {myScore.score > opScore.score ? '🏆' : myScore.score === opScore.score ? '🤝' : '💀'}
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '8px', letterSpacing: '-1px', color: myScore.score > opScore.score ? 'var(--green)' : myScore.score === opScore.score ? 'var(--muted)' : 'var(--orange)' }}>
              {myScore.score > opScore.score ? 'VICTORY!' : myScore.score === opScore.score ? 'DRAW' : 'DEFEAT'}
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
              {myScore.score > opScore.score ? 'You crushed their logic circuits! Phenomenal performance.' : myScore.score === opScore.score ? 'An even match!' : 'Your timing diagrams were slightly off this time. Analyze & retry!'}
            </p>
            <button className="action" style={{ background: 'var(--cyan)', color: 'black', boxShadow: '0 0 20px rgba(24, 217, 218, 0.4)', padding: '16px 32px', fontSize: '1.25rem' }} onClick={() => setActiveMatchId(null)}>
              Return to Arena
            </button>
          </div>
        ) : (
          <div className="current-question" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', background: 'var(--surface-2)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
             <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--cyan)', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Question {currentQIndex + 1}</div>
             <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500', color: 'var(--text)' }}>{matchQuestions[currentQIndex]?.question}</p>
             <div className="options" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
               {matchQuestions[currentQIndex]?.options.map((opt, i) => (
                 <button 
                  key={i} 
                  className="interactive-card"
                  style={{ textAlign: 'left', padding: '16px', border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text)', width: '100%' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(24, 217, 218, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  onClick={() => handleAnswer(i === matchQuestions[currentQIndex].correct)}
                 >
                   <span style={{ fontWeight: 'bold', color: 'var(--muted)', marginRight: '12px' }}>{["A", "B", "C", "D"][i]}</span> {opt}
                 </button>
               ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
