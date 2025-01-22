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
