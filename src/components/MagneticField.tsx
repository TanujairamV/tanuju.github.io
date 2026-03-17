import { useEffect, useRef, useCallback } from "react";

const SPACING = 20; // Slightly increased density for "filled" look
const LERP_ARROW = 0.09;

function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return a + d * t;
}

function fieldAngle(
  ax: number, ay: number,
  px: number, py: number,
  sx: number, sy: number
): number {
  const dx1 = ax - px, dy1 = ay - py;
  const dx2 = ax - sx, dy2 = ay - sy;
  const r1sq = dx1 * dx1 + dy1 * dy1 + 1;
  const r2sq = dx2 * dx2 + dy2 * dy2 + 1;
  return Math.atan2(
    dy1 / r1sq - dy2 / r2sq,
    dx1 / r1sq - dx2 / r2sq
  );
}

interface Arrow {
  x: number;
  y: number;
  angle: number;
}

function buildGrid(W: number, H: number): Arrow[] {
  const cols = Math.ceil(W / SPACING);
  const rows = Math.ceil(H / SPACING);
  const arr: Arrow[] = [];
  for (let r = 0; r <= rows; r++)
    for (let c = 0; c <= cols; c++)
      arr.push({
        x: c * SPACING + SPACING / 2,
        y: r * SPACING + SPACING / 2,
        angle: Math.random() * Math.PI * 2,
      });
  return arr;
}

interface State {
  mxV: number; myV: number;      // mouse in Viewport coordinates
  px: number; py: number;        // N pole (local to canvas)
  sx: number; sy: number;        // S pole (local to canvas)
  rx: number; ry: number;        // ring lag (now integrated into local state)
  inPage: boolean;
  grid: Arrow[];
  W: number; H: number;
}

export default function MagneticField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const stateRef  = useRef<State>({
    mxV: 0, myV: 0,
    px: 0, py: 0,
    sx: 0, sy: 0,
    rx: 0, ry: 0,
    inPage: false,
    grid: [],
    W: 0, H: 0,
  });

  const initGrid = useCallback(() => {
    const s = stateRef.current;
    const container = containerRef.current;
    if (!container) return;
    
    s.W = container.clientWidth;
    s.H = container.clientHeight;
    
    if (!s.px) { s.px = s.W / 2; s.py = s.H / 2; }
    if (!s.sx) { s.sx = s.W / 2; s.sy = s.H / 2; }
    if (!s.rx) { s.rx = s.W / 2; s.ry = s.H / 2; }
    
    s.grid = buildGrid(s.W, s.H);
    if (canvasRef.current) {
      canvasRef.current.width  = s.W;
      canvasRef.current.height = s.H;
    }
  }, []);

  useEffect(() => {
    initGrid();

    const handleMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.mxV = e.clientX;
      s.myV = e.clientY;
      s.inPage = true;
    };

    const handleLeave = () => { stateRef.current.inPage = false; };
    const handleResize = () => { initGrid(); };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    // ── Render loop ──
    let lastT = 0;
    let rafId = 0;

    function loop(t: number) {
      const dt = Math.min((t - lastT) / 16, 3);
      lastT = t;
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!canvas) { rafId = requestAnimationFrame(loop); return; }
      const ctx = canvas.getContext("2d");
      if (!ctx) { rafId = requestAnimationFrame(loop); return; }

      // Map viewport mouse to local canvas coordinates
      const rect = canvas.getBoundingClientRect();
      const localMX = s.mxV - rect.left;
      const localMY = s.myV - rect.top;

      // Handle interactive vs idle
      if (s.inPage) {
        // N pole follows local mouse
        s.px = localMX;
        s.py = localMY;
      } else {
        // Idle orbit in local coordinates
        const now = t / 1000;
        const tx = s.W / 2 + Math.cos(now * 0.31) * s.W * 0.25;
        const ty = s.H / 2 + Math.sin(now * 0.58) * s.H * 0.22;
        s.px += (tx - s.px) * 0.02 * dt;
        s.py += (ty - s.py) * 0.02 * dt;
      }

      // S pole chases N pole
      s.sx += (s.px - s.sx) * 0.028 * dt;
      s.sy += (s.py - s.sy) * 0.028 * dt;

      // Local ring chases local mouse (if we wanted a local ring, but dotRef/ringRef are usually fixed)
      // Since dotRef/ringRef in this version are meant to show on the canvas:
      if (dotRef.current) {
        dotRef.current.style.left = s.px + "px";
        dotRef.current.style.top  = s.py + "px";
      }
      if (ringRef.current) {
        s.rx += (localMX - s.rx) * 0.11 * dt;
        s.ry += (localMY - s.ry) * 0.11 * dt;
        ringRef.current.style.left = s.rx + "px";
        ringRef.current.style.top  = s.ry + "px";
      }

      ctx.clearRect(0, 0, s.W, s.H);

      // ── Draw pipes ──
      const PIPE_W  = 1.5;
      const PIPE_H  = 10;
      const PIPE_R  = 1;

      for (const ar of s.grid) {
        const target = fieldAngle(ar.x, ar.y, s.px, s.py, s.sx, s.sy);
        ar.angle = lerpAngle(ar.angle, target, LERP_ARROW * dt);

        const d1     = Math.hypot(ar.x - s.px, ar.y - s.py);
        const d2     = Math.hypot(ar.x - s.sx, ar.y - s.sy);
        const nearest = Math.min(d1, d2);
        const prox   = Math.max(0, 1 - nearest / 320);
        const t01    = d1 / (d1 + d2 + 0.001);

        const r = Math.round(167 + (230 - 167) * t01);
        const g = Math.round(139 + ( 90 - 139) * t01);
        const b = Math.round(250 + ( 30 - 250) * t01);
        const alpha = 0.06 + prox * 0.75;
        const h     = PIPE_H + prox * 10;

        ctx.save();
        ctx.translate(ar.x, ar.y);
        ctx.rotate(ar.angle + Math.PI / 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;

        const x = -PIPE_W / 2;
        const y = -h / 2;
        const w = PIPE_W;
        ctx.beginPath();
        ctx.moveTo(x + PIPE_R, y);
        ctx.lineTo(x + w - PIPE_R, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + PIPE_R);
        ctx.lineTo(x + w, y + h - PIPE_R);
        ctx.quadraticCurveTo(x + w, y + h, x + w - PIPE_R, y + h);
        ctx.lineTo(x + PIPE_R, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - PIPE_R);
        ctx.lineTo(x, y + PIPE_R);
        ctx.quadraticCurveTo(x, y, x + PIPE_R, y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // ── Glows ──
      const g1 = ctx.createRadialGradient(s.px, s.py, 0, s.px, s.py, 80);
      g1.addColorStop(0, "rgba(167,139,250,0.25)");
      g1.addColorStop(1, "rgba(167,139,250,0)");
      ctx.beginPath();
      ctx.arc(s.px, s.py, 80, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      const sep = Math.hypot(s.px - s.sx, s.py - s.sy);
      if (sep > 8) {
        const g2 = ctx.createRadialGradient(s.sx, s.sy, 0, s.sx, s.sy, 60);
        g2.addColorStop(0, "rgba(220,100,40,0.18)");
        g2.addColorStop(1, "rgba(220,100,40,0)");
        ctx.beginPath();
        ctx.arc(s.sx, s.sy, 60, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [initGrid]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#0d0205",
        overflow: "hidden",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {/* Atmosphere blobs */}
      <div style={{
        position: "absolute", borderRadius: "50%",
        width: 520, height: 420, top: -80, left: -60,
        background: "radial-gradient(ellipse, rgba(120,28,18,.72) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%",
        width: 460, height: 380, top: 0, right: -80,
        background: "radial-gradient(ellipse, rgba(90,18,12,.6) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%",
        width: 600, height: 500,
        top: "50%", left: "50%",
        transform: "translate(-50%,-52%)",
        background: "radial-gradient(ellipse, rgba(30,14,8,.95) 0%, rgba(20,8,4,.5) 50%, transparent 72%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", borderRadius: "50%",
        width: 380, height: 300, bottom: -60, left: "20%",
        background: "radial-gradient(ellipse, rgba(100,22,10,.5) 0%, transparent 70%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />

      {/* Field canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Center text */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 14, pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(28px, 4.5vw, 64px)",
          fontWeight: 800,
          color: "rgba(215,200,195,0.82)",
          letterSpacing: "-0.02em",
          textAlign: "center",
          lineHeight: 1.1,
        }}>
          Magnetic Field Simulation
        </h1>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(11px, 1.1vw, 14px)",
          fontWeight: 300,
          color: "rgba(180,155,148,0.45)",
          letterSpacing: "0.18em",
          textAlign: "center",
        }}>
          — move your cursor across the grid —
        </p>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent 0%, #c0440a 30%, #e8640d 50%, #c0440a 70%, transparent 100%)",
      }} />

      {/* Internal cursor elements (relative to canvas) */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          width: 6, height: 6,
          background: "#7b8fef",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0.8,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          width: 28, height: 28,
          border: "1.2px solid rgba(100,130,240,0.7)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
