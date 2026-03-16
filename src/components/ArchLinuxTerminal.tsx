import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const ArchLinuxTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [systemInfo, setSystemInfo] = useState({
    os: "Arch Linux",
    kernel: "rolling",
    shell: "web-zsh",
    wm: "Hyprland",
    browser: "Web Browser",
    resolution: "1920x1080",
    cpu: "Unknown",
    memory: "Unknown"
  });

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const platform = window.navigator.platform;
    
    let os = "Linux";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    else if (ua.indexOf("Mac") !== -1) os = "macOS";
    else if (ua.indexOf("Android") !== -1) os = "Android";
    else if (ua.indexOf("iPhone") !== -1) os = "iOS";

    let browser = "Chrome";
    if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else if (ua.indexOf("Edge") !== -1) browser = "Edge";

    setSystemInfo({
      os,
      kernel: platform || "rolling-release",
      shell: "zsh 5.9",
      wm: "Viewport",
      browser,
      resolution: `${window.innerWidth}x${window.innerHeight}`,
      cpu: `${window.navigator.hardwareConcurrency || 8} Cores`,
      memory: "Available"
    });
  }, []);

  const archLogo = [
    "      /\\      ",
    "     /  \\     ",
    "    / /\\ \\    ",
    "   / /  \\ \\   ",
    "  / /    \\ \\  ",
    " / /      \\ \\ ",
    "/_/        \\_\\"
  ];

  const script = [
    "neofetch",
    ...archLogo.map((l, i) => {
      const info = [
        "rohan@visitor",
        "--------------",
        `OS: ${systemInfo.os}`,
        `Kernel: ${systemInfo.kernel}`,
        `Shell: ${systemInfo.shell}`,
        `WM: ${systemInfo.wm}`,
        `Browser: ${systemInfo.browser}`,
        `CPU: ${systemInfo.cpu}`
      ];
      const gap = " ".repeat(20); // Spacing between logo and info
      return l + gap + (info[i] || "");
    }),
    "",
    "cat ~/.zshrc | grep alias",
    "alias rice='nvim ~/.config/hypr'",
    "alias visit='cd /home/rohan/portfolio'",
    "",
    "echo \"Visitor system synchronized. Welcome!\"",
    "Visitor system synchronized. Welcome!",
    "█"
  ];

  useEffect(() => {
    let currentLine = 0;
    setLines([]); // Reset for re-trigger if needed
    
    const interval = setInterval(() => {
      if (currentLine < script.length) {
        setLines(prev => [...prev, script[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [systemInfo]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="terminal-container"
      style={{
        background: 'rgba(26, 27, 38, 0.85)', // Deep Tokyo Night
        borderRadius: '16px',
        border: '1px solid rgba(137, 180, 250, 0.3)', // Sapphire border
        overflow: 'hidden',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 50px rgba(187, 154, 247, 0.1)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        maxWidth: '850px',
        margin: '2rem auto',
        width: '100%',
        backdropFilter: 'blur(40px)',
        position: 'relative'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(187, 154, 247, 0.1), transparent)', pointerEvents: 'none' }} />
      {/* Terminal Header */}
      <div style={{
        background: '#181825', // Mantle
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #313244'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f38ba8', boxShadow: '0 0 10px rgba(243, 139, 168, 0.3)' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f9e2af', boxShadow: '0 0 10px rgba(249, 226, 175, 0.3)' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a6e3a1', boxShadow: '0 0 10px rgba(166, 227, 161, 0.3)' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#bac2de', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em' }}>
          <Terminal size={14} /> zsh — kitty
        </div>
        <div style={{ width: '52px' }}></div> {/* Spacer for balance */}
      </div>

      {/* Terminal Body */}
      <div style={{
        padding: '24px 32px',
        color: '#cdd6f4', // Text
        fontSize: '0.9rem',
        lineHeight: '1.4',
        maxHeight: '600px',
        height: 'auto',
        overflowY: 'auto',
        textAlign: 'left',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
      }}>
        <style>{`
          div::-webkit-scrollbar { display: none; }
          @keyframes blink { 
            0%, 100% { opacity: 1; } 
            50% { opacity: 0; } 
          }
        `}</style>
        {lines.filter(line => line !== undefined).map((line, idx) => {
          const isCommand = line.startsWith('cat') || line.startsWith('echo') || line.startsWith('neofetch') || line.startsWith('ls');
          return (
            <div key={idx} style={{ 
              color: line.includes('OS:') || line.includes('Kernel:') || line.includes('Browser:') || line.includes('CPU:') ? '#89b4fa' : // Blue
                     isCommand ? '#cba6f7' : // Mauve
                     line.includes('alias') || line.includes('System sync complete') || line.includes('synchronized') ? '#a6e3a1' : // Green
                     line.includes('rohan@') || line.includes('/') || line.includes('\\') || line.includes('-') ? '#89dceb' : '#cdd6f4', // Sky / Default
              whiteSpace: 'pre',
              marginBottom: line.trim() === '' ? '12px' : '4px',
              opacity: line === '█' ? 1 : 0.95,
            }}>
              {isCommand ? (
                <span style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#a6e3a1', fontWeight: 'bold' }}>➜</span> 
                  <span style={{ color: '#89dceb', fontWeight: 'bold' }}>~</span> 
                  <span>{line}</span>
                </span>
              ) : line === '█' ? (
                <span style={{ 
                  display: 'inline-block', 
                  width: '8px', 
                  height: '15px', 
                  background: '#cba6f7', 
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite'
                }}></span>
              ) : line}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ArchLinuxTerminal;
