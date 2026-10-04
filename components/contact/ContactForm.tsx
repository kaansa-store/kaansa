'use client';

import { useActionState } from 'react';
import { submitContact, type ContactState } from '@/app/(shop)/contact/actions';

const topics = ['Order & delivery', 'Product question', 'Gifting & bulk orders', 'Care & polishing', 'Something else'];

const fieldBase =
  'peer w-full bg-transparent border-0 border-b border-[var(--color-border-strong)]/60 px-0 pt-6 pb-2.5 text-base text-[var(--color-text)] font-[family-name:var(--font-body)] placeholder-transparent outline-none transition-colors focus:border-[var(--color-accent)]';

const labelBase =
  'pointer-events-none absolute left-0 top-6 text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)] transition-all duration-200 peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-[var(--color-accent)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em]';

function Field({
  id,
  label,
  type = 'text',
  required,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldBase}
      />
      <label htmlFor={id} className={labelBase}>
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-[var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, { status: 'idle' });

  if (state.status === 'success') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-gold)]/15 text-2xl text-[var(--color-gold)]">
          ✦
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-text)] mb-3">Thank you</h2>
        <p className="max-w-sm text-[15px] text-[var(--color-muted)] font-light leading-relaxed">
          Your message has reached us. Someone from the Kaansa team will reply to your email soon.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={state.errors?.name} autoComplete="name" />
        <Field id="email" label="Email" type="email" required error={state.errors?.email} autoComplete="email" />
      </div>
      <Field id="phone" label="Phone (optional)" type="tel" autoComplete="tel" />

      <fieldset>
        <legend className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
          What is this about?
        </legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-[var(--color-border-strong)]/60 px-4 py-2 text-[13px] text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent)] peer-checked:text-[#FBF5EA] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-gold)]">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Your message"
          required
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          className={`${fieldBase} resize-none`}
        />
        <label htmlFor="message" className={labelBase}>
          Your message<span className="text-[var(--color-accent)]"> *</span>
        </label>
        {state.errors?.message && (
          <p id="message-error" className="mt-1.5 text-xs text-[var(--color-danger)]">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state.message && (
        <p className="text-sm text-[var(--color-danger)]" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[var(--color-accent)] px-10 py-4 text-sm uppercase tracking-[0.18em] text-[#FBF5EA] font-[family-name:var(--font-body)] transition-colors duration-300 hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
      >
        {pending ? 'Sending…' : 'Send message'}
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </button>
    </form>
  );
}
