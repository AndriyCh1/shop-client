import { Separator } from '@components/ui/separator';

export default async function RootLayout({
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
