import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export interface DividerProps {
  className?: string;
  showEmblem?: boolean;
}

export function Divider({ className, showEmblem = true }: DividerProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-3 my-8 text-[var(--color-gold)] select-none',
        className
      )}
    >
      <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-gold)]/50" />
      {showEmblem ? (
        <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 opacity-85 transition-transform duration-300 hover:scale-110">
          <Image
            src="/images/kaansa-emblem.png"
            alt="Kaansa Crest"
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-[10px] text-[var(--color-gold)]">✦</span>
      )}
      <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-gold)]/50" />
    </div>
  );
}

export default Divider;
