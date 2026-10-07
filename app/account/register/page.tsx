import { registerAction } from '../actions';
import Link from 'next/link';
import AuthForm from '@/components/account/AuthForm';
import FormField from '@/components/account/FormField';

export const metadata = { title: 'Create an account | Kaansa' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
          Create an account
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm mb-10">
          Takes 30 seconds.
        </p>
        <AuthForm action={registerAction} submitLabel="Create account">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="firstName" label="First Name" required autoComplete="given-name" />
            <FormField name="lastName" label="Last Name" required autoComplete="family-name" />
          </div>
          <FormField name="email" label="Email" type="email" required autoComplete="email" />
          <FormField
            name="password"
            label="Password"
            type="password"
            required
            autoComplete="new-password"
          />
        </AuthForm>
        <div className="mt-8 flex flex-col gap-2.5 text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)]">
          <Link href="/account/login" className="hover:text-[var(--color-text)] transition-colors">
            Already have an account? Sign in.
          </Link>
        </div>
      </div>
    </div>
  );
}
