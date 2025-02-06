'use client';

import { useIsMounted } from '@hooks/use-is-mounted';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { useGetCart } from '@modules/cart/queries';
import { cartKeys } from '@modules/cart/query-keys';
import { useCartStore } from '@modules/cart/stores';

import { CartItems } from './cart-items';
import { EmptyCart } from './empty-cart';
import { OrderSummary } from './order-summary';

export interface CartProps {
  className?: string;
}

export function Cart({ className }: CartProps) {
  const isAuthenticated = !!useSession().data;

  const { data: serverCart, ...getCartQuery } = useGetCart({
    enabled: isAuthenticated
  });

  const cartStore = useCartStore();

  const qetCartProductVariantsQuery = useQuery({
    queryKey: cartKeys.cartProductVariants(),
    enabled: false // We don't want to run this query, we just want to check it's status
  });

  if (!useIsMounted()) return null;

  if (getCartQuery.isLoading || qetCartProductVariantsQuery.isLoading) {
    return <CartSkeleton />;
  }

  const isServerCartEmpty = !getCartQuery.isLoading && !serverCart?.data;
  const isClientCartEmpty = !cartStore.items.length;

  if (
    (isServerCartEmpty && isAuthenticated) ||
    (isClientCartEmpty && !isAuthenticated)
  ) {
    return <EmptyCart />;
  }

  return (
    <div className={className}>
      <h1 className="mt-4 font-integral-cf text-4xl font-bold uppercase">
        Your cart
      </h1>
      <div className="mt-4 flex justify-between gap-3">
        <CartItems className="flex-[3_3_64%] self-start" />
        <OrderSummary className="flex-[1_1_35%] self-start" />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="mt-5 flex gap-3">
      <div className="h-[500px] w-3/5 animate-pulse rounded bg-muted"></div>
      <div className="h-[500px] w-2/5 animate-pulse rounded bg-muted"></div>
    </div>
  );
}
