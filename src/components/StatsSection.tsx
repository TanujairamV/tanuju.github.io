import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Monitor, Zap, Star, Coffee, Award, Users } from 'lucide-react';

const initialStats = [
  { value: '5+', label: 'OS Distros Tested', icon: <Monitor size={28} /> },
  { value: '10+', label: 'Custom ROMs Flashed', icon: <Terminal size={28} /> },
  { value: '2026', label: 'Freelancing Started', icon: <Star size={28} /> },
  { value: '∞', label: 'Coffee Fuelled', icon: <Coffee size={28} /> },
  { value: 'IITM', label: 'School Connect Certified', icon: <Award size={28} /> },
  { value: '100%', label: 'Passion for Tech', icon: <Zap size={28} /> },
  { value: '3+', label: 'Years of Experience', icon: <Code2 size={28} /> },
];

const StatsSection = () => {
  const [visitorCount, setVisitorCount] = useState<string>('...');

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/rohan-portfolio/visitors')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setVisitorCount(data.count.toLocaleString() + '+');
        } else {
          setVisitorCount('100+');
        }
      })
      .catch(err => {
        console.error('Error fetching visitor count:', err);
        setVisitorCount('100+');
      });
  }, []);

  const stats = [
    ...initialStats,
    { value: visitorCount, label: 'Total Visitors', icon: <Users size={28} /> },
  ];

  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '40vh', background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'inline-block', padding: '0.4rem 1.25rem', border: '1px solid var(--glass-border)', borderRadius: '9999px', marginBottom: '1.5rem', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            By the Numbers
          </div>
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>My Journey in Stats</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>A few numbers that tell my story better than words.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
        }} className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="glass"
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '1.25rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div style={{ color: 'var(--accent-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
