/* ... existing imports ... */

export default function SpotifyWidget() {
  /* ... existing state and useEffect ... */

  const isPlaying = song && song.isPlaying;

  return (
    <a href={isPlaying ? song.songUrl : "#"} target="_blank" rel="noopener noreferrer">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          /* ... existing styles ... */
          position: "fixed",
          bottom: "28px",
          right: "28px",
          padding: "16px",
          borderRadius: "24px",
          width: "320px", // Fixed base width to keep it consistent
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backdropFilter: "blur(18px)",
          background: isPlaying
            ? "linear-gradient(135deg, rgba(29,185,84,0.15), rgba(0,0,0,0.6))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.6))",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "white",
          overflow: "hidden", // Crucial for marquee
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* IMAGE */}
          <div style={{ flexShrink: 0 }}>
             {/* ... album art img ... */}
          </div>

          {/* MARQUEE TEXT CONTAINER */}
          <div style={{ 
            flex: 1, 
            overflow: "hidden", 
            display: "flex", 
            flexDirection: "column",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" // Fades edges
          }}>
            {isPlaying ? (
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                // This makes the text slide if it's long
                animation: hover ? "marquee 8s linear infinite" : "none" 
              }}>
                <span style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}>
                  {song.title}
                </span>
                <span style={{
                  fontSize: "11px",
                  opacity: 0.7,
                  whiteSpace: "nowrap"
                }}>
                  {song.artist}
                </span>
              </div>
            ) : (
              /* ... Idle Text ... */
            )}
          </div>

          {/* WAVEFORM */}
          {/* ... existing waveform code ... */}
        </div>

        {/* SLIDER */}
        {/* ... existing slider code ... */}

        <style>
          {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); } 
          }
          
          @keyframes wave {
            0% { height: 6px; }
            50% { height: 16px; }
            100% { height: 6px; }
          }
        `}
        </style>
      </div>
    </a>
  );
}
