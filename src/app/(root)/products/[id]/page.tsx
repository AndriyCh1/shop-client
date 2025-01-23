import React, { Suspense } from 'react';

import { ProductBreadcrumb } from '@modules/products/components/product-breadcrumb';
import {
  ProductInformation,
  ProductInformationSkeleton
} from '@modules/products/components/product-information';

import { ContentContainer } from '@components/shared/content-container';

import { ProductVariant } from '@libs/types/models';

export default async function ProductDetailsPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ v?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const productId = +params.id;
  const variantId: ProductVariant['id'] | undefined = searchParams.v
    ? +searchParams.v
    : undefined;

  return (
    <ContentContainer>
      <ProductBreadcrumb productId={productId} className="my-5" />
      <Suspense fallback={<ProductInformationSkeleton />}>
        <ProductInformation productId={productId} variantId={variantId} />
      </Suspense>
    </ContentContainer>
  );
}
