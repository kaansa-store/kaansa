'use client';

import React, { useActionState } from 'react';
import Button from '@/components/ui/Button';

export type AuthActionState = { error?: string; success?: string } | null;

interface Props {
  action: (
    prevState: AuthActionState,
    formData: FormData
  ) => Promise<AuthActionState>;
  submitLabel: string;
  children: React.ReactNode;
}

export default function AuthForm({ action, submitLabel, children }: Props) {
  const [state, formAction, isPending] = useActionState<AuthActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {children}
      {state?.error && (
        <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-danger)]">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-success)]">
          {state.success}
        </p>
      )}
      <Button type="submit" disabled={isPending} className="w-full mt-2">
        {isPending ? 'Please wait…' : submitLabel}
      </Button>
    </form>
  );
}
