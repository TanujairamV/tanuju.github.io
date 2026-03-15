import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: '#3b82f6' }}>
              <MessageSquare size={32} />
            </div>
          </div>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Let's Talk</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Whether you have a question, a project proposition, or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="mailto:rohansaieswar@gmail.com" 
            style={{ 
              display: 'block',
              width: '100%',
              padding: '1.25rem',
              background: 'var(--accent-color)',
              color: 'white',
              textAlign: 'center',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              textDecoration: 'none',
              marginBottom: '3rem',
              boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.39)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(139, 92, 246, 0.39)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(139, 92, 246, 0.39)';
            }}
          >
            Send an Email
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {[
              { name: 'GitHub', icon: <Github size={20} />, link: 'https://github.com/Rohan-Saieswar' },
              { name: 'LinkedIn', icon: <Linkedin size={20} />, link: 'https://linkedin.com/in/' },
              { name: 'Twitter', icon: <Twitter size={20} />, link: 'https://twitter.com/' },
              { name: 'Fiverr', icon: <Mail size={20} />, link: 'https://www.fiverr.com/s/KeQk6rW' } // Changed icon to represent freelancing message until standard icon exists
            ].map((social) => (
              <a 
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0.75rem',
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
              >
                {social.icon} <span>{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
