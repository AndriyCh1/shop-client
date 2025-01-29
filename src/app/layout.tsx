import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { getSession } from '@modules/auth/services';

import { Toaster } from '@components/ui/toaster';

import { ReactQueryClientProvider } from '@libs/providers/react-query-client-provider';

import { integralCf, satoshi } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop with us'
};

export default async function GlobalLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${integralCf.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <SessionProvider
            basePath={'/api/auth'}
            session={session}
            key={session?.user?.id} // Without the `key`, the session data is not updated on the client
          >
            {children}
            <Toaster />
          </SessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
