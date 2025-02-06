import { notFound, redirect } from 'next/navigation';

import { AddToCart } from '@modules/products/components/add-to-cart';
import { ProductDetailsImages } from '@modules/products/components/product-details-images';
import { ProductOptions } from '@modules/products/components/product-options';
import { SalePriceBadge } from '@modules/products/components/sale-price-badge';
import {
  srProductVariantService,
  srProductsService
} from '@modules/products/services';

import { Rating } from '@components/ui/rating';

import { Product, ProductVariant } from '@libs/types/models';
import { calculatePriceDecrease } from '@libs/utils/price';

export interface ProductInformationProps {
  productId: Product['id'];
  variantId?: ProductVariant['id'];
}

export async function ProductInformation({
  productId,
  variantId
}: ProductInformationProps) {
  const { data: variants } =
    await srProductsService.getProductVariants(productId);

  if (!variants.length) {
    return notFound();
  }

  if (variantId === undefined) {
    variantId = variants[0].id;
    redirect(`/products/${productId}?v=${variantId}`);
  }

  const { data: variant } =
    await srProductVariantService.getVariantDetails(+variantId);

  return (
    <div className="gap-10 md:flex md:justify-between">
      <ProductDetailsImages
        images={variant.images.concat(variant.productImages)}
        name={variant.name}
      />
      <div className="flex-grow">
        <h1 className="mt-5 font-integral-cf text-4xl font-bold md:mt-0">
          {variant.name}
        </h1>
        <Rating rating={variant.rating} showDecimal className="mt-2" />
        <ProductPrice
          price={variant.salePrice}
          comparedPrice={variant.comparedPrice ?? undefined}
        />
        <p className="mt-2 text-muted-foreground">{variant.description}</p>
        <ProductOptions variants={variants} currentVariant={variant} />
        <AddToCart
          className="mt-5"
          variant={{
            ...variant,
            image: variant.images.length ? variant.images[0] : undefined
          }}
        />
      </div>
    </div>
  );
}

interface ProductPriceProps {
  price: number;
  comparedPrice?: number;
}

const ProductPrice = ({ price, comparedPrice }: ProductPriceProps) => {
  return (
    <div className="mt-1 flex items-center gap-2">
      <span className="text-2xl font-bold">${price}</span>
      {comparedPrice && comparedPrice > price && (
        <>
          <span className="text-2xl font-bold text-muted-foreground line-through">
            ${comparedPrice}
          </span>
          <SalePriceBadge
            price={calculatePriceDecrease(price, comparedPrice)}
            className="rounded-2xl"
          />
        </>
      )}
    </div>
  );
};

export function ProductInformationSkeleton() {
  return (
    <div className="flex gap-3">
      <div className="h-[500px] w-1/5 animate-pulse rounded bg-muted"></div>
      <div className="h-[500px] w-2/5 animate-pulse rounded bg-muted"></div>
      <div className="h-[500px] w-2/5 animate-pulse rounded bg-muted"></div>
    </div>
  );
}
