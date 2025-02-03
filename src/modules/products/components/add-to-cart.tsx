'use client';

import { useIsMounted } from '@hooks/use-is-mounted';
import { useSyncWithStorage } from '@hooks/use-sync-with-storage';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

import { cartKeys } from '@modules/cart/query-keys';
import { clCartService } from '@modules/cart/services';
import { useCartStore } from '@modules/cart/stores';

import { Button } from '@components/ui/button';
import { QuantityInput } from '@components/ui/quantity-input';

import { ProductVariant } from '@libs/types/models';
import { cn } from '@libs/utils/tw-merge';

export interface AddToCartProps {
  variant: ProductVariant;
  className?: string;
}

export function AddToCart({ variant, className }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const session = useSession();
  const cartStore = useCartStore();
  const { toast } = useToast();
  const isMounted = useIsMounted();

  useSyncWithStorage('cart', () => useCartStore.persist.rehydrate());

  const isAuthenticated = !!session.data;

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: () => clCartService.addToCart(variant.id, quantity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() }),
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: isAxiosError(error)
          ? error.response?.data.message
          : error.message
      });
    }
  });

  const getCartQuery = useQuery({
    queryKey: cartKeys.cart(),
    queryFn: () => clCartService.getCart(),
    enabled: isAuthenticated
  });

  if (!isMounted) return null; // SSR - prevent hydration error

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      addToCartMutation.mutate();
    } else {
      cartStore.addToCart(variant, quantity);
    }
  };

  const isInRemoteCart = !!getCartQuery.data?.data.cartItems.find(
    (item) => item.productVariant?.id === variant.id
  );

  const isInLocalCart = !!cartStore.findProductById(variant.id);

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
        isInRemoteCart &&
        !getCartQuery.isFetching &&
        renderGoToCartButton()}

      {isAuthenticated &&
        !isInRemoteCart &&
        !getCartQuery.isFetching &&
        renderAddToCart()}

      {!isAuthenticated && isInLocalCart && renderGoToCartButton()}

      {!isAuthenticated && !isInLocalCart && renderAddToCart()}
    </div>
  );
}
