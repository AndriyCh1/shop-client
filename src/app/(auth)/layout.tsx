import Image from 'next/image';

import { cn } from '@libs/utils/tw-merge';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="text-light-100 relative flex flex-col sm:flex-row">
      <section className="sticky top-0 h-40 sm:h-screen sm:w-1/2">
        <Image
          src="/images/auth-page-photo.png"
          className="size-full object-cover"
          alt="Auth page photo"
          height={1000}
          width={1000}
        />
      </section>
      <section
        className={cn(
          'my-auto flex h-full items-center justify-center',
          'min-h-[calc(100vh-12rem)] px-5 sm:min-h-screen sm:w-1/2 sm:py-10'
        )}
      >
        <div className="mx-auto">{children}</div>
      </section>
    </main>
  );
}
