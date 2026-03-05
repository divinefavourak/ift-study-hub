import { PRESET_AVATARS, getAvatarUrl } from "../data/avatars";

/**
 * AvatarPicker
 * Grid of Open Peeps avatars to choose from.
 * Calls onSelect(avatarId) when an avatar is clicked.
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
            aria-label={av.seed}
          >
            <img
              src={getAvatarUrl(av.seed)}
              alt={av.seed}
              className="avatar-peep-img"
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
