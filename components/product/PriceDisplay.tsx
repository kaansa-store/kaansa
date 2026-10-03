import React from 'react';
import clsx from 'clsx';
import { formatPrice, getDiscountPercent } from '@/lib/utils/format';
import Badge from '@/components/ui/Badge';

export interface PriceDisplayProps {
  price: string | number;
  compareAtPrice?: string | number | null;
  currencyCode?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  currencyCode = 'INR',
  size = 'md',
  className,
}: PriceDisplayProps) {
  const discount = getDiscountPercent(price, compareAtPrice);

  const sizeClasses = {
    sm: 'text-xs md:text-sm',
    md: 'text-sm md:text-base',
    lg: 'text-lg md:text-xl',
  };

  return (
    <div className={clsx('flex items-center flex-wrap gap-2.5 font-[family-name:var(--font-body)]', className)}>
      <span className={clsx('font-medium text-[var(--color-text)]', sizeClasses[size])}>
        {formatPrice(price, currencyCode)}
      </span>

      {discount > 0 && compareAtPrice && (
        <>
          <span className="text-xs md:text-sm text-[var(--color-muted)] line-through opacity-70">
            {formatPrice(compareAtPrice, currencyCode)}
          </span>
          <Badge variant="discount">{discount}% off</Badge>
        </>
      )}
    </div>
  );
}

export default PriceDisplay;
