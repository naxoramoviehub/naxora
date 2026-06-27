'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'highlight';
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
  const baseStyles = 'font-sans font-semibold inline-flex items-center justify-center transition-colors relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-primary-container text-white border border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:border-primary/40',
    secondary: 'bg-secondary/40 border border-glass-stroke text-on-surface backdrop-blur-md hover:bg-secondary/60 hover:border-primary/25 hover:text-white',
    ghost: 'text-on-surface-variant hover:text-white hover:bg-white/5',
    highlight: 'bg-gradient-to-r from-tertiary to-tertiary-container text-on-tertiary border border-tertiary/20 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:border-tertiary/40'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-[16px] rounded-lg',
    lg: 'px-8 py-3.5 text-lg rounded-xl'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props as any}
    >
      {children}
    </motion.button>
  );
}