import React from 'react';

export function AnnouncementBar() {
  return (
    <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] py-2 px-4 text-center">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text)] font-[family-name:var(--font-body)] font-medium">
        Handcrafted Brass & Copper Pieces • Made by Artisans in India
      </p>
    </div>
  );
}

export default AnnouncementBar;
