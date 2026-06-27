import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
}

export default function GlassCard({ children, className = '', glowEffect = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card bg-surface-elevated/60 backdrop-blur-[20px] border border-glass-stroke ${glowEffect ? 'neon-glow-primary' : ''} ${className}`}
    >
      {children}
    </div>
  );
}