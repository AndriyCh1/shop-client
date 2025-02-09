import { ProductVariant } from '@libs/types/models';

export type UpdateCartData = {
  quantity: number;
};

export type ClientCartItem = {
  id: string;
  productVariantId: ProductVariant['id'];
  quantity: number;
};
