import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { emoji: '👋', text: 'Thanks for visiting my portfolio!' },
  { emoji: '⚡', text: 'Powered by React + Framer Motion' },
  { emoji: '🐧', text: 'I use Arch Linux, btw.' },
  { emoji: '💼', text: 'Available for freelance work on Fiverr!' },
  { emoji: '🎵', text: 'Music on, code on.' },
  { emoji: '🚀', text: 'Always learning, always building.' },
  { emoji: '✨', text: 'Glad you\'re here — have a look around!' },
];

const DynamicIsland = () => {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Show first one after 3s, then every 8s
    const show = () => {
      setMsgIndex(i => (i + 1) % messages.length);
      setVisible(true);
      setExpanded(false);

      // Auto-dismiss after 4s
      setTimeout(() => setVisible(false), 4000);
    };

    const initial = setTimeout(show, 3000);
    const interval = setInterval(show, 8000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  const msg = messages[msgIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={msgIndex}
          initial={{ y: -80, opacity: 0, x: '-50%', scaleX: 0.8 }}
          animate={{ y: 0, opacity: 1, x: '-50%', scaleX: 1 }}
          exit={{ y: -80, opacity: 0, x: '-50%', scaleX: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={() => setExpanded(e => !e)}
          style={{
            position: 'fixed',
            top: '6rem', // Clear the header
            left: '50%',
            zIndex: 99998,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <motion.div
            animate={{ 
              width: expanded ? 'max-content' : 240, 
              minWidth: expanded ? 320 : 240
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '9999px',
              padding: '0.65rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{msg.emoji}</span>
            <motion.span
              key={msgIndex}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.95)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                overflow: 'hidden',
                textOverflow: expanded ? 'clip' : 'ellipsis',
              }}
            >
              {msg.text}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DynamicIsland;
