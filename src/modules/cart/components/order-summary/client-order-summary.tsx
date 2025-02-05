import { useCartStore } from '@modules/cart/stores';

import { OrderSummaryContainer } from './order-summary-container';

const DELIVERY_FEE = 0;

interface ClientOrderSummaryProps {
  className?: string;
}

export function ClientOrderSummary({ className }: ClientOrderSummaryProps) {
  const { items } = useCartStore();

  if (!items?.length) {
    return null;
  }

  const subTotal = items.reduce((total, item) => {
    return total + item.product.salePrice * item.quantity;
  }, 0);

  return (
    <OrderSummaryContainer
      className={className}
      subTotal={subTotal}
      deliveryFee={DELIVERY_FEE}
    />
  );
}
