import 'server-only';

import {
  HighlightedProducts,
  HighlightedProductsSkeleton
} from '@modules/products/components/highlighted-products';
import { productsService } from '@modules/products/service';

// TODO: ISR + Daily revalidation
export async function NewArrivalsProducts() {
  const { data: paginatedNewArrivals } = await productsService.getNewArrivals();

  return (
    <HighlightedProducts
      title="New arrivals"
      products={paginatedNewArrivals.data.map((product) => ({
        id: product.id,
        variantId: product.variantId,
        imagePath: product.image,
        price: product.salePrice,
        comparedPrice: product.comparedPrice,
        rating: product.rating,
        name: product.name
      }))}
      expandable
    />
  );
}

export function NewArrivalsProductsSkeleton() {
  return <HighlightedProductsSkeleton expandable />;
}
