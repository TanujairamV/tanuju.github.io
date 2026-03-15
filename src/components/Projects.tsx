import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import styles from './Projects.module.css';

const TiltedImage = ({ src, alt }: { src: string; alt: string }) => {
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

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      className={styles.imageContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={styles.image}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </motion.div>
  );
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with Next.js, Stripe integration, and a custom CMS. Features a highly optimized checkout flow and real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Node.js', 'Prisma', 'Stripe'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    title: 'AI Task Manager',
    description: 'A smart productivity app that uses AI to automatically categorize and prioritize daily tasks based on user behavior patterns.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'Framer Motion'],
    links: {
      github: '#',
      live: '#'
    }
  },
  {
    title: 'Financial Dashboard',
    description: 'Interactive data visualization dashboard for tracking personal investments and cryptocurrency portfolios with real-time API integrations.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    tags: ['TypeScript', 'D3.js', 'Firebase', 'CSS Modules'],
    links: {
      github: '#',
      live: '#'
    }
  }
];

const Projects = () => {
  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient">Featured Work</h2>
          <p className={styles.subtitle}>Some of my recent projects</p>
        </motion.div>

        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className={`glass ${styles.projectCard}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <TiltedImage src={project.image} alt={project.title} />
              
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                
                <div className={styles.links}>
                  <a href={project.links.github} target="_blank" rel="noreferrer" className={styles.link} aria-label="GitHub Repository">
                    <Github size={20} />
                  </a>
                  <a href={project.links.live} target="_blank" rel="noreferrer" className={styles.link} aria-label="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
