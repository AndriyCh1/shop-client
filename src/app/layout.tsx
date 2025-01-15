import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';

import { getSession } from '@modules/auth/services';

import './globals.css';

const integralCf = localFont({
  src: [
    {
      path: '../../public/fonts/Integralcf-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Integralcf-Extrabold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Integralcf-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Integralcf-Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-integral-cf'
});

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Satoshi-BlackItalic.woff2',
      weight: '900',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Satoshi-LightItalic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Satoshi-Variable.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../public/fonts/Satoshi-VariableItalic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  variable: '--font-satoshi'
});

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
