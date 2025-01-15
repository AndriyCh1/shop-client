'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { signOut } from '@modules/auth/actions';

export default function SignOutPage() {
  const router = useRouter();

  async function signOutAction() {
    await signOut();
    router.push('/');
  }

  useEffect(() => {
    signOutAction();
  }, []);

  return <></>;
}
