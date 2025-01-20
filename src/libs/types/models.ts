export type Product = {
  id: number;
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

export type Category = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
};
