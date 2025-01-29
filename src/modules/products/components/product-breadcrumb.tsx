import React from 'react';

import { srProductsService } from '@modules/products/services';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/ui/breadcrumb';

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

  const pathToCategoryBreadcrumbs = pathToCategory
    .sort((a, b) => (b.depth > a.depth ? 1 : -1))
    .map((category) => ({
      name: category.name,
      href: `/categories/${category.id}`
    }));

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {pathToCategoryBreadcrumbs.map((breadcrumb, idx) => {
          const isLast = idx === pathToCategoryBreadcrumbs.length - 1;

          return (
            <React.Fragment key={breadcrumb.name}>
              <BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.name}
                  </BreadcrumbLink>
                )}
                {isLast && <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
