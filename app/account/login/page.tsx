import { loginAction } from '../actions';
import Link from 'next/link';
import AuthForm from '@/components/account/AuthForm';
import FormField from '@/components/account/FormField';

export const metadata = { title: 'Sign in | Kaansa' };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
          Sign in
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm mb-10">
          Welcome back. Sign in to see your orders.
        </p>
        <AuthForm action={loginAction} submitLabel="Sign in">
          <input type="hidden" name="from" value={params?.from ?? ''} />
          <FormField name="email" label="Email" type="email" required autoComplete="email" />
          <FormField name="password" label="Password" type="password" required autoComplete="current-password" />
        </AuthForm>
        <div className="mt-8 flex flex-col gap-2.5 text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)]">
          <Link href="/account/forgot" className="hover:text-[var(--color-text)] transition-colors">
            Forgot your password?
          </Link>
          <Link href="/account/register" className="hover:text-[var(--color-text)] transition-colors">
            No account? Create one.
          </Link>
        </div>
      </div>
    </div>
  );
}
