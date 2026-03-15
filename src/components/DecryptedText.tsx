import React, { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, speed = 40, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval: number;

    if (isHovered) {
      interval = window.setInterval(() => {
        setDisplayText(() => 
          text.split("").map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, speed);
    } else {
      setDisplayText(text);
    }

    return () => window.clearInterval(interval);
  }, [text, speed, isHovered]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ fontFamily: 'monospace', display: 'inline-block' }}
    >
      {isHovered ? displayText : text}
    </span>
  );
};

export default DecryptedText;
