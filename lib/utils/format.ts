export function formatPrice(amount: string | number, currencyCode = 'INR'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

export function getDiscountPercent(
  price: string | number,
  compareAt?: string | number | null
): number {
  if (!compareAt) return 0;
  const p = typeof price === 'string' ? parseFloat(price) : price;
  const c = typeof compareAt === 'string' ? parseFloat(compareAt) : compareAt;
  if (isNaN(p) || isNaN(c) || c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}
