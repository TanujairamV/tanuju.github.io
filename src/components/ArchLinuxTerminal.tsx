import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const ArchLinuxTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);

  const script = [
    "neofetch",
    "       /\\           rohan@archlinux",
    "      /  \\          ---------------",
    "     /\\   \\         OS: Arch Linux x86_64",
    "    /      \\        Kernel: 6.8.9-arch1-1",
    "   /   ,,   \\       Packages: 1142 (pacman)",
    "  /   |  |   \\      Shell: zsh 5.9",
    " /_-''    ''-_\\     WM: Hyprland",
    "                    Theme: Catppuccin Mocha",
    "                    Terminal: kitty",
    "",
    "cat ~/.zshrc | grep alias",
    "alias ll='eza -al --icons'",
    "alias update='sudo pacman -Syu'",
    "alias vim='nvim'",
    "",
    "cat ~/.config/hypr/hyprland.conf | head -n 3",
    "monitor=,preferred,auto,1",
    "exec-once = waybar & hyprpaper",
    "$terminal = kitty",
    "",
    "echo 'Minimal, functional, and clean.'",
    "Minimal, functional, and clean.",
    "█"
  ];

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < script.length) {
        setLines(prev => [...prev, script[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 300); // Speed of typing out lines

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="terminal-container"
      style={{
        background: '#11111b', // Catppuccin Mocha Base
        borderRadius: '12px',
        border: '1px solid #313244', // Surface0
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        maxWidth: '700px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Terminal Header */}
      <div style={{
        background: '#181825', // Mantle
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #313244'
      }}>
        <div style={{ display: 'flex', gap: '8px', marginRight: '16px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f38ba8' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f9e2af' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a6e3a1' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#bac2de', fontSize: '0.85rem' }}>
          <Terminal size={14} /> rohan@archlinux:~
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{
        padding: '24px',
        color: '#cdd6f4', // Text
        fontSize: '0.9rem',
        lineHeight: '1.6',
        height: '400px',
        overflowY: 'auto'
      }}>
        {lines.map((line, idx) => (
          <div key={idx} style={{ 
            color: line.startsWith('rohan@') || line.startsWith('OS:') || line.startsWith('Kernel:') ? '#89b4fa' : // Blue
                   line.startsWith('cat') || line.startsWith('echo') || line.startsWith('neofetch') ? '#cba6f7' : // Mauve
                   line.includes('alias') || line.includes('│') || line.includes('monitor') ? '#a6e3a1' : // Green
                   line.includes('Pacman') || line.startsWith('       /\\') ? '#89dceb' : '#cdd6f4', // Sky / Default
            whiteSpace: 'pre',
            marginBottom: '4px'
          }}>
            {line.startsWith('cat') || line.startsWith('echo') || line.startsWith('neofetch') ? (
              <span><span style={{ color: '#a6e3a1' }}>➜</span> <span style={{ color: '#89dceb' }}>~</span> {line}</span>
            ) : line}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ArchLinuxTerminal;
