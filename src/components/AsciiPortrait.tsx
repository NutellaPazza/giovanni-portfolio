import { useEffect, useRef } from "react";

/**
 * The portrait, with an ASCII lens: wherever the cursor rests, that part of the photo is
 * redrawn as characters. The photo itself never changes; a canvas on top draws the lens.
 *
 * The character grid is computed once from the image (and again on resize), so each frame
 * only draws the cells inside the lens. Only on fine pointers, never under reduced motion;
 * elsewhere it is simply the photo.
 */

const RAMP = " .,:;-=+*#%@";
const CELL_W = 7;
const CELL_H = 12;
const RADIUS = 104;

type Props = { src: string; alt: string };

export function AsciiPortrait({ src, alt }: Props) {
  const figureRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!figure || !img || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let grid: Uint8Array = new Uint8Array(0);
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--ink").trim() || "#ecebe5";
    const bg = styles.getPropertyValue("--bg").trim() || "#0e0f11";
    const accent = styles.getPropertyValue("--accent").trim() || "#8fd6a0";

    /** Sample the photo, as displayed with object-fit: cover, into a brightness grid. */
    const build = () => {
      width = figure.clientWidth;
      height = figure.clientHeight;
      if (!width || !height || !img.naturalWidth) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cols = Math.ceil(width / CELL_W);
      rows = Math.ceil(height / CELL_H);

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const sw = width / scale;
      const sh = height / scale;
      const sx = (img.naturalWidth - sw) / 2;
      const sy = (img.naturalHeight - sh) / 2;
      sctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;
      // Auto-levels: stretch the photo's own brightness range so the face reads clearly.
      const lums = new Float32Array(cols * rows);
      let lo = 255;
      let hi = 0;
      for (let i = 0; i < cols * rows; i += 1) {
        const lum = 0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2];
        lums[i] = lum;
        lo = Math.min(lo, lum);
        hi = Math.max(hi, lum);
      }
      const span = Math.max(1, hi - lo);
      grid = new Uint8Array(cols * rows);
      for (let i = 0; i < cols * rows; i += 1) {
        const v = ((lums[i] - lo) / span) ** 0.75;
        grid[i] = Math.min(RAMP.length - 1, Math.floor(v * RAMP.length));
      }
    };

    let target = { x: 0, y: 0 };
    let lens = { x: 0, y: 0, r: 0 };
    let wantR = 0;
    let frame = 0;

    const draw = () => {
      lens.x += (target.x - lens.x) * 0.22;
      lens.y += (target.y - lens.y) * 0.22;
      lens.r += (wantR - lens.r) * 0.18;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (lens.r > 0.5 && grid.length) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = bg;
        ctx.fillRect(lens.x - lens.r, lens.y - lens.r, lens.r * 2, lens.r * 2);

        ctx.font = `500 ${CELL_H}px "Geist Mono", ui-monospace, Menlo, monospace`;
        ctx.textBaseline = "top";
        const c0 = Math.max(0, Math.floor((lens.x - lens.r) / CELL_W));
        const c1 = Math.min(cols - 1, Math.ceil((lens.x + lens.r) / CELL_W));
        const r0 = Math.max(0, Math.floor((lens.y - lens.r) / CELL_H));
        const r1 = Math.min(rows - 1, Math.ceil((lens.y + lens.r) / CELL_H));
        for (let r = r0; r <= r1; r += 1) {
          for (let c = c0; c <= c1; c += 1) {
            const v = grid[r * cols + c];
            if (!v) continue;
            const cx = c * CELL_W + CELL_W / 2;
            const cy = r * CELL_H + CELL_H / 2;
            const d = Math.hypot(cx - lens.x, cy - lens.y) / lens.r;
            if (d > 1) continue;
            ctx.globalAlpha = Math.min(1, (1 - d) * 2.2);
            ctx.fillStyle = d > 0.86 ? accent : ink;
            ctx.fillText(RAMP[v], c * CELL_W, r * CELL_H);
          }
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      const moving = Math.abs(target.x - lens.x) + Math.abs(target.y - lens.y) + Math.abs(wantR - lens.r) > 0.4;
      frame = moving ? requestAnimationFrame(draw) : 0;
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = figure.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (lens.r < 1) lens = { ...target, r: lens.r };
      wantR = RADIUS;
      kick();
    };

    const onLeave = () => {
      wantR = 0;
      kick();
    };

    const ready = () => build();
    if (img.complete) ready();
    else img.addEventListener("load", ready, { once: true });

    const resize = new ResizeObserver(() => build());
    resize.observe(figure);
    figure.addEventListener("pointermove", onMove);
    figure.addEventListener("pointerleave", onLeave);

    return () => {
      resize.disconnect();
      figure.removeEventListener("pointermove", onMove);
      figure.removeEventListener("pointerleave", onLeave);
      img.removeEventListener("load", ready);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure ref={figureRef} className="portrait">
      <img ref={imgRef} src={src} alt={alt} />
      <canvas ref={canvasRef} className="portrait-ascii" aria-hidden="true" />
    </figure>
  );
}
