import { ClientCartItem } from '@modules/cart/types';

import { ProductVariant } from '@libs/types/models';

interface MergedCartItem extends ClientCartItem {
  product: ProductVariant;
}

export function mergeCartItemsWithVariants(
  items: ClientCartItem[],
  productVariants: ProductVariant[]
): MergedCartItem[] {
  const variantMap = new Map(
    productVariants.map((variant) => [variant.id, variant])
  );

  const mergedItems = items
    .map((item) => ({
      ...item,
      product: variantMap.get(item.productVariantId)
    }))
    .filter((item) => item.product) as MergedCartItem[];

  return mergedItems;
}
