import 'server-only';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCustomerToken } from '@/lib/utils/session';
import { getCustomer } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils/format';

export const metadata = { title: 'Order History | Kaansa' };

function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export default async function OrdersPage() {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const customer = await getCustomer(token);
  if (!customer) redirect('/account/session-expired');

  const orders = customer.orders?.edges?.map((e) => e.node) ?? [];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/account"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-2 inline-flex items-center gap-1.5"
          >
            ← Back to Account
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)]">
            Orders
          </h1>
        </div>
        <span className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] uppercase tracking-wider">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text)] mb-3">
            No orders yet
          </p>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] mb-8">
            You haven&apos;t placed any orders with us yet.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-[var(--color-accent)] text-[#FAF6F0] px-8 py-3.5 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            // Encode Shopify gid for URL routing
            const orderParam = encodeURIComponent(order.id);
            return (
              <Link
                key={order.id}
                href={`/account/orders/${orderParam}`}
                className="group block p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors rounded-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                      {order.name}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)]">
                      {formatDate(order.processedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-[family-name:var(--font-body)] bg-[var(--color-surface-2)] text-[var(--color-text)]">
                      {order.financialStatus || 'Paid'}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] uppercase tracking-wider font-[family-name:var(--font-body)] border border-[var(--color-border)] text-[var(--color-muted)]">
                      {order.fulfillmentStatus || 'Unfulfilled'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <div className="text-xs font-[family-name:var(--font-body)] text-[var(--color-muted)]">
                    {order.lineItems?.edges?.length || 0} item(s)
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)] font-semibold">
                      {formatPrice(
                        order.currentTotalPrice.amount,
                        order.currentTotalPrice.currencyCode
                      )}
                    </span>
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
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
