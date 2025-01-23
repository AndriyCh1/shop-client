'use client';

import {
  ProductCard,
  ProductCardProps,
  ProductCardSkeleton
} from './product-card';

export interface ProductsGridProps {
  products: ProductCardProps[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          variantId={product.variantId}
          imagePath={product.imagePath}
          name={product.name}
          price={product.price}
          rating={product.rating}
          comparedPrice={product.comparedPrice}
        />
      ))}
    </div>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
