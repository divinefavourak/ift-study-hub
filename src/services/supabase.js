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

/* ─── Quiz attempt syncing ──────────────────────────────────────── */

export async function syncAttempt(userId, attempt) {
  if (!supabase) return { error: { message: "Supabase not configured." } };
  return supabase.from("quiz_attempts").insert({
    user_id: userId,
    topic_id: attempt.topicId,
    topic_label: attempt.topicLabel,
    score: attempt.score,
    total: attempt.total,
    pct: attempt.pct,
    provider: attempt.provider ?? "openrouter",
  });
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
