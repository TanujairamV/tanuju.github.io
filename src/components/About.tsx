
import { motion } from 'framer-motion';
import { Code2, Layout, Database, Smartphone } from 'lucide-react';
import styles from './About.module.css';

const services = [
  {
    icon: <Code2 size={32} />,
    title: 'Web Development',
    description: 'Building responsive, performant websites using modern technologies like React, Next.js, and TypeScript.'
  },
  {
    icon: <Layout size={32} />,
    title: 'UI/UX Design',
    description: 'Creating intuitive, engaging user interfaces with a focus on accessibility and modern aesthetics.'
  },
  {
    icon: <Database size={32} />,
    title: 'Backend Engineering',
    description: 'Designing robust APIs and database architectures for scalable applications.'
  },
  {
    icon: <Smartphone size={32} />,
    title: 'App Development',
    description: 'Developing cross-platform mobile experiences that feel native and fast.'
  }
];

const About = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-gradient">About Me</h2>
          <p className={styles.subtitle}>My skills and expertise</p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`glass ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
