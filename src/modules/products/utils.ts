import { ProductAttributeKey } from '@modules/products/consts';

import { ProductVariant } from '@libs/types/models';

export function isMatchingAttributes(
  attributesA: ProductVariant['attributes'],
  attributesB: ProductVariant['attributes']
) {
  return JSON.stringify(attributesA) === JSON.stringify(attributesB);
}

export function hasAttributeOverlap(
  attributesA: ProductVariant['attributes'],
  attributesB: ProductVariant['attributes']
): boolean {
  const attributeKeys = Object.keys(attributesA) as ProductAttributeKey[];
  return attributeKeys.some((key) => {
    return (
      attributesA[key] &&
      attributesB[key] &&
      attributesA[key] === attributesB[key]
    );
  });
}

interface MatchingOptionVariant {
  attributes: ProductVariant['attributes'];
  stockQuantity: ProductVariant['stockQuantity'];
}

export function getVariantMatchingOptions(
  variants: MatchingOptionVariant[],
  variant: MatchingOptionVariant
) {
  return variants.reduce(
    (acc, v) => {
      const inStock = v.stockQuantity > 0;
      const overlap = hasAttributeOverlap(v.attributes, variant.attributes);
      acc.push({ ...v.attributes, _exists: overlap, _inStock: inStock });
      return acc;
    },
    [] as Array<Record<string, unknown>>
  );
}
