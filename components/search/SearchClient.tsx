'use client';

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const POPULAR_SEARCHES = [
  'Kansa Thali',
  'Brass Urli',
  'Copper Bottle',
  'Puja',
  'Dinner Set',
  'Gifting',
];

export default function SearchClient({ initialQuery = '' }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
      router.push(`/search?${params.toString()}`);
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearQuery = () => {
    setQuery('');
    handleSearch('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="relative flex items-center">
        <div className="absolute left-4 sm:left-5 text-[var(--color-muted)] pointer-events-none">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by piece, metal (Kansa, Brass, Copper), or occasion…"
          autoFocus
          className="
            w-full pl-12 sm:pl-14 pr-24 py-4 sm:py-5
            bg-[var(--color-surface)] border border-[var(--color-border)]
            focus:border-[var(--color-gold)] focus:outline-none
            font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--color-text)]
            placeholder:text-[var(--color-subtle)] transition-colors rounded-none
          "
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
              aria-label="Clear search query"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="
              px-4 py-2 bg-[var(--color-accent)] text-[#FAF6F0]
              hover:bg-[var(--color-accent-hover)] font-[family-name:var(--font-body)]
              text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-none
            "
          >
            {isPending ? '…' : 'Search'}
          </button>
        </div>
      </form>

      {/* Popular Suggestions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        <span className="text-xs font-[family-name:var(--font-body)] text-[var(--color-muted)] uppercase tracking-wider mr-1">
          Popular:
        </span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              setQuery(term);
              handleSearch(term);
            }}
            className="
              px-3 py-1 text-xs font-[family-name:var(--font-body)]
              border border-[var(--color-border)] hover:border-[var(--color-accent)]
              hover:text-[var(--color-accent)] text-[var(--color-muted)]
              bg-transparent transition-colors cursor-pointer rounded-none
            "
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
