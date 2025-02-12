import { Breadcrumb } from '@components/shared/breadcrumb';

interface PageBreadcrumbProps {
  className?: string;
}

export function CartPageBreadcrumb({ className }: PageBreadcrumbProps) {
  return (
    <Breadcrumb
      className={className}
      items={[{ name: 'Home', link: '/' }, { name: 'Cart' }]}
    />
  );
}
