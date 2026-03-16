
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import RotatingText from './RotatingText';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.heroContent}`}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.greeting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.badge}>Available for work</span>
            <span className={styles.hiText}>Hi, I'm</span>
          </motion.div>
          
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Konda Rohan Saieswar<span style={{ color: 'var(--accent-color)' }}>.</span>
          </motion.h1>
          
          <motion.h2 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Building 
            <RotatingText
              texts={['digital products', 'modern web apps', 'robust interfaces', 'experiences']}
              mainClassName={styles.rotatingTextContainer}
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName={styles.rotatingTextSplit}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </motion.h2>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            A passionate Grade 12 student specializing in building exceptional digital experiences. Currently focused on creating accessible, human-centered products.
          </motion.p>
          
          <motion.div 
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight className={styles.icon} size={18} />
            </a>
            <a href="/resume.pdf" target="_blank" className="btn btn-secondary">
              Resume <Download className={styles.icon} size={18} />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.visualContent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.glowOverlay}></div>
            <div className={styles.profilePlaceholder}>
              <img src="/favicon.png" alt="Icon" className={styles.heroBirdIcon} />
              <span className={styles.initials}>KRS.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
