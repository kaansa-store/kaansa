'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-bg text-text px-6 text-center">
      <h1 className="font-display text-3xl">Something went wrong.</h1>
      <p className="font-body text-muted text-base">
        An unexpected error occurred while loading this page.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="font-body text-sm uppercase tracking-widest px-5 py-2.5 bg-text text-bg hover:bg-accent transition-colors cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-body text-sm uppercase tracking-widest px-5 py-2.5 border border-border text-text hover:text-accent hover:border-accent transition-colors"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
