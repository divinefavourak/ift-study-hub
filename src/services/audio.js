/**
 * src/services/audio.js
 * Zero-asset synthesizer for UI sound effects using Web Audio API.
 * AudioContext is only created after the first user gesture (click/keydown)
 * to satisfy browser autoplay policies.
 */

let audioCtx = null;
let userHasInteracted = false;

// Listen for the first user gesture and mark it
if (typeof window !== "undefined") {
  const markInteraction = () => {
    userHasInteracted = true;
    window.removeEventListener("click", markInteraction, true);
    window.removeEventListener("keydown", markInteraction, true);
  };
  window.addEventListener("click", markInteraction, { capture: true, once: true });
  window.addEventListener("keydown", markInteraction, { capture: true, once: true });
}

function getContext() {
  if (!userHasInteracted) return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type = "sine", duration = 0.1, vol = 0.1, sweep = null) {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    if (sweep) sweep(osc, gainNode, ctx, duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio failures
  }
}

// ── UI Effects ───────────────────────────────────────────────────────────────

export function playHover() {
  playTone(800, "sine", 0.05, 0.02);
}

export function playClick() {
  playTone(1200, "sine", 0.03, 0.05);
  setTimeout(() => playTone(800, "square", 0.05, 0.02), 20);
}

export function playSuccess() {
  const vol = 0.08;
  playTone(523.25, "sine", 0.2, vol);
  setTimeout(() => playTone(659.25, "sine", 0.2, vol), 100);
  setTimeout(() => playTone(783.99, "sine", 0.4, vol), 200);
  setTimeout(() => playTone(1046.50, "sine", 0.6, vol * 1.5), 300);
}

export function playError() {
  playTone(150, "sawtooth", 0.3, 0.1, (osc, gain, ctx) => {
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
  });
  setTimeout(() => {
    playTone(140, "square", 0.3, 0.1, (osc, gain, ctx) => {
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.3);
    });
  }, 50);
}

export function playSplashHum() {
  try {
    const ctx = getContext();
    if (!ctx) return; // skip if no user gesture yet

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc2.type = "sine";

    osc.frequency.setValueAtTime(50, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 2);
    osc2.frequency.setValueAtTime(51, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(82, ctx.currentTime + 2);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1.5);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2.5);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 4);

    osc.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 4);
    osc2.stop(ctx.currentTime + 4);
  } catch (e) {
    // Ignore
  }
}

export function playReveal() {
  playTone(2000, "square", 0.1, 0.05, (osc, gain, ctx) => {
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
  });
}
