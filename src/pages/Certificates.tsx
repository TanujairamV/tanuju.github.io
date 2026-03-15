import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Award, Code, Database, Layout } from 'lucide-react';
import styles from './Certificates.module.css';

const certificatesData = [
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

const GlassCard = ({ cert, index }: { cert: any, index: number }) => {
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
        <div style={{ transform: "translateZ(30px)", marginTop: '1rem' }}>
          <h3 className={styles.certTitle}>{cert.title}</h3>
          <p className={styles.certIssuer}>{cert.issuer}</p>
          <span className={styles.certDate}>{cert.date}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
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
            <GlassCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
