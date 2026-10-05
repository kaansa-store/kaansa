import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-bg text-text px-6 text-center">
      <h1 className="font-display text-3xl">This page does not exist.</h1>
      <p className="font-body text-muted text-base">
        It may have moved, or the link might be wrong.
      </p>
      <Link
        href="/"
        className="font-body text-sm uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
