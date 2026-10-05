import 'server-only';
import { getProductInventory } from '@/lib/shopify';

interface Props {
  handle: string;
  variantId: string;
}

export default async function LiveInventory({ handle, variantId }: Props) {
  // This component is NOT cached — always fetches fresh from Shopify
  const { availableForSale, quantityAvailable } =
    await getProductInventory(handle, variantId);

  if (!availableForSale) {
    return (
      <p className="text-sm font-body text-danger uppercase tracking-widest">
        Sold out
      </p>
    );
  }

  if (quantityAvailable !== null && quantityAvailable <= 5) {
    return (
      <p className="text-sm font-body text-accent uppercase tracking-widest">
        Only {quantityAvailable} left
      </p>
    );
  }

  return null;
}
