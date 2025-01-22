import { ProductAttributeKey } from '@modules/products/consts';

import { ProductVariant } from '@libs/types/models';

export function findVariantByAttributes(
  variants: ProductVariant[],
  attributes: ProductVariant['attributes']
) {
  return variants.find(
    (variant) =>
      JSON.stringify(variant.attributes) === JSON.stringify(attributes)
  );
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

export function getVariantMatchingOptions(
  variants: ProductVariant[],
  variant: ProductVariant
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
