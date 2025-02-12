import { useSession } from 'next-auth/react';

import { ClientOrderSummary } from '@modules/orders/components/order-summary/client-order-summary';
import { ServerOrderSummary } from '@modules/orders/components/order-summary/server-order-summary';

export interface OrderSummaryProps {
  className?: string;
}

export function OrderSummary({ className }: OrderSummaryProps) {
  const isAuthenticated = !!useSession().data;

  if (isAuthenticated) {
    return <ServerOrderSummary className={className} />;
  }

  return <ClientOrderSummary className={className} />;
}
