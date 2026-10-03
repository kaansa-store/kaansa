export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice?: ShopifyMoney;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions?: ShopifySelectedOption[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  seo?: {
    title: string | null;
    description: string | null;
  };
  priceRange: ShopifyPriceRange;
  compareAtPriceRange?: ShopifyPriceRange;
  featuredImage: ShopifyImage | null;
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  metafields?: {
    key: string;
    value: string;
  }[];
}

export interface Product extends Omit<ShopifyProduct, 'images' | 'variants'> {
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  seo?: {
    title: string | null;
    description: string | null;
  };
  image?: ShopifyImage | null;
  products?: {
    edges: { node: ShopifyProduct }[];
  };
}

export interface Collection extends Omit<ShopifyCollection, 'products'> {
  products?: Product[];
}

export interface CartLineMerchandise {
  id: string;
  title: string;
  product: {
    title: string;
    handle: string;
    featuredImage: ShopifyImage | null;
  };
  price: ShopifyMoney;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost?: {
    totalAmount: ShopifyMoney;
  };
  merchandise: CartLineMerchandise;
}

export type CartLine = ShopifyCartLine;

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: { node: ShopifyCartLine }[];
  };
}

export interface Cart extends Omit<ShopifyCart, 'lines'> {
  lines: CartLine[];
}

export interface MenuItem {
  title: string;
  url: string;
  type?: string;
  items?: MenuItem[];
}

export interface ShopifyMenu {
  items: MenuItem[];
}

export interface ShopifyPolicy {
  title: string;
  body: string;
  handle: string;
}

export interface ShopPolicies {
  privacyPolicy?: ShopifyPolicy | null;
  refundPolicy?: ShopifyPolicy | null;
  shippingPolicy?: ShopifyPolicy | null;
  termsOfService?: ShopifyPolicy | null;
}
