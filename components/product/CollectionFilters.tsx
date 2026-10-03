'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface CollectionFiltersProps {
  types?: string[];
  currentType?: string;
  currentSort?: string;
}

export function CollectionFilters({
  types = ['Pooja Essentials', 'Home Decor', 'Kitchen & Tableware'],
  currentType,
  currentSort = 'featured',
}: CollectionFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-y border-[var(--color-border)] mb-12">
      {/* Category Types Filter */}
      <div className="flex items-center flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleFilterChange('type', 'all')}
          className={`px-4 py-1.5 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.08em] transition-colors cursor-pointer border ${
            !currentType || currentType === 'all'
              ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
              : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-text)]'
          }`}
        >
          All
        </button>

        {types.map((type) => {
          const isActive = currentType?.toLowerCase() === type.toLowerCase();
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleFilterChange('type', type)}
              className={`px-4 py-1.5 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.08em] transition-colors cursor-pointer border ${
                isActive
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-text)]'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
        <label
          htmlFor="sort-select"
          className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)] font-[family-name:var(--font-body)]"
        >
          Sort by:
        </label>
        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="bg-transparent border border-[var(--color-border)] text-xs uppercase tracking-[0.08em] font-[family-name:var(--font-body)] text-[var(--color-text)] px-3 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default CollectionFilters;
