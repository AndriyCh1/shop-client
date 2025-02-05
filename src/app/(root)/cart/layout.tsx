import { Separator } from '@components/ui/separator';

export default async function CartLayout({
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
