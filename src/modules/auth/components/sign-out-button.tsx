'use client';

import { useQueryClient } from '@tanstack/react-query';

import { signOut } from '@modules/auth/actions';
import { cartKeys } from '@modules/cart/consts/query-keys';

import { Button, ButtonProps } from '@components/ui/button';

export type SignOutButtonProps = ButtonProps;

export function SignOutButton(props: SignOutButtonProps) {
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    queryClient.setQueriesData({ queryKey: cartKeys.cart() }, null);
    await signOut();
  };

  return (
    <Button onClick={handleSignOut} {...props}>
      Sign Out
    </Button>
  );
}
