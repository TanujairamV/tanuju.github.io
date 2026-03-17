import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Database, 
  Layout, 
  Zap,
  Monitor
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import styles from './TechStack.module.css';
import LogoLoop from './LogoLoop';
import { SiCplusplus, SiPython, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiFirebase, SiFramer, SiTailwindcss, SiArchlinux, SiNixos, SiNeovim, SiDocker, SiGit } from 'react-icons/si';

interface TechItemProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const BentoCard = ({ title, icon, skills }: TechItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const spotlightBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.bentoCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.spotlight} 
        style={{ background: spotlightBg, opacity: isHovered ? 1 : 0 }} 
      />
      
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.skillsList}>
            {skills.map((skill, i) => (
              <span key={i} className={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const techLogos = [
    { node: <SiCplusplus size={32} title="C++" />, title: "C++" },
    { node: <SiPython size={32} title="Python" />, title: "Python" },
    { node: <SiTypescript size={32} title="TypeScript" />, title: "TypeScript" },
    { node: <SiReact size={32} title="React" />, title: "React" },
    { node: <SiNextdotjs size={32} title="Next.js" />, title: "Next.js" },
    { node: <SiNodedotjs size={32} title="Node.js" />, title: "Node.js" },
    { node: <SiExpress size={32} title="Express" />, title: "Express" },
    { node: <SiFirebase size={32} title="Firebase" />, title: "Firebase" },
    { node: <SiFramer size={32} title="Framer Motion" />, title: "Framer Motion" },
    { node: <SiTailwindcss size={32} title="Tailwind CSS" />, title: "Tailwind CSS" },
    { node: <SiArchlinux size={32} title="Arch Linux" />, title: "Arch Linux" },
    { node: <SiNixos size={32} title="NixOS" />, title: "NixOS" },
    { node: <SiNeovim size={32} title="Neovim" />, title: "Neovim" },
    { node: <SiDocker size={32} title="Docker" />, title: "Docker" },
    { node: <SiGit size={32} title="Git" />, title: "Git" },
  ];

  return (
    <section className={styles.techStack} id="arsenal">
      <div className="container">
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.pills}
          >
            Digital Arsenal
          </motion.div>
          <h2 className="text-gradient">Engineered to Perfection</h2>
          <p className={styles.subtitle}>
            A curated selection of languages, frameworks, and system utilities that power my daily workflow.
          </p>
        </div>

        <div className={styles.marqueeSection}>
          <LogoLoop 
            logos={techLogos} 
            speed={40} 
            gap={60} 
            logoHeight={32} 
            fadeOut={true} 
            fadeOutColor="var(--bg-color)"
            scaleOnHover={true}
          />
        </div>

        <div className={styles.bentoGrid}>
          <BentoCard 
            title="Core Development" 
            icon={<Code2 size={24} />} 
            skills={["React", "TypeScript", "Vite", "Next.js"]}
          />
          <BentoCard 
            title="System & OS" 
            icon={<Terminal size={24} />} 
            skills={["Arch Linux", "NixOS", "Hyprland", "Zsh"]}
          />
          <BentoCard 
            title="Backend" 
            icon={<Database size={24} />} 
            skills={["Node.js", "Express", "Firebase"]}
          />
          <BentoCard 
            title="Design & UX" 
            icon={<Layout size={24} />} 
            skills={["Framer Motion", "Vanilla CSS", "UI/UX"]}
          />
          <BentoCard 
            title="Optimization" 
            icon={<Zap size={24} />} 
            skills={["SEO", "Perf", "Analytics"]}
          />
          <BentoCard 
            title="Digital Ricing" 
            icon={<Monitor size={24} />} 
            skills={["Kitty", "Waybar", "Neovim"]}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
