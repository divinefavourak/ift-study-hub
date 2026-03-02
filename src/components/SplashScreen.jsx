import { useEffect, useState } from "react";
import { playSplashHum, playReveal } from "../services/audio";

/**
 * SplashScreen — shown once per session on first load.
 * Circuit-board digital aesthetic with sequential animation stages.
 * onDone() is called when the exit animation finishes.
 */

// Circuit grid lines — random-ish but deterministic
const H_LINES = [8, 18, 32, 47, 61, 74, 88];
const V_LINES = [6, 17, 28, 41, 55, 68, 79, 91];
const NODES = [
  [6, 8], [28, 18], [41, 32], [17, 47], [55, 61], [79, 74], [91, 88],
  [17, 18], [68, 32], [91, 47], [6, 61], [41, 74], [28, 88],
];

const GLITCH_CHARS = "█▓▒░▄▀■◆●○◉⊕⊗⊙∑∆∇≡≈±×∞";

function randomGlitch() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function GlitchText({ text, active }) {
  const [display, setDisplay] = useState(text.split("").map(() => "█"));

  useEffect(() => {
    if (!active) return;
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((ch, i) =>
          i < iter ? text[i] : randomGlitch()
        )
      );
      iter++;
      if (iter > text.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{display.join("")}</span>;
}

export default function SplashScreen({ onDone }) {
  // Stages: 0=dark, 1=grid, 2=scan, 3=logo, 4=subtitle, 5=bar, 6=ready, 7=exit
  const [stage, setStage] = useState(0);
  const [barPct, setBarPct] = useState(0);

  useEffect(() => {
    const schedule = [
      [120,  () => setStage(1)],   // grid appears
      [600,  () => setStage(2)],   // scan line
      [1000, () => { setStage(3); playReveal(); }], // IFT 211 logo + audio sweep
      [1600, () => setStage(4)],   // subtitle
      [2200, () => setStage(5)],   // loading bar starts
    ];
    const timers = schedule.map(([ms, fn]) => setTimeout(fn, ms));

    // Animate bar from 0 → 100 over 900ms starting at 2200ms
    let barTimer;
    timers.push(
      setTimeout(() => {
        let pct = 0;
        barTimer = setInterval(() => {
          pct = Math.min(100, pct + 2 + Math.random() * 4);
          setBarPct(Math.round(pct));
          if (pct >= 100) {
            clearInterval(barTimer);
            setTimeout(() => setStage(6), 180);    // "READY"
            setTimeout(() => setStage(7), 700);    // exit
            setTimeout(onDone, 1350);              // unmount after fade
          }
        }, 20);
      }, 2200)
    );

    // Note: The hum requires the user to have interacted previously, which
    // is rare on a first fresh load due to browser autoplay policies, 
    // but works great on subsequent reloads.
    playSplashHum();

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(barTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash-root ${stage >= 7 ? "splash-exit" : ""}`}>

      {/* ── Circuit grid ────────────────────────────── */}
      <svg className={`splash-grid ${stage >= 1 ? "visible" : ""}`}
        viewBox="0 0 100 100" preserveAspectRatio="none">
        {H_LINES.map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="100" y2={y}
            stroke="rgba(0,214,255,0.07)" strokeWidth="0.3" />
        ))}
        {V_LINES.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100"
            stroke="rgba(0,214,255,0.07)" strokeWidth="0.3" />
        ))}
        {NODES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.7"
            fill="rgba(0,214,255,0.45)" />
        ))}
      </svg>

      {/* ── Scan line ───────────────────────────────── */}
      {stage >= 2 && (
        <div className="splash-scan" />
      )}

      {/* ── Floating particles ──────────────────────── */}
      {stage >= 1 && (
        <div className="splash-particles">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="splash-particle" style={{
              left: `${(i * 13 + 5) % 100}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }} />
          ))}
        </div>
      )}

      {/* ── Main content ────────────────────────────── */}
      <div className="splash-content">

        {/* Logo hex ring */}
        <div className={`splash-hex-ring ${stage >= 3 ? "visible" : ""}`}>
          <div className="splash-hex-inner">
            <span className="splash-hex-code">IFT</span>
            <span className="splash-hex-num">211</span>
          </div>
        </div>

        {/* Glitch title */}
        <div className={`splash-title ${stage >= 3 ? "visible" : ""}`}>
          <GlitchText text="DIGITAL LOGIC" active={stage >= 3} />
          <br />
          <span className="splash-title-2">
            <GlitchText text="AND DESIGN" active={stage >= 3} />
          </span>
        </div>

        {/* Subtitle */}
        <div className={`splash-sub ${stage >= 4 ? "visible" : ""}`}>
          STUDY HUB · IFT 211 · JESUTOBI-001 OF CSC
        </div>

        {/* Loading bar */}
        <div className={`splash-bar-wrap ${stage >= 5 ? "visible" : ""}`}>
          <div className="splash-bar-track">
            <div className="splash-bar-fill" style={{ width: `${barPct}%` }} />
          </div>
          <div className="splash-bar-pct">
            {stage >= 6 ? "SYSTEM READY" : `INITIALIZING... ${barPct}%`}
          </div>
        </div>

      </div>

      {/* ── Corner decorators ───────────────────────── */}
      {["tl","tr","bl","br"].map((pos) => (
        <div key={pos} className={`splash-corner splash-corner-${pos} ${stage >= 1 ? "visible" : ""}`} />
      ))}

    </div>
  );
}
