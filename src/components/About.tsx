
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient">About Me</h2>
          <p className={styles.subtitle}>A passionate tech enthusiast from India 🇮🇳</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ lineHeight: 1.9, color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center' }}
        >
          <p style={{ marginBottom: '1.5rem' }}>
            Hey! I'm <strong style={{ color: 'var(--text-main)' }}>Konda Rohan Saieswar</strong> — a tech-obsessed Grade 12 student from India 🇮🇳, who recently completed a specialized Computer Science course at <strong style={{ color: 'var(--accent-color)' }}>IITM</strong> via their School Connect program. I live and breathe Linux, automation, and clean code. ⚡
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            My journey started back in 2020 with robotics and electronics 🤖, and since then I've gone deep into the rabbit hole — flashing custom ROMs on phones 📱, installing and ricing Arch Linux on my laptop 🐧, setting up minimal Hyprland environments, and writing scripts that make my machine feel truly mine.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            On the web side, I build fast, modern interfaces using <strong style={{ color: 'var(--text-main)' }}>React, TypeScript, and Vite</strong> — prioritizing clean design and smooth performance. I also offer <strong style={{ color: 'var(--text-main)' }}>SEO & content writing</strong> services on Fiverr 💼, where I'm just getting started on my freelancing journey.
          </p>
          <p>
            When I'm not coding, you'll find me tweaking my dotfiles, exploring new distros, or listening to music 🎵. I believe in learning by doing — and I've got the broken installations to prove it. 😄
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
