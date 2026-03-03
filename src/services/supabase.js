/**
 * src/services/supabase.js
 * Supabase client — Google OAuth + username-only profiles.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

/* ─── Google OAuth ──────────────────────────────────────────────── */

/**
 * Redirects the browser to Google sign-in.
 * After returning, Supabase fires onAuthStateChange with the session.
 * redirectTo must be an allowed URL in Supabase Auth → URL Configuration.
 */
export async function signInWithGoogle() {
  if (!supabase) return { error: { message: "Supabase not configured." } };
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
      queryParams: { prompt: "select_account" },
    },
  });
}

export async function signOut() {
  if (!supabase) return;
  return supabase.auth.signOut();
}

export function onAuthChange(callback) {
  if (!supabase) return () => {};
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => callback(session)
  );
  return () => subscription.unsubscribe();
}

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/* ─── Profile helpers ───────────────────────────────────────────── */

export async function getProfile(userId) {
  if (!supabase) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

/**
 * Creates a profile after Google OAuth.
 * Email and full_name come from the Google token; only username is user-supplied.
 */
export async function createProfile(userId, { username, fullName, avatarUrl }) {
  if (!supabase) return { error: { message: "Supabase not configured." } };
  return supabase.from("profiles").insert({
    id: userId,
    username: username.trim().toLowerCase(),
    full_name: fullName || "",
    avatar_color: randomAvatarColor(),
    avatar_url: avatarUrl || null,
  });
}

export const BADGE_DEFS = {
  first_blood:  { id: "first_blood",  icon: "🩸", title: "First Blood",  desc: "Completed your first AI quiz." },
  sharpshooter: { id: "sharpshooter", icon: "🎯", title: "Sharpshooter", desc: "Scored a perfect 100% on a quiz." },
  survivor:     { id: "survivor",     icon: "🛡️", title: "Survivor",     desc: "Passed a quiz with exactly 50%." },
  grinder:      { id: "grinder",      icon: "⚙️", title: "Grinder",      desc: "Completed 5 or more quizzes." },
};

/* ─── Quiz attempt syncing & badges ─────────────────────────────── */

export async function syncAttempt(userId, attempt) {
  if (!supabase) return { error: { message: "Supabase not configured." } };

  // 1. Insert the attempt
  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: userId,
    topic_id: attempt.topicId,
    topic_label: attempt.topicLabel,
    score: attempt.score,
    total: attempt.total,
    pct: attempt.pct,
    provider: attempt.provider ?? "openrouter",
  });
  if (error) return { error };

  // 2. Evaluate Badges (Fire & Forget)
  try {
    const { data: profile } = await supabase.from("profiles").select("badges").eq("id", userId).single();
    if (profile) {
      const currentBadges = profile.badges || [];
      const newBadges = new Set(currentBadges);

      // Rule 1: First Blood (Any quiz completed)
      newBadges.add("first_blood");

      // Rule 2: Sharpshooter (100% score)
      if (attempt.pct === 100) newBadges.add("sharpshooter");

      // Rule 3: Survivor (Exactly 50% score)
      if (attempt.pct === 50) newBadges.add("survivor");

      // Rule 4: Grinder (Need to know total quizzes, but leaderboard view has it, or we can query count)
      const { count } = await supabase.from("quiz_attempts").select("*", { count: "exact", head: true }).eq("user_id", userId);
      if (count && count >= 5) newBadges.add("grinder");

      if (newBadges.size > currentBadges.length) {
        // Update user profile with new badges
        await supabase
          .from("profiles")
          .update({ badges: Array.from(newBadges) })
          .eq("id", userId);
      }
    }
  } catch (e) {
    console.error("Failed to process badges", e);
  }

  return data ?? [];
}

export async function fetchFlashcards(userId) {
  if (!supabase || !userId) return {};
  const { data } = await supabase
    .from("profiles")
    .select("flashcards")
    .eq("id", userId)
    .single();
  return data?.flashcards || {};
}

export async function syncFlashcards(userId, masteryObj) {
  if (!supabase || !userId) return;
  // We'll store it in the JSONB 'flashcards' column on 'profiles'
  await supabase
    .from("profiles")
    .update({ flashcards: masteryObj })
    .eq("id", userId);
}

/* ─── Leaderboard ───────────────────────────────────────────────── */

export async function fetchLeaderboard() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("leaderboard")
    .select("*")
    .order("avg_pct", { ascending: false })
    .order("quiz_count", { ascending: false });
  return data ?? [];
}

export function subscribeLeaderboard(callback) {
  if (!supabase) return () => {};
  const channel = supabase
    .channel("leaderboard-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "quiz_attempts" },
      () => fetchLeaderboard().then(callback)
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}

/* ─── H2H Battle Results ────────────────────────────────────────── */

export async function saveBattleResult(result) {
  if (!supabase) return { error: { message: "Supabase not configured." } };
  const { error } = await supabase.from("battle_results").insert({
    player1_id: result.player1Id,
    player1_name: result.player1Name,
    player1_score: result.player1Score,
    player2_id: result.player2Id,
    player2_name: result.player2Name,
    player2_score: result.player2Score,
    match_length: result.matchLength,
    winner_id: result.winnerId,
  });
  if (error) console.error("Failed to save battle result:", error);
  return { error };
}

export async function fetchH2HLeaderboard() {
  if (!supabase) return [];
  const { data } = await supabase
    .from("battle_results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  return data ?? [];
}

export function subscribeBattleResults(callback) {
  if (!supabase) return () => {};
  const channel = supabase
    .channel("battle-results-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "battle_results" },
      () => fetchH2HLeaderboard().then(callback)
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}

/* ─── Utilities ─────────────────────────────────────────────────── */

const AVATAR_COLORS = [
  "#00d6ff", "#18d9da", "#49d889", "#ff8a3d",
  "#a78bfa", "#f472b6", "#facc15", "#fb923c",
];

function randomAvatarColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
