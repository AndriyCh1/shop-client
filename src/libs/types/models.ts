import { ProductAttributeKey } from '@modules/products/consts';

export type Product = {
  id: number;
  variantId: number;
  name: string;
  description: string | null;
  shortDescription: string;
  rating: number;
  cumulativeRatingSum: number;
  reviewCount: number;
  salePrice: number;
  comparedPrice: number | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductVariant = {
  id: number;
  productId: number;
  name: string | null;
  description: string | null;
  shortDescription: string | null;
  salePrice: number;
  comparedPrice: number | null;
  stockQuantity: number;
  sku: string | null;
  displayOrder: number;
  attributes: Record<ProductAttributeKey, string>;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
};

export type CartItem = {
  id: number;
  productVariantId: number;
  quantity: number;
  productVariant: {
    id: number;
    name: string;
    description: string | null;
    shortDescription: string | null;
    salePrice: number;
    productId: number | null;
    product: {
      id: number;
      name: string;
      description: string | null;
      shortDescription: string;
      rating: number;
    };
  } | null;
};

export type Cart = {
  id: number;
  cartItems: CartItem[];
};
