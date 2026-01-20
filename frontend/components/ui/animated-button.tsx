'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  // Define variant classes
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'underline-offset-4 hover:underline text-primary',
  };

  // Define size classes
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-base',
  };

  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <motion.button
      // Cast props to HTMLMotionProps<'button'> to fix TS type error
      {...(props as HTMLMotionProps<'button'>)}
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
      className={buttonClasses}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && props.onClick) {
          e.preventDefault();
          // @ts-ignore - onClick exists in props
          props.onClick(e);
        }
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
