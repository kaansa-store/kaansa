export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Removes CR, LF and other control characters so values cannot inject email headers.
export function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
}

// Removes control characters except newline (\n) for multi-line fields like messages and notes.
export function stripControlCharsExceptNewlines(value: string): string {
  return value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, ' ').trim();
}

export function clamp(value: string, max: number): string {
  return value.slice(0, max);
}

const EMAIL_RE =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

export function isValidPhone(value: string): boolean {
  return /^[0-9+()\-\s]{6,20}$/.test(value);
}
