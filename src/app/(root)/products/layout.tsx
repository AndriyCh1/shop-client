import { Separator } from '@components/ui/separator';

export default function RootLayout({
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
