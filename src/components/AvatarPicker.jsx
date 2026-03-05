import { PRESET_AVATARS } from "../data/avatars";

/**
 * AvatarPicker
 * Shows a grid of preset avatars. Calls onSelect(avatarId) when clicked.
 */
export default function AvatarPicker({ selected, onSelect }) {
  return (
    <div className="avatar-picker">
      <div className="avatar-picker-label">Choose your avatar</div>
      <div className="avatar-picker-grid">
        {PRESET_AVATARS.map((av) => (
          <button
            key={av.id}
            type="button"
            className={`avatar-option ${selected === av.id ? "selected" : ""}`}
            style={{ background: av.bg }}
            onClick={() => onSelect(av.id)}
            title={av.emoji}
          >
            <span className="avatar-option-emoji">{av.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
