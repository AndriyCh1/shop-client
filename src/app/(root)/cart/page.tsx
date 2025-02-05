import { Cart } from '@modules/cart/components/cart';
import { PageBreadcrumb } from '@modules/cart/components/page-breadcrumb';

import { ContentContainer } from '@components/shared/content-container';

export default function CartPage() {
  return (
    <ContentContainer>
      <PageBreadcrumb className="mt-5" />
      <Cart />
    </ContentContainer>
  );
}
