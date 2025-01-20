import {
  ExpandableProductsGrid,
  ExpandableProductsGridSkeleton,
  ProductCardProps,
  ProductsGrid,
  ProductsGridSkeleton
} from './';

export interface HighlightedProductsProps {
  className?: string;
  title: string;
  products: ProductCardProps[];
  expandable?: boolean;
  expandParams?: {
    initial?: number;
    perExpand?: number;
    maximum?: number;
  };
}

export function HighlightedProducts({
  className,
  title,
  products,
  expandable = false,
  expandParams
}: HighlightedProductsProps) {
  return (
    <div className={className}>
      <h3 className="mb-12 text-center font-integral-cf text-5xl font-bold uppercase">
        {title}
      </h3>
      {expandable ? (
        <ExpandableProductsGrid {...expandParams} products={products} />
      ) : (
        <ProductsGrid products={products} />
      )}
    </div>
  );
}

export function HighlightedProductsSkeleton({
  expandable
}: {
  expandable?: boolean;
}) {
  return expandable ? (
    <ExpandableProductsGridSkeleton />
  ) : (
    <ProductsGridSkeleton />
  );
}
