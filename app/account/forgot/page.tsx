import { forgotAction } from '../actions';
import Link from 'next/link';
import AuthForm from '@/components/account/AuthForm';
import FormField from '@/components/account/FormField';

export const metadata = { title: 'Reset your password | Kaansa' };

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
          Reset your password
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[var(--color-muted)] text-sm mb-10">
          We&apos;ll send a reset link to your email.
        </p>
        <AuthForm action={forgotAction} submitLabel="Send reset link">
          <FormField name="email" label="Email" type="email" required autoComplete="email" />
        </AuthForm>
        <div className="mt-8 flex flex-col gap-2.5 text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)]">
          <Link href="/account/login" className="hover:text-[var(--color-text)] transition-colors">
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
