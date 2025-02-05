'use client';

import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { useGetCart } from '@modules/cart/queries';
import { useCartStore } from '@modules/cart/stores';

export function ShoppingCart() {
  const clientCart = useCartStore();
  const session = useSession();
  const isAuthenticated = !!session.data;
  const {
    data: serverCart,
    isLoading: isServerCartLoading,
    error: serverCartError,
    isError: isServerCartError
  } = useGetCart({ enabled: isAuthenticated });

  if (isServerCartError) {
    throw serverCartError;
  }

  const cartItemsCount = serverCart
    ? serverCart.data?.cartItems.length || 0
    : clientCart.totalItems;

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon />
      {cartItemsCount > 0 && !isServerCartLoading && (
        <span className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-[12px] text-white">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
}
