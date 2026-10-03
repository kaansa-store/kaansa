import React from 'react';
import clsx from 'clsx';

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={clsx('flex items-center justify-center my-8 text-[var(--color-gold)] select-none', className)}>
      <svg
        width="120"
        height="12"
        viewBox="0 0 120 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-[120px] h-[12px]"
      >
        <line x1="0" y1="6" x2="52" y2="6" stroke="currentColor" strokeWidth="0.5" />
        <rect
          x="56"
          y="4"
          width="8"
          height="4"
          transform="rotate(45 60 6)"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line x1="68" y1="6" x2="120" y2="6" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default Divider;
