import React from 'react';

import { srProductsService } from '@modules/products/services/products-service';

import { Breadcrumb } from '@components/shared/breadcrumb';

import { Product } from '@libs/types/models';

export interface ProductBreadcrumbProps {
  productId: Product['id'];
  className?: string;
}

export async function ProductBreadcrumb({
  productId,
  className
}: ProductBreadcrumbProps) {
  const { data: pathToCategory } =
    await srProductsService.getCategoryPath(productId);

  const breadcrumbItems = pathToCategory
    .sort((a, b) => (b.depth > a.depth ? 1 : -1))
    .map((category, idx) => ({
      name: category.name,
      link:
        idx === pathToCategory.length - 1
          ? undefined
          : `/category/${category.id}`
    }));

  return <Breadcrumb className={className} items={breadcrumbItems} />;
}
