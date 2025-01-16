export type Product = {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  rating: number;
  cumulativeRatingSum: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
};
