import { Breadcrumb } from '@components/shared/breadcrumb';

interface PageBreadcrumbProps {
  className?: string;
}

export function CheckoutPageBreadcrumb({ className }: PageBreadcrumbProps) {
  return (
    <Breadcrumb
      className={className}
      items={[
        { name: 'Home', link: '/' },
        { name: 'Cart', link: '/cart' },
        { name: 'Checkout' }
      ]}
    />
  );
}
