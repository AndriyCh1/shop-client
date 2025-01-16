import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import { getSession } from '@modules/auth/services';

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
        <SessionProvider basePath={'/api/auth'} session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
