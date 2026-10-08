import React from 'react';
import clsx from 'clsx';
import { getProductRatingData } from '@/lib/reviews/data';
import { reviewsEnabled } from '@/lib/site';

export interface RatingBadgeProps {
  handle: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function RatingBadge({ handle, className, size = 'sm' }: RatingBadgeProps) {
  if (!reviewsEnabled) return null;
  const { summary } = getProductRatingData(handle);

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 bg-[#FAF6F0]/95 backdrop-blur-md border border-[#E8DFD3] text-[var(--color-text)] shadow-xs select-none rounded-[3px] font-[family-name:var(--font-body)] tracking-tight',
        size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs',
        className
      )}
      aria-label={`Rated ${summary.averageRating} out of 5 stars based on ${summary.totalReviews} reviews`}
    >
      <span className="text-[var(--color-accent)] leading-none text-xs" aria-hidden="true">
        ★
      </span>
      <span className="font-semibold text-[var(--color-text)] leading-none">
        {summary.averageRating.toFixed(1)}
      </span>
      <span className="text-[var(--color-muted)] leading-none font-normal">
        ({summary.totalReviews})
      </span>
    </div>
  );
}

export default RatingBadge;
