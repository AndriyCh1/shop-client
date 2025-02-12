import { Cart } from '@modules/cart/components/cart';
import { CartPageBreadcrumb } from '@modules/cart/components/cart-page-breadcrumb';

import { ContentContainer } from '@components/shared/content-container';

export default function CartPage() {
  return (
    <ContentContainer>
      <CartPageBreadcrumb className="mt-5" />
      <Cart />
    </ContentContainer>
  );
}
