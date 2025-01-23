import { CategoryHierarchyItem } from '@modules/categories/types';

import { Product, ProductVariant } from '@libs/types/models';

export type ProductCatalogItem = {
  id: Product['id'];
  variantId: Product['variantId'];
  name: Product['name'];
  description: Product['description'];
  shortDescription: Product['shortDescription'];
  rating: Product['rating'];
  cumulativeRatingSum: Product['cumulativeRatingSum'];
  reviewCount: Product['reviewCount'];
  salePrice: Product['salePrice'];
  comparedPrice: Product['comparedPrice'];
  image: Product['image'];
  createdAt: Product['createdAt'];
};

export type ProductVariantDetails = {
  id: ProductVariant['id'];
  productId: ProductVariant['productId'];
  name: string;
  description: ProductVariant['description'];
  shortDescription: string;
  salePrice: ProductVariant['salePrice'];
  comparedPrice: ProductVariant['comparedPrice'];
  rating: number;
  stockQuantity: ProductVariant['stockQuantity'];
  sku: ProductVariant['sku'];
  displayOrder: ProductVariant['displayOrder'];
  attributes: ProductVariant['attributes'];
  createdAt: ProductVariant['createdAt'];
  updatedAt: ProductVariant['updatedAt'];
  images: string[];
  productImages: string[];
};

export type CategoryPathItem = CategoryHierarchyItem;
