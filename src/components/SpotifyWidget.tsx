import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2 } from 'lucide-react';
import styles from './SpotifyWidget.module.css';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl?: string;
}

const SpotifyWidget = () => {
  const [data, setData] = useState<SpotifyData>({
    isPlaying: false,
    title: 'Not playing',
    artist: 'Spotify',
    songUrl: 'https://open.spotify.com/user/31jvlqqvdmeux47mctirqusrxuki'
  });

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/.netlify/functions/now-playing');
        
        // Handle non-JSON responses (like 404 HTML fallbacks in dev)
        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server');
        }

        const songData = await response.json();
        
        if (songData.isPlaying) {
          setData({
            isPlaying: true,
            title: songData.title,
            artist: songData.artist,
            songUrl: songData.songUrl,
            albumImageUrl: songData.albumImageUrl
          });
        } else {
          setData(prev => ({
            ...prev,
            isPlaying: false,
            title: 'Not playing',
            artist: 'Spotify'
          }));
        }
      } catch (error) {
        // Silent catch to prevent console flooding
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.a 
        href={data.songUrl !== '#' ? data.songUrl : undefined}
        target="_blank"
        rel="noreferrer"
        className={styles.spotifyWidget}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
      >
        <div className={styles.iconWrapper}>
          {data.isPlaying ? (
            <div className={styles.playingBars}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
          ) : (
            <Music2 size={20} />
          )}
        </div>
        
        <div className={styles.trackInfo}>
          <span className={styles.trackName}>{data.title}</span>
          <span className={styles.artistName}>{data.artist}</span>
        </div>
      </motion.a>
    </AnimatePresence>
  );
};

export default SpotifyWidget;
