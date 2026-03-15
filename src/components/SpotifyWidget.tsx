import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2 } from 'lucide-react';
import styles from './SpotifyWidget.module.css';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
}

const SpotifyWidget = () => {
  const [data] = useState<SpotifyData>({
    isPlaying: true, // Show bars animating to imply activity
    title: 'Listen with me',
    artist: 'Follow me on Spotify',
    songUrl: 'https://open.spotify.com/user/31jvlqqvdmeux47mctirqusrxuki'
  });

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
