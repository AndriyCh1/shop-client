import { CheckoutForm } from '@modules/orders/components/checkout-form';
import { CheckoutPageBreadcrumb } from '@modules/orders/components/checkout-page-breadcrumb';

import { ContentContainer } from '@components/shared/content-container';

export default function CheckoutPage() {
  return (
    <ContentContainer>
      <CheckoutPageBreadcrumb className="mt-5" />
      <CheckoutForm />
    </ContentContainer>
  );
}
