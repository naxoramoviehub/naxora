import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-surface-container-high text-on-surface-variant border border-glass-stroke',
    primary: 'bg-primary text-on-primary',
    secondary: 'bg-secondary text-on-secondary',
    tertiary: 'bg-tertiary text-on-tertiary'
  };

  return (
    <span
      className={`font-mono text-[12px] font-medium uppercase tracking-[0.1em] px-3 py-1 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}