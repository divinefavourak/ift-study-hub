import { useState, useEffect, useRef } from "react";
import { useLobby, useMatch } from "../services/multiplayer";
import { generateQuiz } from "../services/aiQuiz";
import { saveBattleResult } from "../services/supabase";
import { SECTION_QUIZZES } from "../data/courseData";

const MATCH_LENGTH = 5;

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
@keyframes battleSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes battlePulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0,214,255,0.4); }
  50% { box-shadow: 0 0 40px rgba(0,214,255,0.8); }
}
@keyframes inBattlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.battle-victory { animation: battleBounce 1.5s infinite; color: var(--green); text-shadow: 0 0 40px var(--green); }
.battle-defeat { animation: battleShake 1s infinite; color: var(--muted); text-shadow: none; filter: grayscale(1); }
.battle-fade { animation: battleFadeIn 0.5s ease-out forwards; }
.battle-spinner { width: 40px; height: 40px; border: 4px solid var(--border); border-top-color: var(--cyan); border-radius: 50%; animation: battleSpin 0.8s linear infinite; margin: 0 auto 16px; }
`;

// Random topic for variety
const BATTLE_TOPICS = ["lec1", "lec2", "lec3", "lec4", "lec5", "lec6", "note1", "note2", "note3"];

/** Pick `count` random local questions for a topic (fallback when AI is slow).
 *  If the topic pool is smaller than count, supplements from all other sections. */
function getLocalFallback(topicId, count) {
  const topicPool = SECTION_QUIZZES[topicId]?.questions ?? [];

  if (topicPool.length >= count) {
    return [...topicPool].sort(() => Math.random() - 0.5).slice(0, count);
  }

  // Not enough in this topic — pool from ALL sections
  const allQuestions = Object.values(SECTION_QUIZZES).flatMap((s) => s.questions);
  return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function BattlePage({ user, profile }) {
  const [activeMatchId, setActiveMatchId] = useState(null);
  
  // Lobby State
  const { onlineUsers, incomingChallenge, sendChallenge, clearChallenge, setEngagedStatus } = useLobby(user, profile);
  
  // Match State
  const { matchState, opponentInfo, myScore, opScore, updateScore, isHost, questions, broadcastQuestions } = useMatch(activeMatchId, user, profile);

  const [usingFallback, setUsingFallback] = useState(false);

  // When matchState becomes 'generating' and we're the host, generate AI questions
  // Falls back to local questions if AI takes more than 6 seconds
  useEffect(() => {
    if (matchState === 'generating' && isHost) {
      const topic = BATTLE_TOPICS[Math.floor(Math.random() * BATTLE_TOPICS.length)];

      const timeout = new Promise((resolve) =>
        setTimeout(() => resolve({ questions: null, timedOut: true }), 6000)
      );
      const aiGen = generateQuiz(topic, MATCH_LENGTH)
        .then((qs) => ({ questions: qs, timedOut: false }))
        .catch(() => ({ questions: null, timedOut: true }));

      Promise.race([aiGen, timeout]).then(({ questions: qs, timedOut }) => {
        if (qs && qs.length > 0) {
          broadcastQuestions(qs);
        } else {
          // AI was too slow or failed — use local curated questions
          console.warn('AI generation timed out or failed. Using local fallback questions.');
          setUsingFallback(true);
          broadcastQuestions(getLocalFallback(topic, MATCH_LENGTH));
        }
      });
    }
  }, [matchState, isHost]);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const savedRef = useRef(false);

  // Save battle result when match finishes (host only, once)
  // Must be here — before any conditional returns — to satisfy Rules of Hooks
  useEffect(() => {
    const isFinished = currentQIndex >= MATCH_LENGTH;
    console.log('[Battle Save]', { isFinished, isHost, saved: savedRef.current, hasOpponent: !!opponentInfo, hasUser: !!user, hasProfile: !!profile });
    if (isFinished && isHost && !savedRef.current && opponentInfo && user && profile) {
      savedRef.current = true;
      const winnerId = myScore.score > opScore.score ? user.id
        : opScore.score > myScore.score ? opponentInfo.id
        : null; // draw
      console.log('[Battle Save] Saving result to Supabase...', { winnerId, myScore: myScore.score, opScore: opScore.score });
      saveBattleResult({
        player1Id: user.id,
        player1Name: profile.username,
        player1Score: myScore.score,
        player2Id: opponentInfo.id,
        player2Name: opponentInfo.username,
        player2Score: opScore.score,
        matchLength: MATCH_LENGTH,
        winnerId,
      });
    }
  }, [currentQIndex, isHost, opponentInfo]);

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
                onClick={() => { setActiveMatchId(incomingChallenge.matchId); clearChallenge(); setEngagedStatus('in_battle'); }}
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
                      {u.status === 'in_battle' ? (
                        <div style={{ fontSize: '0.75rem', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', animation: 'inBattlePulse 1.2s ease-in-out infinite' }}></span> ⚔️ In Battle
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.75rem', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }}></span> Online
                        </div>
                      )}
                    </div>
                  </div>
                  {u.status === 'in_battle' ? (
                    <button
                      className="action small outline"
                      disabled
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)', fontWeight: 'bold', cursor: 'not-allowed', opacity: 0.5 }}
                    >
                      In Battle
                    </button>
                  ) : (
                    <button 
                      className="action small outline"
                      style={{ borderColor: 'var(--cyan)', color: 'var(--cyan)', fontWeight: 'bold' }}
                      onClick={() => {
                        const mId = sendChallenge(u.id);
                        setActiveMatchId(mId);
                        setEngagedStatus('in_battle');
                      }}
                    >
                      Challenge ⚔️
                    </button>
                  )}
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
      <section className="page active-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <style dangerouslySetInnerHTML={{ __html: battleStyles }} />
        <div className="battle-spinner" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Waiting for connection...</h2>
        <p style={{ color: 'var(--muted)' }}>Waiting for your opponent to accept the challenge.</p>
        <button className="action outline" style={{ marginTop: '32px', color: 'var(--muted)', borderColor: 'var(--border)' }} onClick={() => { setActiveMatchId(null); setEngagedStatus('online'); }}>
          Cancel Challenge
        </button>
      </section>
    );
  }

  // 2b. GENERATING AI QUESTIONS VIEW
  if (matchState === 'generating') {
    return (
      <section className="page active-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <style dangerouslySetInnerHTML={{ __html: battleStyles }} />
        <div className="battle-spinner" />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--cyan)' }}>
          ✨ {isHost ? 'Generating AI Questions...' : 'Opponent is generating questions...'}
        </h2>
        <p style={{ color: 'var(--muted)' }}>Gemini is crafting {MATCH_LENGTH} unique questions for this battle.</p>
        {isHost && <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'var(--mono)' }}>⏱ Falling back to local questions if AI takes {'>'} 6s</p>}
      </section>
    );
  }

  // 3. ABANDONED VIEW
  if (matchState === 'finished_abandoned') {
    return (
      <section className="page active-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <style dangerouslySetInnerHTML={{ __html: battleStyles }} />
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>💨</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Opponent Fled!</h2>
        <p style={{ color: 'var(--muted)' }}>They couldn't handle the heat. You win by forfeit!</p>
        <button className="action" style={{ marginTop: '32px', background: 'var(--cyan)', color: 'black' }} onClick={() => { setActiveMatchId(null); setEngagedStatus('online'); }}>
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
            <button className="action" style={{ background: 'var(--cyan)', color: 'black', boxShadow: '0 0 20px rgba(24, 217, 218, 0.4)', padding: '16px 32px', fontSize: '1.25rem' }} onClick={() => { setActiveMatchId(null); setEngagedStatus('online'); }}>
              Return to Arena
            </button>
          </div>
        ) : questions[currentQIndex] ? (
          <div className="current-question" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', background: 'var(--surface-2)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
             <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--cyan)', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Question {currentQIndex + 1}</div>
             <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500', color: 'var(--text)' }}>{questions[currentQIndex].question}</p>
             <div className="options" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
               {questions[currentQIndex].options.map((opt, i) => (
                 <button 
                  key={i} 
                  className="interactive-card"
                  style={{ textAlign: 'left', padding: '16px', border: '1px solid var(--border)', background: 'var(--surface)', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text)', width: '100%' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.background = 'rgba(24, 217, 218, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; }}
                  onClick={() => handleAnswer(i === questions[currentQIndex].correct)}
                 >
                   <span style={{ fontWeight: 'bold', color: 'var(--muted)', marginRight: '12px' }}>{["A", "B", "C", "D"][i]}</span> {opt}
                 </button>
               ))}
             </div>
          </div>
        ) : (
          // Defensive: question data hasn't arrived yet
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px' }}>
            <div className="battle-spinner" style={{ margin: '0 auto 16px' }} />
            Waiting for question…
          </div>
        )}
      </div>
    </section>
  );
}
