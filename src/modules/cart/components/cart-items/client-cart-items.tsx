import { useGetCartProductVariants } from '@modules/cart/queries/use-get-cart-product-variants';
import { useCartStore } from '@modules/cart/stores/use-cart-store';
import { ClientCartItem, UpdateCartData } from '@modules/cart/types';
import { mergeCartItemsWithVariants } from '@modules/cart/utils';

import { Item } from './cart-item-container';
import { CartItemsContainer } from './cart-items-container';

export interface ClientCartItemsProps {
  className?: string;
}

export function ClientCartItems({ className }: ClientCartItemsProps) {
  const { items, removeItem, updateItem } = useCartStore();

  const handleRemoveItem = (id: Item['id']) => {
    removeItem(id as ClientCartItem['id']);
  };

  const handleUpdateItem = (id: Item['id'], data: UpdateCartData) => {
    updateItem(id as ClientCartItem['id'], data);
  };

  const { data: productVariants } = useGetCartProductVariants({
    ids: items.map((item) => item.productVariantId)
  });

  const extendedItems = mergeCartItemsWithVariants(
    items,
    productVariants ? productVariants.data : []
  );

  const mappedCartItems = extendedItems.map((item): Item => {
    return {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.salePrice,
        attributes: item.product.attributes as Record<string, string>,
        stockQuantity: item.product.stockQuantity,
        image: item.product.images.length
          ? item.product.images[0].image
          : undefined
      }
    };
  });

  return (
    <CartItemsContainer
      className={className}
      items={mappedCartItems}
      onItemRemove={handleRemoveItem}
      onItemUpdate={handleUpdateItem}
    />
  );
}
