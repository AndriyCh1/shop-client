'use server';

import { Suspense } from 'react';

import {
  BestSellersProducts,
  BestSellersProductsSkeleton
} from '@modules/products/components/highlighted/best-sellers-products';
import {
  NewArrivalsProducts,
  NewArrivalsProductsSkeleton
} from '@modules/products/components/highlighted/new-arrivals-products';

import { ContentContainer } from '@components/shared/content-container';
import { Separator } from '@components/ui/separator';

export async function HighlightedProductsSection() {
  return (
    <main>
      <ContentContainer className="py-10">
        <Suspense fallback={<NewArrivalsProductsSkeleton />}>
          <NewArrivalsProducts />
        </Suspense>
        <Separator className="my-16" />
        <Suspense fallback={<BestSellersProductsSkeleton />}>
          <BestSellersProducts />
        </Suspense>
      </ContentContainer>
    </main>
  );
}
