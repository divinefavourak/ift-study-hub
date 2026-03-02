import { useState, useEffect } from "react";
import { supabase } from "./supabase";

/**
 * Hook for the main matchmaking lobby
 * Tracks who is online and handles incoming challenges.
 */
export function useLobby(user, profile) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [incomingChallenge, setIncomingChallenge] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!user || !profile) return;

    const lobbyChannel = supabase.channel('global-lobby', {
      config: { presence: { key: user.id } }
    });

    lobbyChannel
      .on('presence', { event: 'sync' }, () => {
        const state = lobbyChannel.presenceState();
        const users = [];
        for (const id in state) {
          if (id !== user.id) {
            users.push({ id, ...state[id][0] }); // Grab the first presence instance
          }
        }
        setOnlineUsers(users);
      })
      .on('broadcast', { event: 'challenge' }, ({ payload }) => {
        if (payload.targetId === user.id) {
          setIncomingChallenge({
            fromId: payload.fromId,
            fromName: payload.fromName,
            matchId: payload.matchId
          });
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track presence
          await lobbyChannel.track({
            username: profile.username || 'Anonymous',
            status: 'online',
          });
        }
      });

    setChannel(lobbyChannel);

    return () => {
      supabase.removeChannel(lobbyChannel);
    };
  }, [user, profile]);

  const sendChallenge = (targetId) => {
    if (!channel) return;
    const matchId = `match_${user.id}_${Date.now()}`;
    channel.send({
      type: 'broadcast',
      event: 'challenge',
      payload: { targetId, fromId: user.id, fromName: profile.username, matchId }
    });
    return matchId;
  };

  const clearChallenge = () => setIncomingChallenge(null);

  return { onlineUsers, incomingChallenge, sendChallenge, clearChallenge };
}

/**
 * Hook for an active 1v1 match
 * Syncs scores, progress, and match state.
 */
export function useMatch(matchId, user, profile) {
  const [matchState, setMatchState] = useState('waiting'); // waiting, generating, playing, finished
  const [opponentInfo, setOpponentInfo] = useState(null);
  const [myScore, setMyScore] = useState({ score: 0, progress: 0 });
  const [opScore, setOpScore] = useState({ score: 0, progress: 0 });
  const [channel, setChannel] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    if (!matchId || !user) return;

    // The host is the one whose ID is in the matchId (they created it)
    setIsHost(matchId.includes(user.id));

    const matchChannel = supabase.channel(`match-${matchId}`, {
      config: { presence: { key: user.id } }
    });

    matchChannel
      .on('presence', { event: 'sync' }, () => {
        const state = matchChannel.presenceState();
        const players = Object.keys(state);
        
        const opId = players.find(id => id !== user.id);
        if (opId) {
          setOpponentInfo({ id: opId, ...state[opId][0] });
          // Both connected → move to 'generating' state (host will generate questions)
          if (players.length >= 2 && matchState === 'waiting') {
             setMatchState('generating');
          }
        } else {
          if (matchState === 'playing' || matchState === 'generating') {
            setMatchState('finished_abandoned');
          }
        }
      })
      .on('broadcast', { event: 'score_update' }, ({ payload }) => {
        if (payload.userId !== user.id) {
          setOpScore({ score: payload.score, progress: payload.progress });
        }
      })
      .on('broadcast', { event: 'match_questions' }, ({ payload }) => {
        // Both players receive this, set the questions and start playing
        setQuestions(payload.questions);
        setMatchState('playing');
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await matchChannel.track({
            username: profile.username || 'Anonymous'
          });
        }
      });

    setChannel(matchChannel);

    return () => {
      supabase.removeChannel(matchChannel);
    };
  }, [matchId, user, profile, matchState]);

  // Host broadcasts the generated questions to both players
  const broadcastQuestions = (qs) => {
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'match_questions',
        payload: { questions: qs }
      });
    }
    // Also set locally for the host
    setQuestions(qs);
    setMatchState('playing');
  };

  const updateScore = (score, progress) => {
    setMyScore({ score, progress });
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'score_update',
        payload: { userId: user.id, score, progress }
      });
    }
  };

  return { matchState, opponentInfo, myScore, opScore, updateScore, isHost, questions, broadcastQuestions };
}
