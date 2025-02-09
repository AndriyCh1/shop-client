export const cartKeys = {
  cart: () => ['cart'],
  cartProductVariants: () => [...cartKeys.cart(), 'product-variants']
};
