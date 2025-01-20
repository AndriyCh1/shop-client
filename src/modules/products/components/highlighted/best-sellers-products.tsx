import 'server-only';

import {
  HighlightedProducts,
  HighlightedProductsSkeleton
} from '@modules/products/components/highlighted-products';
import { productsService } from '@modules/products/service';

export async function BestSellersProducts() {
  const { data: paginatedBestSellers } = await productsService.getBestSellers();

  return (
    <HighlightedProducts
      title="Top selling"
      products={paginatedBestSellers.data.map((product) => ({
        id: product.id,
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

export function BestSellersProductsSkeleton() {
  return <HighlightedProductsSkeleton expandable />;
}
