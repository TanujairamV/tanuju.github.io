import { useEffect, useRef, useState } from 'react';

export default function GlassCursor() {
  const lensRef      = useRef<HTMLDivElement>(null);
  const redRef       = useRef<HTMLDivElement>(null);
  const blueRef      = useRef<HTMLDivElement>(null);
  const specRef      = useRef<HTMLDivElement>(null);
  const rimRef       = useRef<HTMLDivElement>(null);

  const pos          = useRef({ x: -300, y: -300 });
  const curr         = useRef({ x: -300, y: -300 });
  const vel          = useRef({ x: 0, y: 0 });
  const hovering     = useRef(false);
  const raf          = useRef(0);
  const [visible, setVisible] = useState(false);

  const BASE         = 64;
  const HOVER        = 96;
  const LERP         = 0.11;
  const CA_SPREAD    = 3; // chromatic aberration offset px

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      hovering.current = !!el?.closest('a, button, [data-cursor-hover]');
    };
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    let prevX = -300, prevY = -300;

    function loop() {
      const lx = curr.current.x + (pos.current.x - curr.current.x) * LERP;
      const ly = curr.current.y + (pos.current.y - curr.current.y) * LERP;
      vel.current = { x: lx - prevX, y: ly - prevY };
      prevX = lx; prevY = ly;
      curr.current = { x: lx, y: ly };

      const sz   = hovering.current ? HOVER : BASE;
      const half = sz / 2;

      // speed-based chromatic aberration stretch
      const speed  = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const caOff  = Math.min(speed * 0.6, CA_SPREAD);
      const angle  = Math.atan2(vel.current.y, vel.current.x);
      const caDx   = Math.cos(angle) * caOff;
      const caDy   = Math.sin(angle) * caOff;

      const set = (el: HTMLDivElement | null, dx = 0, dy = 0, w = sz, h = sz) => {
        if (!el) return;
        el.style.transform = `translate(${lx - w / 2 + dx}px, ${ly - h / 2 + dy}px)`;
        el.style.width  = `${w}px`;
        el.style.height = `${h}px`;
      };

      // main lens
      set(lensRef.current);

      // chromatic aberration layers — red channel ahead, blue behind
      set(redRef.current,  caDx,  caDy);
      set(blueRef.current, -caDx, -caDy);

      // specular highlight — top-left corner of lens
      if (specRef.current) {
        specRef.current.style.transform =
          `translate(${lx - half + sz * 0.12}px, ${ly - half + sz * 0.1}px)`;
        specRef.current.style.width  = `${sz * 0.38}px`;
        specRef.current.style.height = `${sz * 0.2}px`;
      }

      // outer rim
      const rim = sz + 10;
      set(rimRef.current, 0, 0, rim, rim);

      raf.current = requestAnimationFrame(loop);
    }

    raf.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  if (!visible) return null;

  const base: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    left:          0,
    borderRadius:  '50%',
    pointerEvents: 'none',
    willChange:    'transform, width, height',
    transition:    'width 0.2s ease, height 0.2s ease',
  };

  return (
    <>
      {/* ── Chromatic aberration: red channel ── */}
      <div ref={redRef} style={{
        ...base,
        zIndex:              99996,
        backdropFilter:      'blur(1px)',
        WebkitBackdropFilter:'blur(1px)',
        background:          'rgba(255, 60, 60, 0.045)',
        mixBlendMode:        'screen',
      }} />

      {/* ── Chromatic aberration: blue channel ── */}
      <div ref={blueRef} style={{
        ...base,
        zIndex:              99996,
        backdropFilter:      'blur(1px)',
        WebkitBackdropFilter:'blur(1px)',
        background:          'rgba(60, 80, 255, 0.045)',
        mixBlendMode:        'screen',
      }} />

      {/* ── Main glass lens ── */}
      <div ref={lensRef} style={{
        ...base,
        zIndex:              99997,
        backdropFilter:      'blur(2px) saturate(160%) brightness(1.12) contrast(1.06)',
        WebkitBackdropFilter:'blur(2px) saturate(160%) brightness(1.12) contrast(1.06)',
        background:          'rgba(255, 255, 255, 0.07)',
        border:              '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: `
          inset 0 1.5px 0   rgba(255,255,255,0.35),
          inset 0 -1px  0   rgba(0,0,0,0.2),
          inset 1px 0   0   rgba(255,255,255,0.1),
          inset -1px 0  0   rgba(0,0,0,0.1),
          0 8px 32px rgba(0,0,0,0.3),
          0 2px 8px  rgba(0,0,0,0.2)
        `,
        filter: 'url(#glass-distort)',
      }} />

      {/* ── Specular highlight (top-left shimmer) ── */}
      <div ref={specRef} style={{
        position:      'fixed',
        top:           0,
        left:          0,
        borderRadius:  '50%',
        pointerEvents: 'none',
        zIndex:        99998,
        willChange:    'transform',
        background:    'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.55) 0%, transparent 70%)',
        filter:        'blur(2px)',
        transform:     'rotate(-35deg)',
      }} />

      {/* ── Outer rim ── */}
      <div ref={rimRef} style={{
        ...base,
        zIndex:  99995,
        border:  '0.5px solid rgba(255,255,255,0.12)',
        transition: 'width 0.22s ease, height 0.22s ease',
      }} />

      {/* ── SVG filter: subtle barrel distortion + lens coat ── */}
      <svg width="0" height="0" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <filter id="glass-distort" x="-50%" y="-50%" width="200%" height="200%"
            colorInterpolationFilters="sRGB">
            {/* Subtle radial displacement for barrel distortion */}
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"
              xChannelSelector="R" yChannelSelector="G" result="displaced" />
            {/* Very slight gaussian to soften edges */}
            <feGaussianBlur in="displaced" stdDeviation="0.3" result="blurred" />
            {/* Lens tint: cool blue-white coat */}
            <feColorMatrix in="blurred" type="matrix"
              values="1.02 0    0    0  -0.01
                      0    1.0  0    0   0
                      0    0    1.05 0  -0.01
                      0    0    0    1   0" />
          </filter>
        </defs>
      </svg>
    </>
  );
}