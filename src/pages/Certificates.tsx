import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Code, Database, Layout, X } from 'lucide-react';
import styles from './Certificates.module.css';

const certificatesData = [
  {
    title: 'Computer Science – School Connect',
    issuer: 'IITM',
    date: '2024 - 2025',
    icon: <Award size={32} />,
    color: '#a78bfa',
    certificate: true
  },
  {
    title: 'Advanced React patterns',
    issuer: 'Frontend Masters',
    date: '2025',
    icon: <Code size={32} />,
    color: '#3b82f6'
  },
  {
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2024',
    icon: <Database size={32} />,
    color: '#f59e0b'
  },
  {
    title: 'UI/UX Specialization',
    issuer: 'Google via Coursera',
    date: '2023',
    icon: <Layout size={32} />,
    color: '#10b981'
  },
  {
    title: 'Full-Stack Engineering',
    issuer: 'Codecademy',
    date: '2023',
    icon: <Award size={32} />,
    color: '#8b5cf6'
  }
];

const GlassCard = ({ cert, index, onOpenCert }: { cert: any, index: number, onOpenCert: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Create spring-like rotation based on mouse position
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <motion.div
      className={styles.glassCardContainer}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        className={styles.glassCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div 
          className={styles.iconWrapper} 
          style={{ 
            color: cert.color, 
            background: `${cert.color}22`,
            border: `1px solid ${cert.color}55`,
            transform: "translateZ(50px)" 
          }}
        >
          {cert.icon}
        </div>
        <div style={{ transform: "translateZ(30px)", marginTop: '1rem', width: '100%' }}>
          <h3 className={styles.certTitle}>{cert.title}</h3>
          <p className={styles.certIssuer}>{cert.issuer}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <span className={styles.certDate}>{cert.date}</span>
            {cert.certificate && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCert();
                }}
                style={{
                  background: 'rgba(167, 139, 250, 0.2)',
                  border: '1px solid rgba(167, 139, 250, 0.4)',
                  borderRadius: '6px',
                  color: '#a78bfa',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(167, 139, 250, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(167, 139, 250, 0.2)'}
              >
                View
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const [certOpen, setCertOpen] = useState(false);

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem', overflowX: 'hidden' }}>
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className={styles.header}
        >
          <h1 className="text-gradient">Professional Certificates</h1>
          <p style={{ color: 'var(--text-muted)' }}>My certifications, credentials, and continuous learning achievements.</p>
        </motion.div>

        <div className={styles.grid}>
          {certificatesData.map((cert, index) => (
            <GlassCard key={cert.title} cert={cert} index={index} onOpenCert={() => setCertOpen(true)} />
          ))}
        </div>
      </div>

      {/* Certificate Modal Overlay */}
      <AnimatePresence>
        {certOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999, // Below custom cursor (1000000)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1000px',
                background: '#0a0a0a',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 80px rgba(0,0,0,0.8)'
              }}
            >
              {/* Header */}
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    🎓 IITM — School Connect Program
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    Certificate of completion · 2024 — 2025
                  </p>
                </div>
                <button 
                  onClick={() => setCertOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Certificate Image Area */}
              <div style={{ padding: '2rem', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <img 
                  src="/iitm-certificate.jpg" 
                  alt="IITM Certificate"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const placeholder = document.createElement('div');
                      placeholder.style.textAlign = 'center';
                      placeholder.innerHTML = `
                        <div style="font-size: 3rem; margin-bottom: 1rem; color: #a78bfa">🎓</div>
                        <h3 style="color: var(--text-main); margin-bottom: 0.5rem">Certificate image coming soon</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem">Drop the image in /public/iitm-certificate.jpg to display it here</p>
                      `;
                      parent.appendChild(placeholder);
                    }
                  }}
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
