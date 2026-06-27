import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'none';
  onClick?: () => void;
}

export default function Card({ children, className = '', glowColor = 'purple', onClick }: CardProps) {
  const glowStyles = {
    purple: 'hover:border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]',
    cyan: 'hover:border-tertiary/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]',
    none: 'hover:border-glass-stroke hover:shadow-none'
  };

  return (
    <div
      className={`glass-card bg-surface-elevated/40 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface-elevated/60 ${glowStyles[glowColor]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}