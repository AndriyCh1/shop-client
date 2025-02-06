'use client';

import { useIsMounted } from '@hooks/use-is-mounted';
import { useSyncWithStorage } from '@hooks/use-sync-with-storage';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import { useAddItemToCart, useGetCart } from '@modules/cart/queries';
import { useCartStore } from '@modules/cart/stores';

import { Button } from '@components/ui/button';
import { QuantityInput } from '@components/ui/quantity-input';

import { ProductVariant } from '@libs/types/models';
import { cn } from '@libs/utils/tw-merge';

export interface AddToCartProps {
  variant: {
    id: ProductVariant['id'];
    name: ProductVariant['name'];
    salePrice: ProductVariant['salePrice'];
    attributes: ProductVariant['attributes'];
    image?: string;
  };
  className?: string;
}

export function AddToCart({ variant, className }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const session = useSession();
  const cartStore = useCartStore();
  const addToCartMutation = useAddItemToCart();
  const isAuthenticated = !!session.data;
  const getCartQuery = useGetCart({ enabled: isAuthenticated });

  useSyncWithStorage('cart', () => useCartStore.persist.rehydrate());

  if (!useIsMounted()) return null;

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      addToCartMutation.mutate({ variantId: variant.id, quantity });
    } else {
      cartStore.addItem(variant.id, quantity);
    }
  };

  const isInServerCart = !!getCartQuery.data?.data?.cartItems.find(
    (item) => item.productVariant?.id === variant.id
  );

  const isInClientCart = !!cartStore.findByProductVariantId(variant.id);

  const renderGoToCartButton = () => {
    return (
      <Button className="h-[52px] w-full rounded-full text-base" asChild>
        <Link href="/cart">Go to cart</Link>
      </Button>
    );
  };

  const renderAddToCart = () => {
    return (
      <>
        <QuantityInput
          className="max-w-[250px] px-4 py-2"
          inputClassName="text-base"
          value={quantity}
          onChange={setQuantity}
          min={1}
        />
        <Button
          className="h-[52px] w-full rounded-full text-base"
          onClick={handleAddToCart}
          disabled={addToCartMutation.isPending}
        >
          Add to cart
        </Button>
      </>
    );
  };

  return (
    <div className={cn('flex items-center justify-between gap-6', className)}>
      {isAuthenticated &&
        isInServerCart &&
        !getCartQuery.isFetching &&
        renderGoToCartButton()}

      {isAuthenticated &&
        !isInServerCart &&
        !getCartQuery.isFetching &&
        renderAddToCart()}

      {!isAuthenticated && isInClientCart && renderGoToCartButton()}

      {!isAuthenticated && !isInClientCart && renderAddToCart()}
    </div>
  );
}
