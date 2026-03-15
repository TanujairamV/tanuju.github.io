import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ClickSpark = ({ color = "var(--accent-color)", sparkCount = 12 }) => {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  let clickCount = 0;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      clickCount += 1;
      setSparks((prev) => [...prev, { id: clickCount, x: e.clientX, y: e.clientY }]);
      
      // Remove sparks after animation
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== clickCount));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {sparks.map((spark) => (
        <div 
          key={spark.id} 
          style={{ position: 'fixed', left: spark.x, top: spark.y, pointerEvents: 'none', zIndex: 9999 }}
        >
          {Array.from({ length: sparkCount }).map((_, i) => {
            const angle = (i * 360) / sparkCount;
            const radius = 60;
            const destX = Math.cos((angle * Math.PI) / 180) * radius;
            const destY = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: destX,
                  y: destY,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default ClickSpark;
