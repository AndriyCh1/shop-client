'use client';

import { useGetCart } from '@modules/cart/queries/use-get-cart';
import { useRemoveCartItem } from '@modules/cart/queries/use-remove-cart-item';
import { useUpdateCartItem } from '@modules/cart/queries/use-update-cart-item';
import { UpdateCartData } from '@modules/cart/types';

import { Item } from './cart-item-container';
import { CartItemsContainer } from './cart-items-container';

export interface ServerCartItemsProps {
  className?: string;
}

export function ServerCartItems({ className }: ServerCartItemsProps) {
  const { data: serverCart } = useGetCart();

  const updateItemMutation = useUpdateCartItem();
  const removeItemMutation = useRemoveCartItem();

  const handleRemoveItem = (id: Item['id']) => {
    removeItemMutation.mutate(+id);
  };

  const handleUpdateItem = (id: Item['id'], data: UpdateCartData) => {
    updateItemMutation.mutate({ itemId: +id, ...data });
  };

  if (!serverCart) {
    return null;
  }

  const mappedCartItems =
    serverCart.data?.cartItems.map((item): Item => {
      const sortedImagesByCreationDate = item.productVariant.images.toSorted(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      return {
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.productVariant.id,
          name: item.productVariant.name,
          price: item.productVariant.salePrice,
          attributes: item.productVariant.attributes,
          stockQuantity: item.productVariant.stockQuantity,
          image:
            sortedImagesByCreationDate.length > 0
              ? sortedImagesByCreationDate[0].image
              : undefined
        }
      } as Item;
    }) || [];

  return (
    <CartItemsContainer
      className={className}
      items={mappedCartItems}
      onItemRemove={handleRemoveItem}
      onItemUpdate={handleUpdateItem}
    />
  );
}
