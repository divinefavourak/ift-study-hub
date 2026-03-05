/**
 * src/data/avatars.js
 * Open Peeps avatar definitions powered by DiceBear API.
 *
 * avatarId is stored in profile.avatar_color as "peep_<seed>".
 * Any value that doesn't start with "peep_" falls back to initials.
 */

export const PRESET_AVATARS = [
  { id: "peep_midnight", seed: "Midnight",  bg: "#1a2744" },
  { id: "peep_aurora",   seed: "Aurora",    bg: "#3b1f5e" },
  { id: "peep_zephyr",   seed: "Zephyr",    bg: "#0f3d30" },
  { id: "peep_nova",     seed: "Nova",      bg: "#4a1c1c" },
  { id: "peep_phoenix",  seed: "Phoenix",   bg: "#2d1045" },
  { id: "peep_atlas",    seed: "Atlas",     bg: "#0d2e40" },
  { id: "peep_sage",     seed: "Sage",      bg: "#14382c" },
  { id: "peep_orion",    seed: "Orion",     bg: "#23103a" },
  { id: "peep_luna",     seed: "Luna",      bg: "#12254a" },
  { id: "peep_blaze",    seed: "Blaze",     bg: "#3d1a08" },
  { id: "peep_storm",    seed: "Storm",     bg: "#182030" },
  { id: "peep_ember",    seed: "Ember",     bg: "#3d1020" },
  { id: "peep_frost",    seed: "Frost",     bg: "#0f3540" },
  { id: "peep_shadow",   seed: "Shadow",    bg: "#111820" },
  { id: "peep_titan",    seed: "Titan",     bg: "#2e2510" },
  { id: "peep_vega",     seed: "Vega",      bg: "#141e40" },
  { id: "peep_echo",     seed: "Echo",      bg: "#2d1030" },
  { id: "peep_rex",      seed: "Rex",       bg: "#3a1808" },
  { id: "peep_cruz",     seed: "Cruz",      bg: "#102d18" },
  { id: "peep_jade",     seed: "Jade",      bg: "#083d28" },
  { id: "peep_kai",      seed: "Kai",       bg: "#261040" },
  { id: "peep_nix",      seed: "Nix",       bg: "#181838" },
  { id: "peep_sol",      seed: "Sol",       bg: "#3a2208" },
  { id: "peep_zen",      seed: "Zen",       bg: "#102228" },
];

/** Returns the avatar definition matching the given id, or null. */
export function findAvatar(avatarId) {
  return PRESET_AVATARS.find((a) => a.id === avatarId) ?? null;
}

/** Builds the DiceBear Open Peeps SVG URL for a given seed. */
export function getAvatarUrl(seed) {
  return `https://api.dicebear.com/9.x/open-peeps/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;
}

/**
 * Returns a display descriptor for use in Avatar.jsx:
 *   { type: "peep",     url, bg }
 *   { type: "initials", text, bg }
 */
export function getAvatarDisplay(avatarId, fallbackName = "", fallbackBg = "#1a2744") {
  const preset = findAvatar(avatarId);
  if (preset) {
    return { type: "peep", url: getAvatarUrl(preset.seed), bg: preset.bg };
  }

  const initials =
    fallbackName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "?";

  return {
    type: "initials",
    text: initials,
    bg: fallbackBg,
  };
}
