'use client';

import { useExpandableList } from '@hooks/use-expandable-list';

import { Button } from '@components/ui/button';

import { ProductCardProps } from './product-card';
import { ProductsGrid, ProductsGridSkeleton } from './products-grid';

export interface ExpandableProductsGridProps {
  /**
     Number of products to show initially
   */
  initial?: number;

  /**
    Number of products to show per expand
   */
  perExpand?: number;

  /**
     Maximum number of products to show
   */
  maximum?: number;

  products: ProductCardProps[];

  className?: string;
}

export function ExpandableProductsGrid({
  className,
  initial = 4,
  perExpand = 4,
  maximum = 16,
  products
}: ExpandableProductsGridProps) {
  const { collapse, expand, items, expandable, expanded } = useExpandableList({
    initial,
    perExpand,
    maximum,
    items: products
  });

  return (
    <div className={className}>
      <ProductsGrid products={items} />
      <div className="flex items-center justify-center">
        {expandable && (
          <Button
            type="button"
            variant="outline"
            onClick={expand}
            className="mt-8 rounded-full px-20 py-5 text-base font-medium capitalize"
          >
            Show more
          </Button>
        )}
        {expanded && !expandable && (
          <Button
            type="button"
            variant="outline"
            onClick={collapse}
            className="mt-8 rounded-full px-20 py-5 text-base font-medium capitalize"
          >
            Show less
          </Button>
        )}
      </div>
    </div>
  );
}

export function ExpandableProductsGridSkeleton() {
  return <ProductsGridSkeleton />;
}
