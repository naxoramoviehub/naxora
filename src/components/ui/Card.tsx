import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'none';
  onClick?: () => void;
}

export default function Card({ children, className = '', glowColor = 'purple', onClick }: CardProps) {
  const glowStyles = {
    purple: '',
    cyan: '',
    none: ''
  };

  return (
    <div
      className={`glass-card bg-surface-elevated/40 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 transition-all duration-300 ${glowStyles[glowColor]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}