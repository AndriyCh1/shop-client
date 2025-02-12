import { useGetCart } from '@modules/cart/queries/use-get-cart';
import {
  CheckoutFormContainer,
  CheckoutFormSkeleton
} from '@modules/orders/components/checkout-form/checkout-form-container';

export function ServerCheckoutForm() {
  const { data: cartItems, isPending } = useGetCart();

  if (isPending) {
    return <CheckoutFormSkeleton />;
  }

  return (
    <CheckoutFormContainer
      orderItems={
        cartItems?.data?.cartItems.map((item) => ({
          productVariantId: item.productVariant.id,
          quantity: item.quantity
        })) || []
      }
    />
  );
}
