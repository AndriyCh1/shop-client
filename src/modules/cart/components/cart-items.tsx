'use client';

import { useSession } from 'next-auth/react';

import { ClientCartItems } from '@modules/cart/components/cart-items/client-cart-items';
import { ServerCartItems } from '@modules/cart/components/cart-items/server-cart-items';

export interface CartItemsProps {
  className?: string;
}

export function CartItems({ className }: CartItemsProps) {
  const isAuthenticated = !!useSession().data;

  if (isAuthenticated) {
    return <ServerCartItems className={className} />;
  }

  return <ClientCartItems className={className} />;
}
