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
        <div className="lb-header pb-6 border-b border-gray-700">
          <div className="lb-eyebrow">IFT 211 · MULTIPLAYER</div>
          <h2 className="lb-title">⚔️ Live Arena</h2>
          <p className="lb-sub">Challenge classmates to a real-time logical shootout.</p>
        </div>

        {incomingChallenge && (
          <div className="incoming-challenge animate-pulse" style={{ background: 'var(--blue)', color: 'white', padding: '20px', borderRadius: '12px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.2rem' }}>⚔️ CHALLENGE!</strong>
              <p style={{ margin: 0, opacity: 0.9 }}>{incomingChallenge.fromName} wants to battle!</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="action" 
                style={{ background: 'white', color: 'black' }}
                onClick={() => { setActiveMatchId(incomingChallenge.matchId); clearChallenge(); }}
              >
                Accept
              </button>
              <button 
                className="action outline" 
                style={{ borderColor: 'white', color: 'white' }}
                onClick={clearChallenge}
              >
                Decline
              </button>
            </div>
          </div>
        )}

        <div className="lobby-list mt-8">
          <h3 className="text-xl mb-4 text-gray-300">Online Contenders ({onlineUsers.length})</h3>
          {onlineUsers.length === 0 ? (
            <p className="text-gray-500 italic">It's quiet... too quiet. Wait for others to join.</p>
          ) : (
             <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {onlineUsers.map(u => (
                <div key={u.id} className="interactive-card flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]">
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-100">{u.username}</div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                      </div>
                    </div>
                  </div>
                  <button 
                    className="action small outline hover:bg-cyan-900 border-cyan-700 text-cyan-400 font-bold"
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
    <section className="page active-page flex flex-col pt-4">
      
      {/* HUD Tracker */}
      <div className="match-hud bg-gray-900 border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-cyan-900/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          
          {/* Player 1 (You) */}
          <div className="w-5/12">
            <div className="flex justify-between items-end mb-2">
              <span className="font-bold text-cyan-400 text-lg flex items-center gap-2">
                😎 You
              </span>
              <span className="font-black text-2xl text-white">{myScore.score} <span className="text-sm font-normal text-gray-500">pts</span></span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full transition-all duration-300" style={{ width: `${(myScore.progress / MATCH_LENGTH) * 100}%` }}></div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="font-black italic text-gray-600 text-2xl px-4 mt-4">VS</div>

          {/* Player 2 (Opponent) */}
          <div className="w-5/12 text-right">
             <div className="flex justify-between items-end mb-2 flex-row-reverse">
              <span className="font-bold text-orange-400 text-lg flex items-center gap-2 flex-row-reverse">
                😈 {opponentInfo?.username || 'Opponent'}
              </span>
              <span className="font-black text-2xl text-white">{opScore.score} <span className="text-sm font-normal text-gray-500">pts</span></span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700 flex justify-end">
              <div className="bg-gradient-to-l from-orange-600 to-orange-400 h-full transition-all duration-300" style={{ width: `${(opScore.progress / MATCH_LENGTH) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Global Progress Text */}
        <div className="text-center text-xs tracking-widest text-gray-500 uppercase font-bold relative z-10">
          Race to {MATCH_LENGTH} Questions
        </div>
      </div>

      {/* Match Content */}
      <div className="match-content flex-1 flex flex-col items-center">
        {isFinished ? (
          <div className="results text-center py-12 animate-fade-in">
            <div className="text-8xl mb-6 shadow-glow inline-block">
              {myScore.score > opScore.score ? '🏆' : myScore.score === opScore.score ? '🤝' : '💀'}
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tight">
              {myScore.score > opScore.score ? 'VICTORY' : myScore.score === opScore.score ? 'DRAW' : 'DEFEAT'}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {myScore.score > opScore.score ? 'You crushed their logic circuits!' : 'Your timing diagrams were slightly off this time. Analyze & retry!'}
            </p>
            <button className="action primary shadow-[0_0_20px_var(--blue)] px-8 py-3 text-lg" onClick={() => setActiveMatchId(null)}>
              Return to Arena
            </button>
          </div>
        ) : (
          <div className="current-question w-full max-w-2xl text-left bg-gray-800 p-8 rounded-2xl border border-gray-700 relative overflow-hidden">
             <div className="text-xs font-bold text-cyan-500 mb-4 tracking-widest uppercase">Question {currentQIndex + 1}</div>
             <p className="text-xl leading-relaxed mb-6 font-medium text-gray-100">{matchQuestions[currentQIndex]?.question}</p>
             <div className="options grid grid-cols-1 gap-3">
               {matchQuestions[currentQIndex]?.options.map((opt, i) => (
                 <button 
                  key={i} 
                  className="interactive-card text-left p-4 hover:bg-cyan-900/30 hover:border-cyan-500 transition-colors border border-gray-700 bg-gray-900 rounded-xl"
                  onClick={() => handleAnswer(i === matchQuestions[currentQIndex].correct)}
                 >
                   <span className="font-bold text-gray-500 mr-3">{["A", "B", "C", "D"][i]}</span> {opt}
                 </button>
               ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
