import { motion } from 'framer-motion';
import ClickSpark from '../components/ClickSpark';
import ScrollVelocity from '../components/ScrollVelocity';
import DecryptedText from '../components/DecryptedText';
import ShinyText from '../components/ShinyText';
import ArchLinuxTerminal from '../components/ArchLinuxTerminal';

const Fun = () => {
  return (
    <div className="section" style={{ minHeight: '200vh', paddingTop: '8rem', position: 'relative', overflowX: 'hidden' }}>
      <ClickSpark color="#8b5cf6" sparkCount={20} />
      
      {/* Background Shape Blur Elements */}
      <div style={{ position: 'fixed', top: '20%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', border: '1px solid var(--glass-border)', borderRadius: '9999px', marginBottom: '2rem', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
            <ShinyText text="Interactive Playground" speed={3} />
          </div>
          <h1 className="title" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem' }}>
            The <span style={{ color: 'var(--accent-color)' }}>FUN</span> Zone
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
            Click anywhere to see sparks. Hover over the text below to decrypt the hidden message. Keep scrolling for more velocity effects.
          </p>
          
          <div style={{ fontSize: '2rem', marginTop: '2rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '1rem' }}>
            <DecryptedText text="This portfolio took exactly 1095 days to perfect." speed={30} />
          </div>
        </motion.div>

        {/* Ricing & Setup Section - New Addition */}
        <section style={{ padding: '8rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Ricing & System Setup</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              I use Arch Linux btw. Here is a live simulation of my minimal, functional, and clean terminal configuration. 
              (Powered by Catppuccin Mocha & Hyprland).
            </p>
          </div>
          <ArchLinuxTerminal />
        </section>
      </div>

      <div style={{ padding: '6rem 0', transform: 'rotate(-2deg)', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <ScrollVelocity 
          texts={['React', 'TypeScript', 'Framer Motion', 'Vite', 'UI/UX']} 
          velocity={3} 
        />
      </div>
      
      <div style={{ padding: '6rem 0', transform: 'rotate(2deg)', marginTop: '-2rem', background: 'rgba(15,23,42,0.5)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <ScrollVelocity 
          texts={['Performant', 'Accessible', 'Stunning', 'Interactive']} 
          velocity={-4} 
        />
      </div>

    </div>
  );
};

export default Fun;
