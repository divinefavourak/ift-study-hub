/**
 * src/data/avatars.js
 * Preset avatar definitions and display helpers.
 *
 * avatarId is stored in the profile's `avatar_color` field.
 * If the value starts with "av_" it is an avatar preset ID;
 * otherwise it is treated as a raw CSS colour (legacy / fallback).
 */

export const PRESET_AVATARS = [
  { id: "av_fox",       emoji: "🦊", bg: "#e05a1e" },
  { id: "av_wolf",      emoji: "🐺", bg: "#4a6fa5" },
  { id: "av_lion",      emoji: "🦁", bg: "#c67c2a" },
  { id: "av_tiger",     emoji: "🐯", bg: "#d44e2a" },
  { id: "av_panda",     emoji: "🐼", bg: "#2d4a3e" },
  { id: "av_owl",       emoji: "🦉", bg: "#2a8f82" },
  { id: "av_eagle",     emoji: "🦅", bg: "#8a6e20" },
  { id: "av_dragon",    emoji: "🐲", bg: "#2a7a3e" },
  { id: "av_robot",     emoji: "🤖", bg: "#0099bb" },
  { id: "av_alien",     emoji: "👾", bg: "#7c5cbf" },
  { id: "av_ninja",     emoji: "🥷", bg: "#1a2535" },
  { id: "av_wizard",    emoji: "🧙", bg: "#5e2db3" },
  { id: "av_rocket",    emoji: "🚀", bg: "#2060c0" },
  { id: "av_gem",       emoji: "💎", bg: "#0080a0" },
  { id: "av_fire",      emoji: "🔥", bg: "#b01818" },
  { id: "av_star",      emoji: "⭐", bg: "#a07800" },
  { id: "av_lightning", emoji: "⚡", bg: "#b09000" },
  { id: "av_crystal",   emoji: "🔮", bg: "#6030a0" },
  { id: "av_cat",       emoji: "🐱", bg: "#c05800" },
  { id: "av_penguin",   emoji: "🐧", bg: "#0070a0" },
  { id: "av_butterfly", emoji: "🦋", bg: "#a02070" },
  { id: "av_snake",     emoji: "🐍", bg: "#1a7a30" },
  { id: "av_shark",     emoji: "🦈", bg: "#005888" },
  { id: "av_phoenix",   emoji: "🦩", bg: "#a01870" },
];

/** Returns the avatar definition matching the given id, or null. */
export function findAvatar(avatarId) {
  return PRESET_AVATARS.find((a) => a.id === avatarId) ?? null;
}

/**
 * Given a profile object (or just an avatar_color string),
 * returns a display descriptor:
 *   { type: "emoji", emoji, bg }      — for preset avatars
 *   { type: "initials", text, bg }    — fallback with initials
 */
export function getAvatarDisplay(avatarColorOrId, fallbackName = "", fallbackBg = "#00d6ff") {
  const preset = findAvatar(avatarColorOrId);
  if (preset) return { type: "emoji", emoji: preset.emoji, bg: preset.bg };

  const initials = fallbackName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "?";

  return {
    type: "initials",
    text: initials,
    bg: avatarColorOrId?.startsWith("#") ? avatarColorOrId : fallbackBg,
  };
}
