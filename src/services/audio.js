/**
 * src/services/audio.js
 * Zero-asset synthesizer for UI sound effects using Web Audio API.
 * Creates futuristic/cyberpunk themed blips and hums.
 */

// We create the AudioContext lazily because browsers require user interaction
// before audio can be played.
let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // If context is suspended (due to no interaction), try to resume
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Helper to play a quick synthesized tone.
 * @param {number} freq - Frequency in Hz
 * @param {string} type - Oscillator type (sine, square, sawtooth, triangle)
 * @param {number} duration - Duration in seconds
 * @param {number} vol - Volume (0.0 to 1.0)
 * @param {function} sweep - Optional function to sweep frequency/volume
 */
function playTone(freq, type = "sine", duration = 0.1, vol = 0.1, sweep = null) {
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Fade out to avoid clicks
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    if (sweep) sweep(osc, gainNode, ctx, duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore if audio fails (e.g. strict autoplay policy)
  }
}

// ── UI Effects ──────────────────────────────────────────────────────────────

export function playHover() {
  playTone(800, "sine", 0.05, 0.02);
}

export function playClick() {
  // A dual-tone modern click (high then low)
  playTone(1200, "sine", 0.03, 0.05);
  setTimeout(() => playTone(800, "square", 0.05, 0.02), 20);
}

export function playSuccess() {
  // A rising, pleasant arpeggio (C Major)
  const vol = 0.08;
  playTone(523.25, "sine", 0.2, vol); // C5
  setTimeout(() => playTone(659.25, "sine", 0.2, vol), 100); // E5
  setTimeout(() => playTone(783.99, "sine", 0.4, vol), 200); // G5
  setTimeout(() => playTone(1046.50, "sine", 0.6, vol * 1.5), 300); // C6
}

export function playError() {
  // A low, dissonant buzz
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
  // A deep, evolving sci-fi sweep and hum
  try {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sawtooth";
    osc2.type = "sine";
    
    // Start low and sweep up slightly
    osc.frequency.setValueAtTime(50, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 2);
    
    osc2.frequency.setValueAtTime(51, ctx.currentTime); // 1Hz beat frequency
    osc2.frequency.linearRampToValueAtTime(82, ctx.currentTime + 2);

    // Fade in and out over 4 seconds
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
  // A fast digital sweep (like a terminal printing)
  playTone(2000, "square", 0.1, 0.05, (osc, gain, ctx) => {
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
  });
}
