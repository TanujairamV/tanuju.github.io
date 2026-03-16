import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const educationList = [
  {
    degree: "Senior Secondary Education",
    institution: "FIITJEE GLOBAL SCHOOL",
    period: "2024 - 2026",
    description: "Completing senior secondary education with a focus on advanced academics and competitive exam preparation.",
    icon: <GraduationCap size={20} />
  },
  {
    degree: "Secondary Education",
    institution: "Velammal New-Gen School",
    period: "2022 - 2024",
    description: "Completed secondary education with a strong foundation in core subjects.",
    icon: <BookOpen size={20} />
  },
  {
    degree: "Middle School Education",
    institution: "Satya Sai Institute of Educare",
    period: "2020 - 2022",
    description: "Focused on holistic education and foundational academic development.",
    icon: <BookOpen size={20} />
  },
  {
    degree: "Primary & Middle Education",
    institution: "Narayana E-Techno School",
    period: "2015 - 2020",
    description: "Formative years of education emphasizing technology-integrated learning.",
    icon: <BookOpen size={20} />
  },
  {
    degree: "Early Education",
    institution: "DAV Baba School",
    period: "2014 - 2015",
    description: "Early childhood education.",
    icon: <Award size={20} />
  },
  {
    degree: "Early Education",
    institution: "Rainbow School, Nellore",
    period: "2013 - 2014",
    description: "Early childhood education.",
    icon: <Award size={20} />
  }
];

const Education = () => {
  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '4rem' }}
        >
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Education</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>My academic background and continuous learning journey.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '24px', top: '10px', bottom: '10px', width: '2px', background: 'var(--glass-border)', zIndex: 0 }}></div>

          {educationList.map((edu, index) => (
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
                border: '2px solid #3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b82f6',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)'
              }}>
                {edu.icon}
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
              className="hoverable-edu-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                    <h4 style={{ fontSize: '1.1rem', color: '#60a5fa', fontWeight: 500 }}>{edu.institution}</h4>
                  </div>
                  <span style={{ 
                    padding: '0.25rem 1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--glass-border)'
                  }}>
                    {edu.period}
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hoverable-edu-card:hover {
          transform: translateY(-5px);
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default Education;
