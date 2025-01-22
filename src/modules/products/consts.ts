export const PRODUCT_ATTRIBUTE_KEYS = [
  'color',
  'size',
  'weight',
  'height',
  'length',
  'width'
] as const;

export type ProductAttributeKey = (typeof PRODUCT_ATTRIBUTE_KEYS)[number];
