import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Projects', 'Experience', 'Contact'];

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          <a href="#" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
            KRS<span className={styles.accent}>.</span>
          </a>

          <nav className={styles.navLinks}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}>
                {item}
              </a>
            ))}
          </nav>

          <div className={styles.socials}>
            <a href="https://github.com/Rohan-Saieswar" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className={styles.socialIcon}>
              <Linkedin size={20} />
            </a>
            <a href="mailto:contact@example.com" className={styles.socialIcon}>
              <Mail size={20} />
            </a>
          </div>

          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileMenu}
          >
            {navItems.map((item, i) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className={styles.mobileLink}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.div 
              className="mt-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}
            >
              <a href="https://github.com/Rohan-Saieswar" target="_blank" rel="noreferrer" className={styles.socialIcon}>
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className={styles.socialIcon}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@example.com" className={styles.socialIcon}>
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
