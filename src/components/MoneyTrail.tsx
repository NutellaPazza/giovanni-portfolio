import { useEffect, useRef } from "react";

export function MoneyTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const lastEmitRef = useRef(0);
  const idleFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    const layer = layerRef.current;
    if (!layer) return;

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("span");
      const driftX = `${Math.round((Math.random() - 0.5) * 58)}px`;
      const driftY = `${Math.round(22 + Math.random() * 44)}px`;
      const rotation = `${Math.round((Math.random() - 0.5) * 58)}deg`;

      particle.className = "money-particle money-particle--dollar";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--drift-x", driftX);
      particle.style.setProperty("--drift-y", driftY);
      particle.style.setProperty("--rotation", rotation);
      particle.textContent = "$";

      layer.appendChild(particle);
      window.setTimeout(() => particle.remove(), 1800);
    };

    const onPointerMove = (event: MouseEvent | PointerEvent) => {
      const now = performance.now();
      if (now - lastEmitRef.current < 92) return;
      lastEmitRef.current = now;

      if (idleFrameRef.current) {
        window.cancelAnimationFrame(idleFrameRef.current);
      }

      idleFrameRef.current = window.requestAnimationFrame(() => {
        createParticle(event.clientX, event.clientY);
      });
    };

    const moveEvent = "PointerEvent" in window ? "pointermove" : "mousemove";
    window.addEventListener(moveEvent, onPointerMove, { passive: true });

    return () => {
      window.removeEventListener(moveEvent, onPointerMove);
      if (idleFrameRef.current) {
        window.cancelAnimationFrame(idleFrameRef.current);
      }
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="money-trail" aria-hidden="true" />;
}
