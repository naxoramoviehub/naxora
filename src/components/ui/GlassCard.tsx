import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
}

export default function GlassCard({ children, className = '', glowEffect = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card bg-surface-elevated/45 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 hover:bg-surface-elevated/60 ${glowEffect ? 'neon-glow-primary' : ''} ${className}`}
    >
      {children}
    </div>
  );
}