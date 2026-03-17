import { useEffect, useRef } from "react";

/**
 * MagneticCursor
 * ──────────────
 * Drop this once inside your root layout / App.tsx.
 * Add  cursor: none  to your global CSS on html/body.
 *
 * Features:
 *  • Sharp violet dot locked to mouse
 *  • Trailing ring with lerp lag
 *  • Ring stretches in direction of movement (velocity warp)
 *  • Ring expands + blends on <a>, <button>, [data-cursor-hover]
 *  • Comet tail: 8 fading ghost rings along the trail
 *  • Pulse burst on click
 */

interface CursorState {
  mx: number; my: number;       // real mouse
  rx: number; ry: number;       // ring lag position
  vx: number; vy: number;       // velocity
  prevRx: number; prevRy: number;
  hovering: boolean;
  clicking: boolean;
  clickT: number;
  trail: { x: number; y: number }[];
}

const RING_SIZE    = 32;
const RING_LERP    = 0.1;
const TRAIL_LEN    = 8;
const VIOLET       = "rgba(167,139,250,";
const VIOLET_SOLID = "#a78bfa";

export default function MagneticCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const s        = useRef<CursorState>({
    mx: -200, my: -200,
    rx: -200, ry: -200,
    vx: 0,   vy: 0,
    prevRx: -200, prevRy: -200,
    hovering: false,
    clicking: false,
    clickT: 0,
    trail: Array.from({ length: TRAIL_LEN }, () => ({ x: -200, y: -200 })),
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      s.current.mx = e.clientX;
      s.current.my = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      s.current.hovering =
        !!el?.closest("a, button, [data-cursor-hover]");

      // Move sharp dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const onDown = () => {
      s.current.clicking = true;
      s.current.clickT   = performance.now();
    };
    const onUp = () => { s.current.clicking = false; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    // ── Animation loop ──
    let rafId = 0;

    function loop() {
      const c = s.current;

      c.prevRx = c.rx;
      c.prevRy = c.ry;

      c.rx += (c.mx - c.rx) * RING_LERP;
      c.ry += (c.my - c.ry) * RING_LERP;

      c.vx = c.rx - c.prevRx;
      c.vy = c.ry - c.prevRy;

      const speed = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
      const angle = Math.atan2(c.vy, c.vx) * (180 / Math.PI);

      // Stretch: squish perpendicular, stretch along velocity
      const stretch = c.hovering ? 1 : 1 + Math.min(speed * 0.06, 0.7);
      const squish  = c.hovering ? 1 : 1 / Math.max(stretch, 0.5);

      // Hover state
      const targetSize = c.hovering ? 56 : RING_SIZE;
      const targetAlpha = c.hovering ? 0.55 : 0.6;

      // Click pulse
      const sincClick = performance.now() - c.clickT;
      const pulse = c.clicking || sincClick < 300
        ? 1 + Math.sin((sincClick / 300) * Math.PI) * 0.35
        : 1;

      if (ringRef.current) {
        const r = ringRef.current;
        const sz = targetSize * pulse;
        r.style.width  = sz + "px";
        r.style.height = sz + "px";
        r.style.transform = [
          `translate(${c.rx - sz / 2}px, ${c.ry - sz / 2}px)`,
          `rotate(${angle}deg)`,
          `scaleX(${stretch})`,
          `scaleY(${squish})`,
        ].join(" ");
        r.style.borderColor = c.hovering
          ? `rgba(230,100,40,0.75)`
          : `${VIOLET}${targetAlpha})`;
        r.style.boxShadow = c.hovering
          ? `0 0 12px rgba(230,100,40,0.3)`
          : `0 0 8px rgba(167,139,250,0.2)`;
      }

      // Shift trail history
      c.trail.unshift({ x: c.rx, y: c.ry });
      c.trail.length = TRAIL_LEN;

      // Update ghost trail rings
      trailRef.current.forEach((el, i) => {
        if (!el) return;
        const t = c.trail[i] ?? c.trail[c.trail.length - 1];
        const frac = 1 - i / TRAIL_LEN;
        const ghostSize = RING_SIZE * frac * 0.65;
        const alpha = frac * 0.18;
        el.style.width  = ghostSize + "px";
        el.style.height = ghostSize + "px";
        el.style.transform = `translate(${t.x - ghostSize / 2}px, ${t.y - ghostSize / 2}px)`;
        el.style.borderColor = `${VIOLET}${alpha})`;
        el.style.opacity = speed > 0.5 ? "1" : "0";
      });

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
    };
  }, []);

  const base: React.CSSProperties = {
    position:      "fixed",
    top:           0,
    left:          0,
    pointerEvents: "none",
    zIndex:        99999,
    borderRadius:  "50%",
    willChange:    "transform",
  };

  return (
    <>
      {/* Sharp dot — snaps to mouse instantly */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width:      6,
          height:     6,
          background: VIOLET_SOLID,
          boxShadow:  `0 0 6px ${VIOLET_SOLID}`,
          transition: "background 0.2s",
        }}
      />

      {/* Lagging ring — stretches with velocity */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width:      RING_SIZE,
          height:     RING_SIZE,
          border:     `1px solid ${VIOLET}0.6)`,
          background: "transparent",
          transition: "width 0.18s, height 0.18s, border-color 0.25s, box-shadow 0.25s",
        }}
      />

      {/* Comet ghost trail */}
      {Array.from({ length: TRAIL_LEN }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRef.current[i] = el; }}
          style={{
            ...base,
            width:      0,
            height:     0,
            border:     `1px solid ${VIOLET}0)`,
            background: "transparent",
            transition: "opacity 0.1s",
          }}
        />
      ))}
    </>
  );
}
