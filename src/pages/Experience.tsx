import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Server, Cpu, X, Award } from 'lucide-react';
import { useState } from 'react';

const experiences = [
  {
    role: "Freelance SEO & Content Writer",
    company: "Fiverr",
    period: "2026 - Present",
    description: "Started my focus on freelancing on Fiverr, offering SEO and content writing services. Continuously expanding my skill set and service offerings to grow my freelance career.",
    tags: ["SEO", "Content Writing", "Freelance", "Fiverr"],
    icon: <Terminal size={20} />,
    link: 'https://www.fiverr.com/s/KeQk6rW',
  },
  {
    role: "Linux & OS Testing",
    company: "Personal Devices",
    period: "2025 - 2026",
    description: "Extensive installation and testing of various operating systems. Laptops: NixOS, macOS, Arch Linux, Ubuntu, Windows 11 (on Win 10 hardware). Mobile: Lunaris AOSP, Axion AOSP, Pixel OS, MIUI.",
    tags: ["Linux", "Arch", "NixOS", "Custom ROMs"],
    icon: <Server size={20} />
  },
  {
    role: "Computer Science – School Connect",
    company: "IITM",
    period: "2024 - 2025",
    description: "Successfully completed the specialized School Connect program by IITM, focusing on foundational Computer Science and high-level technical concepts.",
    tags: ["Computer Science", "Academics", "IITM"],
    icon: <Code size={20} />,
    certificate: true,
  },
  {
    role: "Electrobotics Class",
    company: "Academic Project",
    period: "2020 - 2021",
    description: "Participated in specialized electrobotics classes, gaining hands-on experience with electronics and fundamental robotics concepts.",
    tags: ["Robotics", "Electronics", "Hardware"],
    icon: <Terminal size={20} />
  }
];

type Experience = typeof experiences[0];
type ExperienceWithMetadata = Experience & { certificate?: boolean; link?: string };

const skills = [
  {
    icon: <Code size={32} />,
    title: 'Web Development',
    description: 'Building responsive, performant websites using React, TypeScript, Node.js, and Vite — from concept to deployment.'
  },
  {
    icon: <Server size={32} />,
    title: 'System & OS',
    description: 'Advanced Linux power-user. Tested 10+ distros and custom ROMs. Daily driver: Arch Linux with a fully custom Hyprland setup.'
  },
  {
    icon: <Terminal size={32} />,
    title: 'SEO & Content',
    description: 'Strategic SEO implementation and content writing to drive organic traffic and engagement — offered as a freelance service on Fiverr.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Open Source & Ricing',
    description: 'Crafting beautiful, minimal Linux desktops with Neovim, Waybar, Kitty and custom shell scripts. Performance-obsessed by nature.'
  }
];

const Experience = () => {
  const [certOpen, setCertOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '4rem' }}
        >
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Experience</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>My professional journey and freelance history.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '24px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)', zIndex: 0 }}></div>

        {experiences.map((exp, index) => {
          const expWithMetadata = exp as ExperienceWithMetadata;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}
            >
              {/* Icon Circle */}
              <div style={{ 
                minWidth: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: 'var(--bg-color)', 
                border: '2px solid var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-color)',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)'
              }}>
                {exp.icon}
              </div>

              {/* Content Card */}
              <div style={{ 
                background: 'var(--glass-bg)', 
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '1rem',
                padding: '2rem',
                flexGrow: 1,
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
              className="hoverable-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{exp.role}</h3>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-color)', fontWeight: 500 }}>{exp.company}</h4>
                  </div>
                  <span style={{ 
                    padding: '0.25rem 1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--glass-border)'
                  }}>
                    {exp.period}
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {exp.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.tags.map(tag => (
                    <span 
                      key={tag} 
                      style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.25rem 0.75rem', 
                        background: 'rgba(139, 92, 246, 0.1)', 
                        color: '#a78bfa',
                        borderRadius: '4px' 
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Certificate button for IITM */}
                {expWithMetadata.certificate && (
                  <button
                    onClick={() => setCertOpen(true)}
                    style={{
                      marginTop: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      borderRadius: '8px',
                      color: '#a78bfa',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      marginRight: '0.75rem'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.15)')}
                  >
                    <Award size={14} /> View Certificate
                  </button>
                )}

                {/* Website link for Fiverr */}
                {expWithMetadata.link && (
                  <a
                    href={expWithMetadata.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass"
                    style={{
                      marginTop: '1rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      color: '#a78bfa',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(139,92,246,0.4)',
                      background: 'rgba(139, 92, 246, 0.15)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.15)')}
                  >
                    <Terminal size={14} /> Visit Profile
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* Skills Section — full width */}
      <div className="container" style={{ maxWidth: '1400px', marginTop: '8rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '0.5rem' }}>Technical Proficiency</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>My skills and expertise</p>
        </motion.div>

        <div className="skills-card-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          paddingBottom: '8rem'
        }}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="glass skill-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              onMouseMove={handleMouseMove}
              style={{
                padding: '3.5rem 2.5rem',
                borderRadius: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                minHeight: '360px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ 
                color: 'var(--accent-color)', 
                marginBottom: '1.5rem',
                display: 'inline-flex',
                padding: '1rem',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '1rem',
                position: 'relative',
                zIndex: 1,
                alignSelf: 'flex-start',
                width: 'fit-content',
              }}>
                {skill.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-main)', 
                marginBottom: '1rem',
                position: 'relative',
                zIndex: 1
              }}>{skill.title}</h3>
              <p style={{ 
                color: 'var(--text-muted)', 
                lineHeight: 1.6, 
                fontSize: '0.95rem',
                position: 'relative',
                zIndex: 1
              }}>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hoverable-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3) !important;
        }
        .glass.skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 0;
        }
        .glass.skill-card:hover::before {
          opacity: 1;
        }
        @media (max-width: 1024px) {
          .skills-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .skills-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      {/* Certificate Modal */}
      <AnimatePresence>
        {certOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                padding: '2.5rem',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setCertOpen(false)}
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-muted)',
                }}
              >
                <X size={16} />
              </button>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                🎓 IITM — School Connect Program
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Certificate of completion · 2024 – 2025
              </p>

              {/* Certificate image placeholder — replace src with actual certificate path */}
              <div style={{
                width: '100%',
                aspectRatio: '1.414 / 1',
                background: 'rgba(255,255,255,0.03)',
                border: '2px dashed rgba(139,92,246,0.3)',
                borderRadius: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: 'var(--text-muted)',
              }}>
                <Award size={48} style={{ color: '#a78bfa', opacity: 0.6 }} />
                <span style={{ fontSize: '1rem' }}>Certificate image coming soon</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Drop the image in <code>/public/iitm-certificate.jpg</code> to display it here</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Experience;
