import React from 'react';
import clsx from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'discount' | 'neutral' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'discount', className }: BadgeProps) {
  const variantClasses = {
    discount: 'bg-[var(--color-surface)] text-[var(--color-accent)] border border-[var(--color-border)]',
    neutral: 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]',
    accent: 'bg-[var(--color-accent)] text-white',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.08em] font-medium select-none',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
