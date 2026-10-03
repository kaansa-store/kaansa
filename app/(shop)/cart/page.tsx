import type { Metadata } from 'next';
import CartSummary from '@/components/cart/CartSummary';
import Divider from '@/components/ui/Divider';

export const metadata: Metadata = {
  title: 'Your Cart | Kaansa',
  description: 'Review your selected handcrafted brass and copper heritage items.',
};

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-text)]">
          Your Cart
        </h1>
        <Divider className="my-4" />
      </div>

      <CartSummary />
    </div>
  );
}
