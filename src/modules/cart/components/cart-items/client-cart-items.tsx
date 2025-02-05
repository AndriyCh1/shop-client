import { CartItem, useCartStore } from '@modules/cart/stores';
import { UpdateCartData } from '@modules/cart/types';

import { Item } from './cart-item-container';
import { CartItemsContainer } from './cart-items-container';

export interface ClientCartItemsProps {
  className?: string;
}

export function ClientCartItems({ className }: ClientCartItemsProps) {
  const {
    items,
    removeItem: removeFromCart,
    updateItem: updateCartItem
  } = useCartStore();

  const handleRemoveItem = (id: Item['id']) => {
    removeFromCart(id as CartItem['id']);
  };

  const handleUpdateItem = (id: Item['id'], data: UpdateCartData) => {
    updateCartItem(id as CartItem['id'], data);
  };

  const mappedCartItems = items.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        price: item.product.salePrice,
        attributes: item.product.attributes,
        image: item.product.image
      }
    } as Item;
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
