<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/* =========================
   SPOTIFY WIDGET
========================= */
=======
import { useEffect, useState } from "react";
import styles from "./SpotifyWidget.module.css";
>>>>>>> b665557 (Update Spotify Widget with Framer Motion animations)

export default function SpotifyWidget() {
  const [song, setSong] = useState<any>(null);

  async function getNowPlaying() {
    try {
      const res = await fetch("/.netlify/functions/now-playing");
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

<<<<<<< HEAD
  const isPlaying = song && song.isPlaying;
=======
  const isPlaying = !!(song && song.isPlaying);
  const isRecentlyPlayed = !!(song && song.isRecentlyPlayed);
  const hasData = isPlaying || isRecentlyPlayed;
>>>>>>> b665557 (Update Spotify Widget with Framer Motion animations)

  return (
    <a
      href={hasData ? song.songUrl : "#"}
      target="_blank"
      rel="noopener noreferrer"
<<<<<<< HEAD
      style={{ textDecoration: "none" }}
    >
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,

          padding: hover ? "18px" : "14px",
          paddingRight: isPlaying ? "56px" : "18px",

          borderRadius: "22px",

          // 🔥 AUTO WIDTH
          width: "fit-content",
          minWidth: "260px",
          maxWidth: hover ? "420px" : "360px",

          display: "flex",
          flexDirection: "column",
          gap: "12px",

          backdropFilter: "blur(18px)",
          background: isPlaying
            ? "linear-gradient(135deg, rgba(29,185,84,0.15), rgba(0,0,0,0.6))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.6))",

          border: "1px solid rgba(255,255,255,0.08)",

          boxShadow: isPlaying
            ? "0 0 40px rgba(29,185,84,0.35)"
            : "0 0 25px rgba(255,255,255,0.05)",

          color: "white",

          transition: "all 0.35s ease",
          transform: hover ? "scale(1.03)" : "scale(1)",

          overflow: "hidden",
        }}
      >
        {/* TOP */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* ICON */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            {isPlaying ? (
              <img
                src={song.albumArt}
                width={52}
                height={52}
                alt="Album Art"
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
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
                  background: "rgba(255,255,255,0.05)",
                  color: "#aaa",
                  fontSize: "18px",
                }}
              >
                ♪
              </div>
            )}
          </div>

          {/* TEXT */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {isPlaying ? (
              <>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {song.title}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    opacity: 0.6,
                    maxWidth: "260px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {song.artist}
                </span>
              </>
            ) : (
              <>
                <span style={{ fontWeight: 600, fontSize: "14px" }}>
                  Spotify Idle
                </span>
                <span style={{ fontSize: "11px", opacity: 0.5 }}>
                  No music playing
                </span>
              </>
            )}
          </div>

          {/* WAVEFORM */}
          {isPlaying && (
            <div style={{ display: "flex", gap: "3px", marginLeft: "auto" }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: "12px",
                    background: "#1db954",
                    borderRadius: "2px",
                    animation: `wave 1s infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 🎚 SLIDER */}
        {isPlaying && (
          <ElasticSlider
            defaultValue={50}
            startingValue={0}
            maxValue={100}
            className="w-full"
            leftIcon={<span style={{ fontSize: "12px" }}>🎵</span>}
            rightIcon={<span style={{ fontSize: "12px" }}>🔊</span>}
          />
        )}

        {/* IDLE FOOTER */}
        {!isPlaying && (
          <div
            style={{
              textAlign: "center",
              fontSize: "11px",
              opacity: 0.4,
            }}
          >
            🎧 waiting for your next vibe...
          </div>
        )}

        <style>
          {`
          @keyframes wave {
            0% { height: 4px; }
            50% { height: 14px; }
            100% { height: 4px; }
          }
        `}
        </style>
=======
      className={`${styles.spotifyWidgetContainer} ${isPlaying ? styles.playing : ""}`}
    >
      <div className={styles.spotifyWidget}>
        {/* ART / ICON CONTAINER */}
        {hasData ? (
          <img
            src={song.albumImageUrl}
            alt="Album Art"
            className={styles.albumArt}
          />
        ) : (
          <div className={styles.placeholderIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        )}

        {/* SONG INFO */}
        {hasData ? (
          <div className={styles.trackInfo}>
            <div className={styles.label}>
              {isPlaying ? "Now Playing" : "Last Played"}
            </div>
            <div className={styles.trackName}>{song.title}</div>
            <div className={styles.artistName}>{song.artist}</div>
          </div>
        ) : (
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>Not Playing</div>
            <div className={styles.artistName}>Spotify</div>
          </div>
        )}

        {/* PLAYING INDICATOR */}
        {isPlaying && (
          <div className={styles.playingBars}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        )}
>>>>>>> b665557 (Update Spotify Widget with Framer Motion animations)
      </div>
    </a>
  );
}
<<<<<<< HEAD

/* =========================
   ELASTIC SLIDER (TYPED FOR TS)
========================= */

interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ElasticSlider = ({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = "",
  leftIcon = <>-</>,
  rightIcon = <>+</>,
}: ElasticSliderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-full ${className}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    </div>
  );
};

interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
}

const Slider = ({
  defaultValue,
  startingValue,
  maxValue,
  leftIcon,
  rightIcon,
}: SliderProps) => {
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
    <motion.div className="flex w-full items-center gap-4">
      {leftIcon}

      <div
        ref={sliderRef}
        className="relative flex w-full items-center py-2 cursor-pointer"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerMove} // Allows clicking to jump
      >
        <motion.div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${(value / maxValue) * 100}%` }}
          />
        </motion.div>
      </div>

      {rightIcon}
    </motion.div>
  );
};
=======
>>>>>>> b665557 (Update Spotify Widget with Framer Motion animations)
