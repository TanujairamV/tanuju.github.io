import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from './FiverrBanner.module.css';

const FiverrBanner = () => {
  return (
    <section className={styles.bannerWrapper}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.a 
          href="https://www.fiverr.com/s/KeQk6rW" 
          target="_blank" 
          rel="noreferrer"
          className={styles.electricCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.innerContent}>
            <h2 className={styles.title}>Need a Freelance Content Writer?</h2>
        <p className={styles.description}>
          I am a passionate content writer and blog article specialist. 
          Are you looking to boost your organic traffic? I deliver clear, engaging, and high-quality SEO-optimized web content and listicles for your website.
        </p>
            
            <div className={styles.linkButton}>
              Hire me on <span className={styles.fiverrLogo}>fiverr.</span> <ExternalLink size={18} />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default FiverrBanner;
