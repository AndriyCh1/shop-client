import { useGetCartProductVariants } from '@modules/cart/queries';
import { useCartStore } from '@modules/cart/stores';
import { mergeCartItemsWithVariants } from '@modules/cart/utils';

import { OrderSummaryContainer } from './order-summary-container';

const DELIVERY_FEE = 0;

interface ClientOrderSummaryProps {
  className?: string;
}

export function ClientOrderSummary({ className }: ClientOrderSummaryProps) {
  const { items } = useCartStore();

  const { data: productVariants } = useGetCartProductVariants({
    ids: items.map((item) => item.productVariantId)
  });

  if (!items?.length) {
    return null;
  }

  const extendedItems = mergeCartItemsWithVariants(
    items,
    productVariants ? productVariants.data : []
  );

  const subTotal = extendedItems.reduce((total, item) => {
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
