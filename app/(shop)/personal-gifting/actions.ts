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

export type GiftingState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Record<string, string>;
};

const ALLOWED_OCCASIONS = [
  'Wedding Favours & Invites',
  'Baby Arrival / Announcement',
  'Special Invitation / Milestone Anniversary',
  'Housewarming / Griha Pravesh',
  'Festive / Diwali Hampers',
  'Corporate & Executive Gifting',
];

const ALLOWED_QUANTITIES = [
  '25 – 50 gifts',
  '50 – 100 gifts',
  '100 – 250 gifts',
  '250 – 500 gifts',
  '500+ gifts',
];

const ALLOWED_BUDGETS = [
  '',
  '₹1,500 – ₹3,000 per gift',
  '₹3,000 – ₹5,000 per gift',
  '₹5,000 – ₹8,000 per gift',
  '₹8,000+ per gift (Ultra Bespoke)',
];

// In-memory rate limiting: max 3 enquiries per IP per 10 minutes
// TODO: replace with Upstash Redis rate limiting for production scale.
const giftingSubmissionMap = new Map<string, { count: number; resetAt: number }>();
const giftingAutoReplyEmailMap = new Map<string, { count: number; resetAt: number }>();

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
  cleanupRateLimitMap(giftingSubmissionMap);
  const now = Date.now();
  const entry = giftingSubmissionMap.get(ip);
  if (!entry || now > entry.resetAt) {
    giftingSubmissionMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

function isAutoReplyEmailRateLimited(email: string): boolean {
  cleanupRateLimitMap(giftingAutoReplyEmailMap);
  const now = Date.now();
  const entry = giftingAutoReplyEmailMap.get(email);
  if (!entry || now > entry.resetAt) {
    giftingAutoReplyEmailMap.set(email, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 2) return true;
  entry.count++;
  return false;
}

function buildGiftingEmailHtml(data: {
  name: string;
  phone: string;
  email: string;
  occasion: string;
  eventDate: string;
  quantity: string;
  budget: string;
  city: string;
  notes: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safePhone = escapeHtml(data.phone);
  const safeEmail = escapeHtml(data.email);
  const safeOccasion = escapeHtml(data.occasion);
  const safeEventDate = escapeHtml(data.eventDate);
  const safeQuantity = escapeHtml(data.quantity);
  const safeBudget = escapeHtml(data.budget);
  const safeCity = escapeHtml(data.city);
  const safeNotes = escapeHtml(data.notes);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>New Gifting Brief — Kaansa</title>
    </head>
    <body style="margin:0;padding:0;background:#FBF5EA;font-family:'Georgia',serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBF5EA;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0"
              style="background:#F0E4CC;border:1px solid #D9C9B0;max-width:560px;width:100%;">
              <tr>
                <td style="padding:32px 40px 24px;border-bottom:1px solid #D9C9B0;">
                  <p style="margin:0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7A5A44;">
                    Kaansa Atelier
                  </p>
                  <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#2C1A0E;">
                    New Bespoke Gifting Enquiry
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Client Name</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeName}</p></td></tr>
                    <tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Email</p><p style="margin:0;font-size:15px;color:#2C1A0E;"><a href="mailto:${safeEmail}" style="color:#8A4A1C;">${safeEmail}</a></p></td></tr>
                    <tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Phone / WhatsApp</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safePhone}</p></td></tr>
                    <tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Occasion</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeOccasion}</p></td></tr>
                    ${data.eventDate ? `<tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Date</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeEventDate}</p></td></tr>` : ''}
                    <tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Estimated Quantity</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeQuantity}</p></td></tr>
                    ${data.budget ? `<tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Budget per Gift</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeBudget}</p></td></tr>` : ''}
                    ${data.city ? `<tr><td style="padding-bottom:14px;"><p style="margin:0 0 2px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Delivery City</p><p style="margin:0;font-size:15px;color:#2C1A0E;">${safeCity}</p></td></tr>` : ''}
                    ${data.notes ? `<tr><td style="padding-bottom:0;"><p style="margin:0 0 6px;font-size:10px;text-transform:uppercase;color:#7A5A44;">Notes / Customization</p><div style="background:#FBF5EA;border:1px solid #D9C9B0;padding:16px 20px;"><p style="margin:0;font-size:14px;color:#2C1A0E;line-height:1.6;white-space:pre-wrap;">${safeNotes}</p></div></td></tr>` : ''}
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 40px 32px;">
                  <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Your Kaansa Gifting Enquiry — ${data.occasion}`)}"
                     style="display:inline-block;background:#8A4A1C;color:#FBF5EA;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 28px;">
                    Reply to ${safeName}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 40px;border-top:1px solid #D9C9B0;">
                  <p style="margin:0;font-size:11px;color:#B09070;">
                    Submitted via Personal Gifting Atelier at kaansa.com/personal-gifting
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

export async function submitGiftingEnquiry(
  _prevState: GiftingState,
  formData: FormData
): Promise<GiftingState> {
  // Honeypot
  if (String(formData.get('company') ?? '').trim()) {
    return {
      status: 'success',
      message: 'Your brief has reached our gifting curators.',
    };
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
      message: 'Too many requests. Please wait a few minutes and try again.',
    };
  }

  const rawName = String(formData.get('name') || '');
  const rawPhone = String(formData.get('phone') || '');
  const rawEmail = String(formData.get('email') || '');
  const rawOccasion = String(formData.get('occasion') || '');
  const rawEventDate = String(formData.get('eventDate') || '');
  const rawQuantity = String(formData.get('quantity') || '');
  const rawBudget = String(formData.get('budget') || '');
  const rawCity = String(formData.get('city') || '');
  const rawNotes = String(formData.get('notes') || '');

  const name = clamp(stripControlChars(rawName), 80);
  const phone = clamp(stripControlChars(rawPhone), 20);
  const email = clamp(stripControlChars(rawEmail), 254);
  const occasion = clamp(stripControlChars(rawOccasion), 80);
  const eventDate = clamp(stripControlChars(rawEventDate), 40);
  const quantity = clamp(stripControlChars(rawQuantity), 80);
  const budget = clamp(stripControlChars(rawBudget), 80);
  const city = clamp(stripControlChars(rawCity), 80);
  const notes = clamp(stripControlCharsExceptNewlines(rawNotes), 2000);

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) errors.name = 'Please provide your full name.';
  if (!phone || !isValidPhone(phone)) errors.phone = 'Please provide a valid phone or WhatsApp number.';
  if (!isValidEmail(email)) errors.email = 'Please provide a valid email address.';
  if (!occasion || !ALLOWED_OCCASIONS.includes(occasion)) errors.occasion = 'Please select your celebration occasion.';
  if (!quantity || !ALLOWED_QUANTITIES.includes(quantity)) errors.quantity = 'Please select estimated quantity.';
  if (budget && !ALLOWED_BUDGETS.includes(budget)) errors.budget = 'Please select a valid budget option.';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors };
  }

  const data = { name, phone, email, occasion, eventDate, quantity, budget, city, notes };

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'kaansaindia@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[gifting] RESEND_API_KEY is not set in production.');
      return {
        status: 'error',
        message: 'Something went wrong submitting your brief. Please try again in a moment.',
      };
    }
    console.warn('[gifting] RESEND_API_KEY is not set in development. Brief not sent.');
    return {
      status: 'success',
      message: 'Your brief has reached our gifting curators. We will share the catalogue and bespoke curation within 48 hours.',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const safeFromName = stripControlChars('Kaansa Gifting Atelier');
    const safeFromEmail = stripControlChars(fromEmail);
    const safeSubject = stripControlChars(`[Kaansa Gifting] ${data.occasion} — enquiry from ${data.name} (${data.quantity} units)`);

    const { error } = await resend.emails.send({
      from: `${safeFromName} <${safeFromEmail}>`,
      to: [toEmail],
      replyTo: data.email,
      subject: safeSubject,
      html: buildGiftingEmailHtml(data),
      text: `New Gifting Enquiry\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nOccasion: ${data.occasion}\nQuantity: ${data.quantity}\nDate: ${data.eventDate}\nBudget: ${data.budget}\nCity: ${data.city}\nNotes:\n${data.notes}`,
    });

    if (error) {
      console.error('[gifting] Resend error status:', error.name || 'unknown');
      return {
        status: 'error',
        message: 'Something went wrong submitting your brief. Please try again in a moment.',
      };
    }

    // Auto-reply to the inquirer (non-blocking, rate-limited per recipient email)
    if (!isAutoReplyEmailRateLimited(data.email)) {
      try {
        const autoReplyName = escapeHtml(clamp(stripControlChars(data.name), 60));
        await resend.emails.send({
          from: `Kaansa Atelier <${safeFromEmail}>`,
          to: [data.email],
          subject: 'We received your gifting brief — Kaansa Atelier',
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
                          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7A5A44;">Kaansa</p>
                          <h1 style="margin:8px 0 24px;font-size:22px;font-weight:400;color:#2C1A0E;">
                            We received your gifting brief, ${autoReplyName}.
                          </h1>
                          <p style="margin:0 0 16px;font-size:15px;color:#2C1A0E;line-height:1.7;">
                            Our bespoke gifting curators have received your details. We are curating heirloom pieces and packaging options tailored to your celebration.
                          </p>
                          <p style="margin:0 0 32px;font-size:15px;color:#7A5A44;line-height:1.7;">
                            A senior curator will reach out to you via WhatsApp or email within 24 to 48 hours with our bespoke lookbook.
                          </p>
                          <p style="margin:0;font-size:13px;color:#B09070;">
                            — The Kaansa Gifting Atelier
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:20px 40px;border-top:1px solid #D9C9B0;">
                          <p style="margin:0;font-size:11px;color:#B09070;">
                            Sent from kaansa.com/personal-gifting
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
          text: `We received your gifting brief, ${autoReplyName}.\n\nOur bespoke gifting curators will connect with you within 24-48 hours.\n\n— The Kaansa Gifting Atelier`,
        });
      } catch (autoReplyErr) {
        console.warn('[gifting] auto-reply failed (non-critical):', autoReplyErr);
      }
    }

    return {
      status: 'success',
      message: 'Your brief has reached our gifting curators. We will share the catalogue and bespoke curation within 48 hours.',
    };
  } catch (err) {
    console.error('[gifting] delivery failed:', err);
    return {
      status: 'error',
      message: 'Something went wrong submitting your brief. Please try again in a moment.',
    };
  }
}
