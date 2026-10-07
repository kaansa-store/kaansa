import 'server-only';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCustomerToken } from '@/lib/utils/session';
import { getCustomer } from '@/lib/shopify';

export const metadata = { title: 'Account Details | Kaansa' };

export default async function AccountDetailsPage() {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const customer = await getCustomer(token);
  if (!customer) redirect('/account/logout');

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-2xl mx-auto">
      <Link
        href="/account"
        className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-6 inline-flex items-center gap-1.5"
      >
        ← Back to Account
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
        Account Details
      </h1>
      <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm mb-10">
        Your personal profile and account credentials.
      </p>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[var(--color-border)]">
          <div>
            <span className="block font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
              First Name
            </span>
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)]">
              {customer.firstName || '—'}
            </p>
          </div>
          <div>
            <span className="block font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Last Name
            </span>
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)]">
              {customer.lastName || '—'}
            </p>
          </div>
        </div>

        <div className="pb-6 border-b border-[var(--color-border)]">
          <span className="block font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
            Email Address
          </span>
          <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)]">
            {customer.email}
          </p>
        </div>

        {customer.phone && (
          <div className="pb-6 border-b border-[var(--color-border)]">
            <span className="block font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">
              Phone Number
            </span>
            <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)]">
              {customer.phone}
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/account/forgot"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Request password reset link →
          </Link>
          <Link
            href="/account/addresses"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            Manage addresses →
          </Link>
        </div>
      </div>
    </div>
  );
}
