import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ScrollVelocityProps {
  texts: string[];
  velocity?: number;
  className?: string;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({ texts, velocity = 5, className = "" }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden flex whitespace-nowrap flex-nowrap ${className}`} style={{ overflow: 'hidden', display: 'flex', whiteSpace: 'nowrap' }}>
      <motion.div className="flex whitespace-nowrap flex-nowrap uppercase font-bold text-6xl" style={{ x, display: 'flex', gap: '2rem' }}>
        {texts.map((text, i) => (
          <span key={i} className="block mr-8" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'transparent', WebkitTextStroke: '1px var(--glass-border)', paddingRight: '2rem' }}>
            {text}
          </span>
        ))}
        {/* Repeat for seamless loop */}
        {texts.map((text, i) => (
          <span key={`dup-${i}`} className="block mr-8" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'transparent', WebkitTextStroke: '2px var(--glass-border)', paddingRight: '2rem' }}>
            {text}
          </span>
        ))}
        {texts.map((text, i) => (
          <span key={`dup2-${i}`} className="block mr-8" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'transparent', WebkitTextStroke: '2px var(--glass-border)', paddingRight: '2rem' }}>
            {text}
          </span>
        ))}
        {texts.map((text, i) => (
          <span key={`dup3-${i}`} className="block mr-8" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'transparent', WebkitTextStroke: '2px var(--glass-border)', paddingRight: '2rem' }}>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollVelocity;
