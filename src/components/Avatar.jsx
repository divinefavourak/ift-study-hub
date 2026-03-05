import { getAvatarDisplay } from "../data/avatars";

/**
 * Avatar
 * Renders a circular avatar — Open Peeps image or initials fallback.
 *
 * Props:
 *   avatarId   — profile.avatar_color (e.g. "peep_midnight" or any legacy value)
 *   name       — display name used for initials fallback
 *   size       — "sm" | "md" | "lg"  (default "md")
 *   className  — extra CSS classes
 *   style      — extra inline styles
 */
export default function Avatar({ avatarId, name = "", size = "md", className = "", style = {} }) {
  const disp = getAvatarDisplay(avatarId, name);
  const sizeClass = `avatar-${size}`;

  return (
    <div
      className={`avatar-circle ${sizeClass} ${className}`}
      style={{ background: disp.bg, ...style }}
    >
      {disp.type === "peep" ? (
        <img
          src={disp.url}
          alt=""
          className="avatar-peep-img"
          draggable={false}
        />
      ) : (
        <span className="avatar-initials">{disp.text}</span>
      )}
    </div>
  );
}
