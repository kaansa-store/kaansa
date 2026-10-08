import 'server-only';
import { redirect } from 'next/navigation';
import { getCustomerToken } from '@/lib/utils/session';
import { getCustomer } from '@/lib/shopify';
import AccountCard from '@/components/account/AccountCard';
import { logoutAction } from './actions';

export const metadata = { title: 'My account | Kaansa' };

export default async function AccountPage() {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const customer = await getCustomer(token);
  if (!customer) redirect('/account/session-expired');

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-4xl mx-auto">
      <div className="border-b border-[var(--color-border)] pb-8 mb-10">
        <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
          Customer Portal
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mt-2 mb-1">
          Hello, {customer.firstName || 'there'}.
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm">
          {customer.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AccountCard
          title="Orders"
          description="View your order history and track deliveries."
          href="/account/orders"
        />
        <AccountCard
          title="Addresses"
          description="Manage your saved delivery addresses."
          href="/account/addresses"
        />
        <AccountCard
          title="Details"
          description="Your name, email and contact information."
          href="/account/details"
        />
      </div>

      <form action={logoutAction} className="mt-16 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
        <button
          type="submit"
          className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] uppercase tracking-widest hover:text-[var(--color-danger)] transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
