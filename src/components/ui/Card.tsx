import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'none';
  onClick?: () => void;
}

export default function Card({ children, className = '', glowColor = 'purple', onClick }: CardProps) {
  const glowStyles = {
    purple: 'hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    cyan: 'hover:border-tertiary/30 hover:shadow-[0_0_30px_rgba(47,217,244,0.15)]',
    none: 'hover:border-glass-stroke hover:shadow-none'
  };

  return (
    <div
      className={`glass-card bg-surface-elevated/60 backdrop-blur-[20px] border border-glass-stroke transition-all duration-300 hover:-translate-y-1 ${glowStyles[glowColor]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}