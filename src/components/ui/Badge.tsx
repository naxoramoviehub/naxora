import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-surface-container-high/40 text-on-surface-variant border border-glass-stroke',
    primary: 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    secondary: 'bg-secondary text-on-secondary border border-glass-stroke',
    tertiary: 'bg-tertiary/20 text-tertiary border border-tertiary/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
  };

  return (
    <span
      className={`font-mono text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}