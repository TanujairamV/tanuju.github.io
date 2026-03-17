import { motion } from 'framer-motion';
import ClickSpark from '../components/ClickSpark';
import ScrollVelocity from '../components/ScrollVelocity';
import DecryptedText from '../components/DecryptedText';
import ShinyText from '../components/ShinyText';
import ArchLinuxTerminal from '../components/ArchLinuxTerminal';
import MagneticField from '../components/MagneticField';

const Fun = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '8rem', position: 'relative', background: 'var(--bg-color)', overflowX: 'hidden' }}>
      <ClickSpark color="#8b5cf6" sparkCount={20} />
      
      {/* Interactive Playground Header - At Top */}
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', border: '1px solid var(--glass-border)', borderRadius: '9999px', marginBottom: '2rem', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
            <ShinyText text="Interactive Playground" speed={3} />
          </div>
          <h1 className="title" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', marginBottom: '1.5rem', fontWeight: 900 }}>
            The <span style={{ color: 'var(--accent-color)' }}>FUN</span> Zone
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', marginBottom: '3rem' }}>
            Click anywhere to see sparks. Explore the interactive experiments and technical rices below.
          </p>
          
          <div style={{ 
            fontSize: '1.5rem', 
            marginTop: '2rem', 
            padding: '1.5rem 2.5rem', 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid var(--glass-border)', 
            borderRadius: '1rem', 
            width: 'fit-content',
            maxWidth: '100%',
            margin: '0 auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DecryptedText text="This website took exactly 3 full days to make." speed={30} />
          </div>
        </motion.div>
      </div>

      {/* Ricing & Setup Section */}
      <section style={{ padding: '8rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', width: '100%' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Ricing & System Setup</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            I use Arch Linux btw. Here is a live simulation of my minimal, functional, and clean terminal configuration. 
            (Powered by Catppuccin Mocha & Hyprland).
          </p>
        </div>
        <ArchLinuxTerminal />
      </section>

      {/* Velocity Sections */}
      <div style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <ScrollVelocity 
          texts={['React', 'TypeScript', 'Framer Motion', 'Vite', 'UI/UX']} 
          velocity={3} 
        />
      </div>

      <div style={{ padding: '4rem 0', background: 'rgba(15,23,42,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <ScrollVelocity 
          texts={['Performant', 'Accessible', 'Stunning', 'Interactive']} 
          velocity={-4} 
        />
      </div>

      {/* Magnetic Field Section - New Advanced Version */}
      <section style={{ height: '120vh', position: 'relative', overflow: 'hidden', marginTop: '0' }}>
        <MagneticField />
      </section>

    </div>
  );
};

export default Fun;
