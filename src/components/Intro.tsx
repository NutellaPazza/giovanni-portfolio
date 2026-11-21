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
const TYPE_AT = [450, 640, 790]; // ms; uneven gaps so it reads like a person typing
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
    // Cause, then effect: the row confirms, the hairline runs, the overlay lifts away,
    // and the hero starts entering while the overlay is still moving.
    later(() => setPhase("leaving"), 380);
    later(() => {
      document.documentElement.dataset.intro = "off";
    }, 380 + 380);
    later(finish, 380 + 720);
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
      <span className="intro-progress" data-on={phase === "picked" || phase === "leaving"} aria-hidden="true" />

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
