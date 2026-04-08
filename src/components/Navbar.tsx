import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import ShinyText from './ShinyText';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface NavItem {
    name: string;
    path: string;
    isHash?: boolean;
  }

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education', path: '/education' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Fun', path: '/fun' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="islandWrapper">
        <motion.div
          className="island"
          layout
          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        >
          <a href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/favicon.png" alt="Logo" className="logoIcon" />
            <ShinyText text="KRS." speed={2.5} shineColor="#3b82f6" />
          </a>

          <nav className="navLinks">
            {navItems.map((item) =>
              item.isHash && !isHome ? (
                <a key={item.name} href={item.path} className="navLink">
                  <ShinyText text={item.name} speed={3} pauseOnHover />
                </a>
              ) : (
                <Link key={item.name} to={item.path} className="navLink">
                  <ShinyText text={item.name} speed={3} pauseOnHover />
                </Link>
              )
            )}
          </nav>

          <div className="socials">
            <a href="https://github.com/Rohan-Saieswar" target="_blank" rel="noreferrer" className="socialIcon" aria-label="GitHub">
              <Github size={19} />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="socialIcon" aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a href="mailto:rohansaieswar@gmail.com" className="socialIcon" aria-label="Email">
              <Mail size={19} />
            </a>
          </div>

          <button
            className="mobileMenuBtn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="hamburger"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 },
                }}
                transition={{ duration: 0.25 }}
                className="bar"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, scaleX: 1 },
                  open: { opacity: 0, scaleX: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="bar"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 },
                }}
                transition={{ duration: 0.25 }}
                className="bar"
              />
            </motion.div>
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobileMenu"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <nav className="mobileNav">
              {navItems.map((item, i) =>
                item.isHash && !isHome ? (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    className="mobileLink"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.055 }}
                  >
                    <ShinyText text={item.name} speed={3} />
                  </motion.a>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.055 }}
                  >
                    <Link
                      to={item.path}
                      className="mobileLink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShinyText text={item.name} speed={3} />
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.div
              className="mobileSocials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
            >
              <a href="https://github.com/Rohan-Saieswar" target="_blank" rel="noreferrer" className="socialIcon" aria-label="GitHub">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="socialIcon" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="mailto:rohansaieswar@gmail.com" className="socialIcon" aria-label="Email">
                <Mail size={22} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;