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

  const isPlaying = !!(song && song.isPlaying);

  return (
    <a
      href={isPlaying ? song.songUrl : "#"}
      target="_blank"
      rel="noopener noreferrer"
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
          padding: "14px 18px",
          borderRadius: "22px",
          width: "fit-content",
          minWidth: "240px",
          maxWidth: "340px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backdropFilter: "blur(20px)",
          background: isPlaying
            ? "linear-gradient(135deg, rgba(29,185,84,0.2), rgba(0,0,0,0.7))"
            : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.7))",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          boxShadow: isPlaying ? "0 8px 32px rgba(29,185,84,0.2)" : "0 8px 32px rgba(0,0,0,0.3)",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: hover ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
          overflow: "hidden",
        }}
      >
        {/* ALBUM ART */}
        <div style={{ flexShrink: 0, position: "relative", width: 44, height: 44 }}>
          {isPlaying ? (
            <img
              src={song.albumArt}
              width={44}
              height={44}
              alt="Art"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          ) : (
            <div style={{
              width: 44, height: 44, borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.1)", color: "#888"
            }}>♪</div>
          )}
        </div>

        {/* TEXT AREA WITH MARQUEE */}
        <div style={{ 
          flex: 1, 
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}>
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            animation: isPlaying && hover ? "marquee 7s linear infinite" : "none" 
          }}>
            <span style={{ 
              fontWeight: 600, 
              fontSize: "13px", 
              whiteSpace: "nowrap",
              letterSpacing: "0.01em"
            }}>
              {isPlaying ? song.title : "Spotify Idle"}
            </span>
            <span style={{ 
              fontSize: "11px", 
              opacity: 0.6, 
              whiteSpace: "nowrap" 
            }}>
              {isPlaying ? song.artist : "No music playing"}
            </span>
          </div>
        </div>

        {/* WAVEFORM */}
        {isPlaying && (
          <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "14px", marginLeft: "4px" }}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  height: "100%",
                  background: "#1db954",
                  borderRadius: "1px",
                  animation: `wave 1s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <style>
          {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-40%); }
          }
          @keyframes wave {
            0%, 100% { height: 4px; }
            50% { height: 14px; }
          }
        `}
        </style>
      </div>
    </a>
  );
}
