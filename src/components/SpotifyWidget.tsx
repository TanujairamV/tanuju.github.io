import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/* =========================
   SPOTIFY WIDGET - APPLE GLASS EDITION
========================= */

export default function SpotifyWidget() {
  const [song, setSong] = useState<any>(null);
  const [hover, setHover] = useState(false);

  async function getNowPlaying() {
    try {
      const res = await fetch("https://project-o0epg.vercel.app/api/now-playing");
      const data = await res.json();
      setSong(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getNowPlaying();
    const interval = setInterval(getNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  const isPlaying = song && song.isPlaying;

  return (
    <a
      href={isPlaying ? song.songUrl : "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 9999,
          padding: "16px",
          borderRadius: "24px", // Apple-style continuous curves
          width: "fit-content",
          minWidth: "280px",
          maxWidth: "340px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          
          // APPLE GLASSMORPHISM EFFECT
          background: "rgba(20, 20, 20, 0.4)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          
          color: "#FAFAFA",
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          transform: hover ? "translateY(-4px) scale(1.02)" : "none",
          overflow: "hidden",
        }}
      >
        {/* TOP ROW: Album Art & Text */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* ARTWORK */}
          <div style={{ flexShrink: 0 }}>
            {isPlaying ? (
              <img
                src={song.albumArt}
                width={52}
                height={52}
                alt="Album Art"
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 11.5V6H14.5V9H17V6V5.5C17 4.67 16.33 4 15.5 4H12H11.5C10.67 4 10 4.67 10 5.5V6H9.5C8.67 6 8 6.67 8 7.5V11H7.5C6.67 11 6 11.67 6 12.5C6 13.33 6.67 14 7.5 14H10H10.5C11.33 14 12 13.33 12 12.5V11.5Z"/>
                </svg>
              </div>
            )}
          </div>

          {/* TEXT */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "-0.3px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isPlaying ? song.title : "Not Playing"}
            </span>
            <span
              style={{
                fontSize: "13px",
                opacity: 0.6,
                letterSpacing: "-0.1px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {isPlaying ? song.artist : "Spotify"}
            </span>
          </div>

          {/* iOS STYLE WAVEFORM */}
          {isPlaying && (
            <div style={{ display: "flex", gap: "2px", alignItems: "center", height: "16px", paddingLeft: "8px" }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: "100%",
                    background: "#fff", // White instead of green for Apple look
                    borderRadius: "2px",
                    animation: `iosWave 1.2s infinite ease-in-out ${i * 0.15}s`,
                    opacity: 0.8,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM ROW: SLIDER */}
        {isPlaying && (
          <div style={{ width: "100%", padding: "0 4px" }}>
            <Slider defaultValue={30} startingValue={0} maxValue={100} />
          </div>
        )}

        <style>
          {`
          @keyframes iosWave {
            0%, 100% { height: 4px; }
            50% { height: 16px; }
          }
        `}
        </style>
      </div>
    </a>
  );
}

/* =========================
   PURE INLINE ELASTIC SLIDER
========================= */

interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
}

const Slider = ({ defaultValue, startingValue, maxValue }: SliderProps) => {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const clientX = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue =
        startingValue +
        ((e.clientX - left) / width) * (maxValue - startingValue);

      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  };

  return (
    <div
      ref={sliderRef}
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: "6px 0",
        cursor: "pointer",
      }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
    >
      {/* Track Background */}
      <motion.div
        style={{
          width: "100%",
          height: "6px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        {/* Track Fill */}
        <div
          style={{
            height: "100%",
            background: "#fff", // Apple white fill
            width: `${(value / maxValue) * 100}%`,
            transition: "width 0.1s ease-out",
          }}
        />
      </motion.div>
    </div>
  );
};
