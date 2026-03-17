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

  const fastFetchOutput = [
    "                   -`                    rohan@RohanKonda",
    "                  .o+`                   ----------------",
    "                 `ooo/                   OS: Arch Linux x86_64",
    "                `+oooo:                  Host: HP ENVY TS 17 Notebook PC",
    "               `+oooooo:                 Kernel: Linux 6.19.8-arch1-1",
    "               -+oooooo+:                Uptime: 5 hours, 38 mins",
    "             `/:-:++oooo+:               Packages: 1589 (pacman), 9 (flatpak)",
    "            `/++++/+++++++:              Shell: fish 4.5.0",
    "           `/++++++++++++++:             Display (CMN1733): 1600x900",
    "          `/+++ooooooooooooo/`           WM: Hyprland 0.54.2 (Wayland)",
    "         ./ooosssso++osssssso+`          Theme: Darkly [Qt]",
    "        .oossssso-````/ossssss+`         Icons: Papirus-Dark [Qt]",
    "       -osssssso.      :ssssssso.        Font: Sans Serif (12pt) [Qt]",
    "      :osssssss/        osssso+++.       Cursor: Adwaita",
    "     /ossssssss/        +ssssooo/-       Terminal: kitty 0.46.0",
    "   `/ossssso+/:-        -:/+osssso+-     Terminal Font: JetBrainsMonoNF-Regular",
    "  `+sso+:-`                 `.-/+oso:    CPU: Intel(R) Core(TM) i7-4700MQ @ 3.40 GHz",
    " `++:.                           `-/+/   GPU 1: NVIDIA GeForce GT 740M [Discrete]",
    " .`                                 `/   GPU 2: Intel 4th Gen Core Processor",
    "                                         Memory: 5.81 GiB / 15.55 GiB (37%)",
    "                                         Local IP (wlan0): 192.168.1.6/24",
    "                                         Battery (Primary): 100% [AC Connected]",
    "                                         Locale: en_US.UTF-8",
    "",
    "echo \"Visitor system synchronized. Welcome!\"",
    "Visitor system synchronized. Welcome!",
    "█"
  ];

  const script = ["fastfetch", ...fastFetchOutput];

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
        maxWidth: '900px',
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
        maxHeight: '700px',
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
              color: line.includes('OS:') || line.includes('Kernel:') || line.includes('Browser:') || line.includes('CPU:') || line.includes('GPU') || line.includes('Memory:') || line.includes('Local IP') || line.includes('Battery') || line.includes('Locale:') ? '#89b4fa' : // Blue
                     isCommand ? '#cba6f7' : // Mauve
                     line.includes('alias') || line.includes('System sync complete') || line.includes('synchronized') ? '#a6e3a1' : // Green
                     line.includes('rohan@') || line.includes('/') || line.includes('\\') || line.includes('-') || line.includes('.') || line.includes('+') || line.includes(':') ? '#89dceb' : '#cdd6f4', // Sky / Default
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
