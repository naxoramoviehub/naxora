import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-sans font-semibold transition-all active:scale-95';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-on-primary neon-glow-primary hover:opacity-90',
    secondary: 'bg-transparent border border-glass-stroke text-on-surface backdrop-blur-[20px] hover:border-primary/30',
    ghost: 'text-on-surface-variant hover:text-on-surface underline decoration-transparent hover:decoration-on-surface underline-offset-4'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-[16px] rounded-lg',
    lg: 'px-8 py-3 text-lg rounded-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}