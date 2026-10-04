'use server';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<'name' | 'email' | 'message', string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans don't.
  if (String(formData.get('company') ?? '').trim()) return { status: 'success' };

  const data = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    topic: String(formData.get('topic') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  const errors: ContactState['errors'] = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email.';
  if (data.message.length < 10) errors.message = 'Please write at least a sentence.';
  if (Object.keys(errors).length) return { status: 'error', errors };

  // Forward to any form/webhook service (Formspree, Zapier, Slack, Make…).
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[contact] CONTACT_WEBHOOK_URL not set. Message not delivered:', data);
    return { status: 'success' };
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, source: 'kaansa.com/contact' }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { status: 'success' };
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return { status: 'error', message: 'Something went wrong. Please try again in a moment.' };
  }
}
