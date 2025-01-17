'use client';

import { signOut } from '@modules/auth/actions';

import { Button, ButtonProps } from '@components/ui/button';

export type SignOutButtonProps = ButtonProps;

export function SignOutButton(props: SignOutButtonProps) {
  return (
    <Button onClick={signOut} {...props}>
      Sign Out
    </Button>
  );
}
