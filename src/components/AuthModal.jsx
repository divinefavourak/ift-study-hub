import { useState } from "react";
import { signInWithGoogle, createProfile } from "../services/supabase";
import AvatarPicker from "./AvatarPicker";
import Avatar from "./Avatar";
import { PRESET_AVATARS } from "../data/avatars";

/**
 * AuthModal — two states:
 *  1. "signin"  → Google sign-in button (email + name auto-collected)
 *  2. "username" → shown after OAuth returns if profile doesn't exist yet
 */
export default function AuthModal({ onClose, needUsername, user, onUsernameSet }) {
  // If needUsername=true, go straight to the username step
  const [step, setStep] = useState(needUsername ? "username" : "signin");
  const [username, setUsername] = useState("");
  const [avatarId, setAvatarId] = useState(PRESET_AVATARS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    const { error: err } = await signInWithGoogle();
    // If err occurs the redirect didn't happen
    if (err) {
      setError(err.message);
      setLoading(false);
    }
    // Otherwise the page redirects — modal will close naturally
  }

  async function handleSetUsername(e) {
    e.preventDefault();
    setError("");
    const uname = username.trim().toLowerCase();
    if (!uname.match(/^[a-z0-9_]{3,20}$/)) {
      setError("3–20 characters, letters/numbers/underscores only.");
      return;
    }
    setLoading(true);
    const fullName =
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email?.split("@")[0] ||
      "";
    const avatarUrl = user?.user_metadata?.avatar_url || null;
    const { error: err } = await createProfile(user.id, { username: uname, fullName, avatarUrl, avatarId });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onUsernameSet?.();
  }

  /* ── Sign-in step ──────────────────────────────────────────────── */
  if (step === "signin") {
    return (
      <div className="auth-overlay" onClick={onClose}>
        <div className="auth-modal signin-modal" onClick={(e) => e.stopPropagation()}>
          <div className="auth-hex-logo">IFT<br /><span>211</span></div>
          <h3 className="auth-title">Join the Study Hub</h3>
          <p className="auth-muted">
            Sign in to sync your quiz scores and compete on the class leaderboard.
          </p>

          {error && <p className="auth-error">{error}</p>}

          <button
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.7 2.4 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.9 6.1C12.8 13 18 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.5c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.1z"/>
              <path fill="#FBBC05" d="M10.9 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6L2.4 13.3A23.8 23.8 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.4-6z"/>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.7 2.2-7.6 2.2-5.9 0-10.9-4-12.7-9.4l-8.1 6.3C6.9 42.5 14.8 48 24 48z"/>
            </svg>
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="auth-legal">
            Your Google email and name are used to set up your account.
            No password needed.
          </p>

          <button className="auth-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>
    );
  }

  /* ── Username step (shown after Google OAuth) ──────────────────── */
  return (
    <div className="auth-overlay">
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-hex-logo">IFT<br /><span>211</span></div>
        <h3 className="auth-title">Set Up Your Profile</h3>
        <p className="auth-muted">
          Hi <strong>{user?.user_metadata?.given_name || user?.email}</strong>!
          Pick an avatar and a username that will appear on the leaderboard.
        </p>

        <div className="auth-avatar-preview">
          <Avatar avatarId={avatarId} name={username} size="lg" />
        </div>

        <form onSubmit={handleSetUsername} className="auth-form">
          <div className="auth-field">
            <label>Username <span className="auth-field-hint">(shown publicly)</span></label>
            <input
              type="text"
              placeholder="e.g. jesutobi001"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              autoFocus
              required
            />
          </div>
          <AvatarPicker selected={avatarId} onSelect={setAvatarId} />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn primary" disabled={loading}>
            {loading ? "Saving…" : "Create Profile →"}
          </button>
        </form>
      </div>
    </div>
  );
}
