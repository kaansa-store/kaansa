'use client';

import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-5 py-2.5 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    const variantClasses = {
      primary:
        'bg-[var(--color-accent)] text-[#FAF6F0] hover:bg-[var(--color-accent-hover)] active:scale-[0.98] border-none shadow-none',
      ghost:
        'bg-transparent text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-text)] active:scale-[0.98]',
      secondary:
        'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-2)] active:scale-[0.98] border border-[var(--color-border)]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          'inline-flex items-center justify-center font-[family-name:var(--font-body)] uppercase tracking-[0.1em] font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-none',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
