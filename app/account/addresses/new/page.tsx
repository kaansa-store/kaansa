import Link from 'next/link';
import { addAddressAction } from '../../actions';
import AuthForm from '@/components/account/AuthForm';
import FormField from '@/components/account/FormField';

export const metadata = { title: 'Add an address | Kaansa' };

export default function NewAddressPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-20 sm:py-24 max-w-xl mx-auto">
      <Link
        href="/account/addresses"
        className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-6 inline-flex items-center gap-1.5"
      >
        ← Back to addresses
      </Link>

      <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
        Add an address
      </h1>
      <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm mb-10">
        Enter your shipping details below.
      </p>

      <AuthForm action={addAddressAction} submitLabel="Save address">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="firstName" label="First Name" required autoComplete="given-name" />
          <FormField name="lastName" label="Last Name" required autoComplete="family-name" />
        </div>

        <FormField name="address1" label="Address line 1" required autoComplete="address-line1" />
        <FormField name="address2" label="Apartment, suite, etc. (optional)" autoComplete="address-line2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="city" label="City" required autoComplete="address-level2" />
          <FormField name="province" label="State / Province" required autoComplete="address-level1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField name="country" label="Country" required defaultValue="India" autoComplete="country-name" />
          <FormField name="zip" label="PIN / Postal Code" required autoComplete="postal-code" />
        </div>

        <FormField name="phone" label="Phone number" type="tel" autoComplete="tel" />
      </AuthForm>
    </div>
  );
}
