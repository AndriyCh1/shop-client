import { useCartStore } from '@modules/cart/stores/use-cart-store';
import {
  CheckoutFormContainer,
  CheckoutFormSkeleton
} from '@modules/orders/components/checkout-form/checkout-form-container';

export function ClientCheckoutForm() {
  const { items: cartItems } = useCartStore();

  if (!useCartStore.persist.hasHydrated) {
    return <CheckoutFormSkeleton />;
  }

  return <CheckoutFormContainer orderItems={cartItems} />;
}
