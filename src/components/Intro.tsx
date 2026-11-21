import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Opening sequence: a black terminal where the ticker "GDS" is typed, a security-lookup
 * row resolves it to Giovanni De Stasio, and Enter opens the site.
 *
 * Shown once per browser session, only on the home page, never under reduced motion.
 * The inline script in index.html decides that before first paint and sets
 * <html data-intro="on">, which also holds the hero entrance until the overlay leaves.
 *
 * Browsers only allow sound after a user gesture, so the key clicks are silent until the
 * visitor presses a key or taps; Enter itself always counts as a gesture.
 */

const TICKER = "GDS";
const TYPE_AT = [650, 840, 990]; // ms; uneven gaps so it reads like a person typing
const STORAGE_KEY = "gds-intro-seen";

type Phase = "typing" | "lookup" | "ready" | "picked" | "leaving";

export function shouldShowIntro() {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "on";
}

function useKeySound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  const unlock = useCallback(() => {
    try {
      if (!ctxRef.current) {
        const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        ctxRef.current = new Ctor();
      }
      void ctxRef.current
        .resume()
        .then(() => setEnabled(ctxRef.current?.state === "running"))
        .catch(() => undefined);
    } catch {
      /* sound is optional */
    }
  }, []);

  /** A short filtered noise burst: the mechanical tick of a key. `heavy` is the Enter key. */
  const click = useCallback((heavy = false) => {
    const ctx = ctxRef.current;
    if (!ctx || ctx.state !== "running") return;
    const now = ctx.currentTime;
    const length = heavy ? 0.09 : 0.035;
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 3;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = heavy ? 900 : 2400 + Math.random() * 900;
    filter.Q.value = heavy ? 0.8 : 1.4;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(heavy ? 0.5 : 0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + length);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);

    if (heavy) {
      const thump = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thump.frequency.setValueAtTime(140, now);
      thump.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      thumpGain.gain.setValueAtTime(0.25, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      thump.connect(thumpGain).connect(ctx.destination);
      thump.start(now);
      thump.stop(now + 0.11);
    }
  }, []);

  useEffect(
    () => () => {
      void ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
    },
    [],
  );

  return { unlock, click, enabled };
}

const GLYPHS = "$%#*+=<>/\\|01GDS";
const CELL_W = 14;
const CELL_H = 18;
const DISSOLVE_MS = 1100;

/**
 * Background of the intro: faint falling glyphs while the ticker is typed, then, once
 * `dissolving` turns on, the whole black screen breaks into characters that burn away
 * from the centre outward and reveal the site underneath.
 */
function AsciiField({ dissolving }: { dissolving: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dissolveRef = useRef(dissolving);
  dissolveRef.current = dissolving;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink").trim() || "#ecebe5";
    const accent = styles.getPropertyValue("--accent").trim() || "#8fd6a0";
    const black = "#060708";

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let thresholds: Float32Array = new Float32Array(0);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL_W);
      rows = Math.ceil(h / CELL_H);
      drops = Array.from({ length: cols }, () => Math.random() * -rows);
      speeds = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.55);
      const maxD = Math.hypot(cols / 2, rows / 2);
      thresholds = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const d = Math.hypot(c - cols / 2, (r - rows / 2) * (CELL_H / CELL_W)) / maxD;
          thresholds[r * cols + c] = Math.min(1, d) * 0.6 + Math.random() * 0.4;
        }
      }
      ctx.fillStyle = black;
      ctx.fillRect(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize);
    ctx.font = `${CELL_H - 5}px "Geist Mono", ui-monospace, Menlo, monospace`;
    ctx.textBaseline = "top";

    const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    let frame = 0;
    let last = 0;
    let dissolveStart = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      if (dissolveRef.current) {
        if (!dissolveStart) dissolveStart = now;
        const t = Math.min(1, (now - dissolveStart) / DISSOLVE_MS);
        const p = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2; // ease-in-out cubic
        ctx.clearRect(0, 0, w, h);
        for (let r = 0; r < rows; r += 1) {
          for (let c = 0; c < cols; c += 1) {
            const th = thresholds[r * cols + c];
            if (th <= p) continue; // gone: the site shows through
            const x = c * CELL_W;
            const y = r * CELL_H;
            ctx.fillStyle = black;
            ctx.fillRect(x, y, CELL_W, CELL_H);
            const edge = th - p;
            if (edge < 0.09) {
              ctx.globalAlpha = 1 - edge / 0.09;
              ctx.fillStyle = edge < 0.035 ? accent : ink;
              ctx.fillText(glyph(), x + 2, y + 2);
              ctx.globalAlpha = 1;
            }
          }
        }
        if (t >= 1) cancelAnimationFrame(frame);
        return;
      }

      // Rain at ~30 fps: a translucent wash leaves short trails behind each head.
      if (now - last < 33) return;
      last = now;
      ctx.fillStyle = "rgba(6, 7, 8, 0.16)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = accent;
      for (let c = 0; c < cols; c += 1) {
        const y = Math.floor(drops[c]) * CELL_H;
        ctx.globalAlpha = 0.2;
        ctx.fillText(glyph(), c * CELL_W + 2, y);
        drops[c] += speeds[c];
        if (drops[c] > rows && Math.random() > 0.975) drops[c] = Math.random() * -10;
      }
      ctx.globalAlpha = 1;
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-field" aria-hidden="true" />;
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const timers = useRef<number[]>([]);
  const enterRef = useRef<HTMLButtonElement | null>(null);
  const { unlock, click, enabled } = useKeySound();

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode: the intro simply shows again next time */
    }
    document.documentElement.dataset.intro = "off";
    document.body.style.overflow = "";
    onDone();
  }, [onDone]);

  // Typing, then the lookup row, then the Enter prompt.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    TYPE_AT.forEach((at, i) =>
      later(() => {
        setTyped(TICKER.slice(0, i + 1));
        click();
      }, at),
    );
    const last = TYPE_AT[TYPE_AT.length - 1];
    later(() => setPhase("lookup"), last + 220);
    later(() => setPhase("ready"), last + 380);
    return () => timers.current.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "ready") enterRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const open = useCallback(() => {
    if (phase === "picked" || phase === "leaving") return;
    unlock();
    click(true);
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setTyped(TICKER);
    setPhase("picked");
    // Cause, then effect: the row confirms, then the screen dissolves into characters
    // from the centre out, and the hero starts entering while the edges are still burning.
    later(() => setPhase("leaving"), 320);
    later(() => {
      document.documentElement.dataset.intro = "off";
    }, 320);
    later(finish, 320 + DISSOLVE_MS + 60);
  }, [phase, unlock, click, finish]);

  const skip = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    finish();
  }, [finish]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return skip();
      if (event.key === "Enter") {
        event.preventDefault();
        return open();
      }
      unlock();
      if (event.key.length === 1) click();
    };
    const onPointer = () => unlock();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, skip, unlock, click]);

  const showLookup = phase !== "typing";
  const showHint = phase === "ready" || phase === "picked" || phase === "leaving";

  return (
    <div className="intro" role="dialog" aria-modal="true" aria-label="Intro: ticker lookup" data-leaving={phase === "leaving"}>
      <AsciiField dissolving={phase === "leaving"} />
      <span className="intro-progress" data-on={phase === "picked"} aria-hidden="true" />

      <div className="intro-box">
        <p className="intro-prompt" aria-label={`Ticker ${typed}`}>
          <span className="caret-sign" aria-hidden="true">
            ›
          </span>
          <span aria-hidden="true">{typed}</span>
          {phase !== "picked" && phase !== "leaving" && <span className="intro-cursor" aria-hidden="true" />}
        </p>

        <div className="intro-lookup" data-on={showLookup} data-picked={phase === "picked" || phase === "leaving"}>
          <span className="sym">GDS</span>
          <span className="desc">Giovanni De Stasio · Bocconi · Milan</span>
          <span className="cls">PROFILE</span>
        </div>

        <div className="intro-hint" data-on={showHint}>
          <span>1 result</span>
          <button ref={enterRef} type="button" className="intro-enter" onClick={open} tabIndex={showHint ? 0 : -1}>
            Open <kbd>Enter ↵</kbd>
          </button>
        </div>
      </div>

      {!enabled && <p className="intro-note">Press any key for sound</p>}
      <button type="button" className="intro-skip" onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
