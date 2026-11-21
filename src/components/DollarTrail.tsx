import { useEffect, useRef } from "react";

/**
 * A light trail of dollar signs that follows the cursor and bursts on click.
 *
 * Particles come from a fixed pool driven by one requestAnimationFrame loop, so nothing is
 * created or destroyed while the pointer moves. Each sign inherits part of the cursor's
 * velocity, drifts, falls slightly and fades. Only on devices with a fine pointer, and never
 * under reduced motion. The loop stops itself when every particle is idle.
 */

const POOL = 48;
const SPACING = 26; // px of pointer travel between two signs
const LIFE = [900, 1300]; // ms

type Particle = {
  el: HTMLSpanElement;
  alive: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  born: number;
  life: number;
};

export function DollarTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const particles: Particle[] = Array.from({ length: POOL }, () => {
      const el = document.createElement("span");
      el.className = "dollar";
      el.textContent = "$";
      el.style.opacity = "0";
      layer.appendChild(el);
      return { el, alive: false, x: 0, y: 0, vx: 0, vy: 0, rot: 0, vr: 0, size: 14, born: 0, life: 1000 };
    });

    let cursor = 0;
    let frame = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastT = 0;
    let travelled = 0;

    const spawn = (x: number, y: number, vx: number, vy: number, burst = false) => {
      const p = particles[cursor];
      cursor = (cursor + 1) % POOL;
      p.alive = true;
      p.x = x;
      p.y = y;
      p.vx = vx;
      p.vy = vy;
      p.rot = (Math.random() - 0.5) * 30;
      p.vr = (Math.random() - 0.5) * (burst ? 0.5 : 0.25);
      p.size = burst ? 14 + Math.random() * 10 : 11 + Math.random() * 7;
      p.born = performance.now();
      p.life = LIFE[0] + Math.random() * (LIFE[1] - LIFE[0]);
      p.el.style.fontSize = `${p.size}px`;
      // Mostly warm ink; one in six picks up the accent green.
      p.el.style.color = Math.random() < 1 / 6 ? "var(--accent)" : "var(--ink)";
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      let anyAlive = false;
      for (const p of particles) {
        if (!p.alive) continue;
        const age = (now - p.born) / p.life;
        if (age >= 1) {
          p.alive = false;
          p.el.style.opacity = "0";
          continue;
        }
        anyAlive = true;
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + 0.045; // slight gravity: the money falls away
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr * 16;
        const fadeIn = Math.min(1, age / 0.12);
        const opacity = fadeIn * (1 - age) ** 1.6 * 0.75;
        const scale = 0.6 + Math.min(1, age / 0.18) * 0.4 - age * 0.15;
        p.el.style.opacity = opacity.toFixed(3);
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.rot}deg) scale(${scale})`;
      }
      frame = anyAlive ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const now = performance.now();
      if (lastX === null || lastY === null) {
        lastX = event.clientX;
        lastY = event.clientY;
        lastT = now;
        return;
      }
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const dt = Math.max(16, now - lastT);
      travelled += Math.hypot(dx, dy);
      if (travelled >= SPACING) {
        travelled = 0;
        const vx = (dx / dt) * 4 + (Math.random() - 0.5) * 0.8;
        const vy = (dy / dt) * 4 - 0.6 - Math.random() * 0.6;
        spawn(event.clientX, event.clientY, vx, vy);
      }
      lastX = event.clientX;
      lastY = event.clientY;
      lastT = now;
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      for (let i = 0; i < 9; i += 1) {
        const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.4;
        const speed = 2.2 + Math.random() * 1.6;
        spawn(event.clientX, event.clientY, Math.cos(angle) * speed, Math.sin(angle) * speed - 1.2, true);
      }
    };

    const onLeave = () => {
      lastX = null;
      lastY = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="dollar-layer" aria-hidden="true" />;
}
