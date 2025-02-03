'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { cartKeys } from '@modules/cart/query-keys';
import { clCartService } from '@modules/cart/services';
import { useCartStore } from '@modules/cart/stores';

export function ShoppingCart() {
  const clientCart = useCartStore();
  const session = useSession();
  const isAuthenticated = !!session.data;
  const {
    data: serverCart,
    isPending: isServerCartPending,
    fetchStatus,
    error,
    isError
  } = useQuery({
    queryKey: cartKeys.cart(),
    queryFn: () => clCartService.getCart(),
    enabled: isAuthenticated
  });

  if (isError) {
    throw error;
  }

  const cartItemsCount = serverCart
    ? serverCart.data.cartItems.length
    : clientCart.totalItems;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon />
      {cartItemsCount > 0 &&
        (fetchStatus === 'idle' || !isServerCartPending) && (
          <span className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[12px] text-white">
            {cartItemsCount}
          </span>
        )}
    </Link>
  );
}
