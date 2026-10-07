import React from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  href: string;
}

export default function AccountCard({ title, description, href }: Props) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors duration-200 rounded-none"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h2>
        <svg
          className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] leading-relaxed">
        {description}
      </p>
    </Link>
  );
}
