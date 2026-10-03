import ProductGrid from '@/components/product/ProductGrid';

export default function Loading() {
  return <ProductGrid products={[]} loading={true} count={6} />;
}
