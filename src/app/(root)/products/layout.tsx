import { Separator } from '@components/ui/separator';

export default async function ProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Separator />
      {children}
    </>
  );
}
