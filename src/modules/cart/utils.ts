import { CartItem } from '@modules/cart/stores';

import { ProductVariant } from '@libs/types/models';

export interface MergedCartItem extends CartItem {
  product: ProductVariant;
}

export function mergeCartItemsWithVariants(
  items: CartItem[],
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
