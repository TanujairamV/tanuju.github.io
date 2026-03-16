import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const location = useLocation();
  const isFunPage = location.pathname.includes('/fun');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!hasMoved && (e.clientX !== 0 || e.clientY !== 0)) {
        setHasMoved(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList?.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, hasMoved]);

  // Disable default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    const iterators = document.querySelectorAll('a, button');
    iterators.forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
      const iterators = document.querySelectorAll('a, button');
      iterators.forEach(el => {
        (el as HTMLElement).style.cursor = 'pointer';
      });
    };
  }, [location.pathname]);

  if (!hasMoved) return null;

  return (
    <div 
      className={`${styles.cursor} ${isFunPage ? styles.cursorFun : ''}`}
      style={{ display: hasMoved ? 'block' : 'none' }}
    >
      <motion.div
        className={styles.cursorDot}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: hasMoved ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={styles.cursorOutline}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering && !isFunPage ? 'white' : 'transparent',
          opacity: hasMoved ? (isHovering && !isFunPage ? 1 : 0.5) : 0
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;
