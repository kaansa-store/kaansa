'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import {
  escapeHtml,
  stripControlChars,
  stripControlCharsExceptNewlines,
  clamp,
  isValidEmail,
  isValidPhone,
} from '@/lib/utils/validation';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;
};

const ALLOWED_TOPICS = [
  'Order & delivery',
  'Product question',
  'Gifting & bulk orders',
  'Care & polishing',
  'Something else',
];

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeTopic = escapeHtml(data.topic);
  const safeMessage = escapeHtml(data.message);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New message from Kaansa contact form</title>
    </head>
    <body style="margin:0;padding:0;background:#FBF5EA;font-family:'Georgia',serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF5EA;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0"
              style="background:#F0E4CC;border:1px solid #D9C9B0;max-width:560px;width:100%;">

              <!-- Header -->
              <tr>
                <td style="padding:32px 40px 24px;border-bottom:1px solid #D9C9B0;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;
                             color:#7A5A44;font-family:'Georgia',serif;">
                    Kaansa
                  </p>
                  <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#2C1A0E;
                              font-family:'Georgia',serif;">
                    New message from the website
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">

                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                                   text-transform:uppercase;color:#7A5A44;">From</p>
                        <p style="margin:0;font-size:15px;color:#2C1A0E;">${safeName}</p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                                   text-transform:uppercase;color:#7A5A44;">Email</p>
                        <p style="margin:0;font-size:15px;color:#2C1A0E;">
                          <a href="mailto:${safeEmail}"
                             style="color:#8A4A1C;text-decoration:none;">${safeEmail}</a>
                        </p>
                      </td>
                    </tr>

                    ${data.phone ? `
                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                                   text-transform:uppercase;color:#7A5A44;">Phone</p>
                        <p style="margin:0;font-size:15px;color:#2C1A0E;">${safePhone}</p>
                      </td>
                    </tr>` : ''}

                    <tr>
                      <td style="padding-bottom:20px;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                                   text-transform:uppercase;color:#7A5A44;">Topic</p>
                        <p style="margin:0;font-size:15px;color:#2C1A0E;">${safeTopic}</p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding-bottom:0;">
                        <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.14em;
                                   text-transform:uppercase;color:#7A5A44;">Message</p>
                        <div style="background:#FBF5EA;border:1px solid #D9C9B0;
                                    padding:20px 24px;">
                          <p style="margin:0;font-size:15px;color:#2C1A0E;
                                     line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
                        </div>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Reply CTA -->
              <tr>
                <td style="padding:0 40px 32px;">
                  <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${data.topic} — Kaansa`)}"
                     style="display:inline-block;background:#8A4A1C;color:#FBF5EA;
                            font-size:12px;letter-spacing:0.14em;text-transform:uppercase;
                            text-decoration:none;padding:14px 28px;font-family:'Georgia',serif;">
                    Reply to ${safeName}
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 40px;border-top:1px solid #D9C9B0;">
                  <p style="margin:0;font-size:11px;color:#B09070;font-family:'Georgia',serif;">
                    Sent from the contact form at kaansa.com/contact
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildEmailText(data: {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}): string {
  return [
    'New message from Kaansa contact form',
    '─'.repeat(40),
    `From:    ${data.name}`,
    `Email:   ${data.email}`,
    data.phone ? `Phone:   ${data.phone}` : null,
    `Topic:   ${data.topic}`,
    '',
    'Message:',
    data.message,
    '',
    '─'.repeat(40),
    'Sent from kaansa.com/contact',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

// Simple in-memory rate limit: max 3 submissions per IP per 10 minutes
// Works for single-instance deployments. For multi-instance (Vercel),
// this resets per instance — acceptable for a low-traffic contact form.
// TODO: replace with Upstash Redis rate limiting for production scale.
const submissionMap = new Map<string, { count: number; resetAt: number }>();
const autoReplyEmailMap = new Map<string, { count: number; resetAt: number }>();

function cleanupRateLimitMap(map: Map<string, { count: number; resetAt: number }>) {
  if (map.size > 500) {
    const now = Date.now();
    for (const [key, entry] of map.entries()) {
      if (now > entry.resetAt) {
        map.delete(key);
      }
    }
  }
}

function isRateLimited(ip: string): boolean {
  cleanupRateLimitMap(submissionMap);
  const now = Date.now();
  const entry = submissionMap.get(ip);
  if (!entry || now > entry.resetAt) {
    submissionMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

function isAutoReplyEmailRateLimited(email: string): boolean {
  cleanupRateLimitMap(autoReplyEmailMap);
  const now = Date.now();
  const entry = autoReplyEmailMap.get(email);
  if (!entry || now > entry.resetAt) {
    autoReplyEmailMap.set(email, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 2) return true;
  entry.count++;
  return false;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans do not
  if (String(formData.get('company') ?? '').trim()) {
    return { status: 'success' };
  }

  // Rate limiting check
  const headersList = await headers();
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return {
      status: 'error',
      message: 'Too many messages. Please wait a few minutes and try again.',
    };
  }

  const rawName = String(formData.get('name') ?? '');
  const rawEmail = String(formData.get('email') ?? '');
  const rawPhone = String(formData.get('phone') ?? '');
  const rawTopic = String(formData.get('topic') ?? '');
  const rawMessage = String(formData.get('message') ?? '');

  const name = clamp(stripControlChars(rawName), 80);
  const email = clamp(stripControlChars(rawEmail), 254);
  const phone = clamp(stripControlChars(rawPhone), 20);
  let topic = clamp(stripControlChars(rawTopic), 80);
  const message = clamp(stripControlCharsExceptNewlines(rawMessage), 2000);

  if (!ALLOWED_TOPICS.includes(topic)) {
    topic = 'Something else';
  }

  // Validate
  const errors: ContactState['errors'] = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!isValidEmail(email)) errors.email = 'Please enter a valid email.';
  if (phone && !isValidPhone(phone)) errors.phone = 'Please enter a valid phone number.';
  if (message.length < 10) errors.message = 'Please write at least a sentence.';
  if (Object.keys(errors).length) return { status: 'error', errors };

  const data = { name, email, phone, topic, message };

  // Check env vars
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'kaansaindia@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] RESEND_API_KEY is not set in production.');
      return {
        status: 'error',
        message: 'Something went wrong. Please try again in a moment.',
      };
    }
    console.warn('[contact] RESEND_API_KEY is not set in development. Message not sent.');
    return { status: 'success' };
  }

  try {
    const resend = new Resend(apiKey);
    const safeFromName = stripControlChars('Kaansa Contact Form');
    const safeFromEmail = stripControlChars(fromEmail);
    const safeSubject = stripControlChars(`[Kaansa] ${data.topic} — message from ${data.name}`);

    const { error } = await resend.emails.send({
      from: `${safeFromName} <${safeFromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject: safeSubject,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    });

    if (error) {
      console.error('[contact] Resend error status:', error.name || 'unknown');
      return {
        status: 'error',
        message: 'Something went wrong. Please try again in a moment.',
      };
    }

    // Auto-reply to the sender (non-blocking, rate-limited per recipient email)
    if (!isAutoReplyEmailRateLimited(data.email)) {
      try {
        const autoReplyName = escapeHtml(clamp(stripControlChars(data.name), 60));
        await resend.emails.send({
          from: `Kaansa <${safeFromEmail}>`,
          to: [data.email],
          subject: 'We got your message — Kaansa',
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8" /></head>
            <body style="margin:0;padding:0;background:#FBF5EA;font-family:'Georgia',serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF5EA;padding:40px 0;">
                <tr>
                  <td align="center">
                    <table width="560" cellpadding="0" cellspacing="0"
                      style="background:#F0E4CC;border:1px solid #D9C9B0;max-width:560px;width:100%;">
                      <tr>
                        <td style="padding:40px;">
                          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;
                                     text-transform:uppercase;color:#7A5A44;">Kaansa</p>
                          <h1 style="margin:8px 0 24px;font-size:22px;font-weight:400;color:#2C1A0E;">
                            We got your message, ${autoReplyName}.
                          </h1>
                          <p style="margin:0 0 16px;font-size:15px;color:#2C1A0E;line-height:1.7;">
                            Someone from the Kaansa team will reply to this email within one business day.
                          </p>
                          <p style="margin:0 0 32px;font-size:15px;color:#7A5A44;line-height:1.7;">
                            In the meantime, you can browse the collection at
                            <a href="https://kaansa.com/collections"
                               style="color:#8A4A1C;text-decoration:none;">kaansa.com</a>.
                          </p>
                          <p style="margin:0;font-size:13px;color:#B09070;">
                            — The Kaansa team
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px 40px;border-top:1px solid #D9C9B0;">
                          <p style="margin:0;font-size:11px;color:#B09070;">
                            You are receiving this because you submitted a message at kaansa.com/contact.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
          text: `We got your message, ${autoReplyName}.\n\nSomeone from the Kaansa team will reply within one business day.\n\n— The Kaansa team`,
        });
      } catch (autoReplyErr) {
        console.warn('[contact] auto-reply failed (non-critical):', autoReplyErr);
      }
    }

    return { status: 'success' };
  } catch (err) {
    console.error('[contact] delivery failed:', err);
    return {
      status: 'error',
      message: 'Something went wrong. Please try again in a moment.',
    };
  }
}
