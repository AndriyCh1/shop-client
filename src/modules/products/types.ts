import { Product } from '@libs/types/models';

export type ProductCatalogItem = {
  id: Product['id'];
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
