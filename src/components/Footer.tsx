
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import styles from './Footer.module.css';
import VisitorCount from './VisitorCount';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <a href="#" className={styles.logo}>
                <img src="/favicon.png" alt="Logo" className={styles.footerLogoIcon} />
                KRS.<span className="accent-color"></span>
              </a>
              <p className={styles.tagline}>
                Building digital experiences with passion and purpose.
              </p>
            </div>
            
            <div className={styles.socials}>
              <a href="https://github.com/Rohan-Saieswar" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@example.com" className={styles.socialIcon} aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className={styles.bottom}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Konda Rohan Saieswar. All rights reserved.
            </p>
            <p className={styles.madeWith}>
              Designed & Built with <Heart size={14} className={styles.heart} />
            </p>
            <VisitorCount />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
