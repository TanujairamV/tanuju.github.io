import { motion } from 'framer-motion';
import { Code, Terminal, Server } from 'lucide-react';

const experiences = [
  {
    role: "Freelance SEO & Content Writer",
    company: "Fiverr",
    period: "2026 - Present",
    description: "Started my focus on freelancing on Fiverr, offering SEO and content writing services. Continuously expanding my skill set and service offerings to grow my freelance career.",
    tags: ["SEO", "Content Writing", "Freelance", "Fiverr"],
    icon: <Terminal size={20} />
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
    role: "BSc Computer Science",
    company: "IITM",
    period: "2024 - 2025",
    description: "Pursued a Bachelor of Science degree in Computer Science at the Indian Institute of Technology Madras (IITM).",
    tags: ["Computer Science", "Academics", "IITM"],
    icon: <Code size={20} />
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

const Experience = () => {
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

          {experiences.map((exp, index) => (
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        .hoverable-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default Experience;
