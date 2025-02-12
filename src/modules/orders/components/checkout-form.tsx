'use client';

import { useSession } from 'next-auth/react';

import { ClientCheckoutForm } from '@modules/orders/components/checkout-form/client-checkout-form';
import { ServerCheckoutForm } from '@modules/orders/components/checkout-form/server-checkout-form';

export function CheckoutForm() {
  const isAuthenticated = !!useSession().data;

  if (!isAuthenticated) {
    return <ClientCheckoutForm />;
  }

  return <ServerCheckoutForm />;
}
