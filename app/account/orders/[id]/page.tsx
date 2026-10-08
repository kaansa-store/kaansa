import 'server-only';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCustomerToken } from '@/lib/utils/session';
import { getCustomer } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils/format';

export const metadata = { title: 'Order Details | Kaansa' };

function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const customer = await getCustomer(token);
  if (!customer) redirect('/account/session-expired');

  const order = customer.orders?.edges
    ?.map((e) => e.node)
    .find((o) => o.id === decodedId || o.id === id || String(o.orderNumber) === id);

  if (!order) {
    notFound();
  }

  const lineItems = order.lineItems?.edges?.map((e) => e.node) ?? [];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-4xl mx-auto">
      <Link
        href="/account/orders"
        className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-6 inline-flex items-center gap-1.5"
      >
        ← Back to all orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--color-border)]">
        <div>
          <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
            Order Confirmed
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mt-1">
            {order.name}
          </h1>
          <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] mt-1">
            Placed on {formatDate(order.processedAt)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 text-xs uppercase tracking-wider font-[family-name:var(--font-body)] bg-[var(--color-surface-2)] text-[var(--color-text)]">
            {order.financialStatus || 'Paid'}
          </span>
          <span className="px-3 py-1.5 text-xs uppercase tracking-wider font-[family-name:var(--font-body)] border border-[var(--color-border)] text-[var(--color-muted)]">
            {order.fulfillmentStatus || 'Unfulfilled'}
          </span>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-8 mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-text)] mb-6">
          Items Ordered ({lineItems.reduce((acc, i) => acc + i.quantity, 0)})
        </h2>

        <div className="divide-y divide-[var(--color-border)]">
          {lineItems.map((item, index) => {
            const image = item.variant?.image;
            const price = item.variant?.price;
            return (
              <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[var(--color-surface-2)] shrink-0 overflow-hidden">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.altText || item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-subtle)] text-xs font-[family-name:var(--font-body)]">
                      Kaansa
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg text-[var(--color-text)] truncate">
                    {item.title}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] mt-0.5">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-[family-name:var(--font-display)] text-base sm:text-lg text-[var(--color-text)] font-semibold">
                    {price ? formatPrice(price.amount, price.currencyCode) : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Total Summary */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)]">
            Total Price
          </span>
          <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text)] font-bold">
            {formatPrice(
              order.currentTotalPrice.amount,
              order.currentTotalPrice.currencyCode
            )}
          </span>
        </div>
      </div>

      {/* Action to Track */}
      {order.statusUrl && (
        <div className="flex justify-start">
          <a
            href={order.statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[#FAF6F0] hover:bg-[var(--color-accent-hover)] px-8 py-4 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] transition-colors"
          >
            Track your order
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
