import Link from 'next/link';

import { Button } from '@components/ui/button';
import { Rating } from '@components/ui/rating';

import { Product } from '@libs/types/models';
import { formatCurrency } from '@libs/utils/formatters';
import { calculatePriceDecrease } from '@libs/utils/price';
import { cn } from '@libs/utils/tw-merge';

import { ProductImage, SalePriceBadge } from './';

export interface ProductCardProps {
  id: Product['id'];
  name: Product['name'];
  rating: Product['rating'];
  price: Product['salePrice'];
  comparedPrice?: Product['comparedPrice'];
  imagePath: Product['image'];
}

export function ProductCard({
  id,
  name,
  rating,
  price,
  comparedPrice,
  imagePath
}: ProductCardProps) {
  const isOnSale = comparedPrice && comparedPrice > price;

  // TODO:
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="group">
      <Link href={`/product/${id}`}>
        <div className="relative overflow-hidden rounded-xl bg-muted p-7">
          <ProductImage imagePath={imagePath ?? undefined} alt={name} />
          <Button
            className={cn(
              '0 absolute bottom-0 left-0 w-full overflow-hidden rounded-b-xl py-6 text-base capitalize',
              'translate-y-full transition-transform duration-200 ease-in group-hover:translate-y-0'
            )}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
        <h4 className="mt-2 text-xl font-bold">{name}</h4>
      </Link>
      <Rating className="mt-1" rating={rating} showDecimal />
      <div className="mt-1 flex items-center gap-1">
        <span className="text-lg font-bold">{formatCurrency(price)}</span>
        {isOnSale && (
          <>
            <span className="text-lg font-bold text-muted-foreground/80 line-through">
              {formatCurrency(comparedPrice)}
            </span>
            <SalePriceBadge
              className="rounded-full"
              price={calculatePriceDecrease(price, comparedPrice)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden">
      <div className="aspect-[18/15] w-full bg-gray-300" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-full rounded-full bg-gray-300" />
        <div className="h-4 w-3/4 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
