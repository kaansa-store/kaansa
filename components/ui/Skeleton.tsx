import React from 'react';
import clsx from 'clsx';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-[var(--color-surface)] rounded-none before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[rgba(251,245,234,0.4)] before:to-transparent',
        className
      )}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Skeleton;
