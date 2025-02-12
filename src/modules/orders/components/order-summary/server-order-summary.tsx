import { useGetCart } from '@modules/cart/queries/use-get-cart';

import { OrderSummaryContainer } from './order-summary-container';

const DELIVERY_FEE = 0;

interface ServerOrderSummaryProps {
  className?: string;
}

export function ServerOrderSummary({ className }: ServerOrderSummaryProps) {
  const { data: cart } = useGetCart();

  const cartItems = cart?.data?.cartItems;

  if (!cartItems?.length) {
    return null;
  }

  const subTotal = cartItems.reduce((total, item) => {
    return total + item.productVariant.salePrice * item.quantity;
  }, 0);

  return (
    <OrderSummaryContainer
      className={className}
      subTotal={subTotal}
      deliveryFee={DELIVERY_FEE}
    />
  );
}
