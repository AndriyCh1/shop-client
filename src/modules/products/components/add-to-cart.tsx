'use client';

import { useSyncWithStorage } from '@hooks/use-sync-with-storage';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
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
  const cartStore = useCartStore();
  const session = useSession();
  const { toast } = useToast();
  useSyncWithStorage('cart', () => useCartStore.persist.rehydrate());

  const queryClient = useQueryClient();

  const queryMutation = useMutation({
    mutationFn: () => clCartService.addToCart(variant.id, quantity),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() }),
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        description: isAxiosError(error)
          ? error.response?.data.message
          : error.message
      });
    }
  });

  const handleAddToCart = async () => {
    if (session?.data) {
      queryMutation.mutate();
    } else {
      cartStore.addToCart(variant, quantity);
    }
  };

  return (
    <div className={cn('flex items-center justify-between gap-6', className)}>
      <QuantityInput
        className="w-[250px] px-4 py-2"
        inputClassName="text-base"
        value={quantity}
        onChange={setQuantity}
        min={1}
      />
      <Button
        className="h-[52px] w-full rounded-full text-base"
        onClick={handleAddToCart}
        disabled={queryMutation.isPending}
      >
        Add to Cart
      </Button>
    </div>
  );
}
