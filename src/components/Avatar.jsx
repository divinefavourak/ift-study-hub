import { getAvatarDisplay } from "../data/avatars";

/**
 * Avatar
 * Renders a circular avatar — emoji preset or initials fallback.
 *
 * Props:
 *   avatarId   — profile.avatar_color value (may be a preset id or hex colour)
 *   name       — display name used for initials fallback
 *   size       — "sm" | "md" (default "md")
 *   className  — extra CSS classes
 *   style      — extra inline styles
 */
export default function Avatar({ avatarId, name = "", size = "md", className = "", style = {} }) {
  const disp = getAvatarDisplay(avatarId, name);
  const sizeClass = size === "sm" ? "avatar-sm" : "avatar-md";

  return (
    <div
      className={`avatar-circle ${sizeClass} ${className}`}
      style={{ background: disp.bg, ...style }}
    >
      {disp.type === "emoji" ? (
        <span className="avatar-emoji">{disp.emoji}</span>
      ) : (
        <span className="avatar-initials">{disp.text}</span>
      )}
    </div>
  );
}
