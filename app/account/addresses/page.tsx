import 'server-only';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCustomerToken } from '@/lib/utils/session';
import { getCustomer } from '@/lib/shopify';
import { deleteAddressAction } from '../actions';

export const metadata = { title: 'Saved Addresses | Kaansa' };

export default async function AddressesPage() {
  const token = await getCustomerToken();
  if (!token) redirect('/account/login');

  const customer = await getCustomer(token);
  if (!customer) redirect('/account/session-expired');

  const addresses = customer.addresses?.edges?.map((e) => e.node) ?? [];
  const defaultAddressId = customer.defaultAddress?.id;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/account"
            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-2 inline-flex items-center gap-1.5"
          >
            ← Back to Account
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)]">
            Addresses
          </h1>
        </div>

        <Link
          href="/account/addresses/new"
          className="inline-block bg-[var(--color-accent)] text-[#FAF6F0] px-6 py-3 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] hover:bg-[var(--color-accent-hover)] transition-colors text-center"
        >
          Add a new address
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="p-12 text-center bg-[var(--color-surface)] border border-[var(--color-border)]">
          <p className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text)] mb-3">
            No saved addresses
          </p>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] mb-8">
            Add your primary shipping address for faster checkout.
          </p>
          <Link
            href="/account/addresses/new"
            className="inline-block bg-[var(--color-accent)] text-[#FAF6F0] px-8 py-3.5 text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Add an address
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => {
            const isDefault = address.isDefault || address.id === defaultAddressId;
            return (
              <div
                key={address.id}
                className="relative p-6 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-[family-name:var(--font-display)] text-lg text-[var(--color-text)] font-semibold">
                      {address.firstName} {address.lastName}
                    </span>
                    {isDefault && (
                      <span className="px-2 py-0.5 text-[10px] font-medium font-[family-name:var(--font-body)] uppercase tracking-wider bg-[var(--color-gold)] text-[#2C1A0E]">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] space-y-1">
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}
                      {address.province ? `, ${address.province}` : ''} {address.zip}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p className="pt-2 text-xs">Phone: {address.phone}</p>}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-end">
                  <form action={deleteAddressAction}>
                    <input type="hidden" name="id" value={address.id} />
                    <button
                      type="submit"
                      className="font-[family-name:var(--font-body)] text-xs uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
                    >
                      Delete address
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
