import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded transition-all duration-200 focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2';
  
  const variantClasses = {
    primary: 'bg-forest text-white hover:bg-forest-light',
    secondary: 'bg-terracotta text-white hover:bg-terracotta-light',
    outline: 'border border-forest text-forest hover:bg-forest hover:text-white',
    ghost: 'text-forest hover:bg-cream',
    destructive: 'bg-terracotta text-white hover:bg-red-700',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const isDisabled = disabled || loading;
  const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading && <span className="spinner" />}
      {children}
    </motion.button>
  );
};

// Icon Button
interface IconButtonProps {
  children: React.ReactNode;
  label: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  label,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
}) => {
  const variantClasses = {
    default: 'bg-white border border-light-border hover:bg-cream text-charcoal',
    ghost: 'hover:bg-cream text-charcoal',
    outline: 'border border-forest text-forest hover:bg-forest hover:text-white',
  };
  
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded transition-all duration-200 focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
