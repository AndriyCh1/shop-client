'use client';

import { UserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { AuthModal } from '@modules/auth/components/auth-modal';
import { SignOutButton } from '@modules/auth/components/sign-out-button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu';

export function UserButton() {
  const session = useSession();
  const isAuthenticated = !!session?.data?.user;
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  return (
    <>
      {!isAuthenticated && (
        <button
          type="button"
          className="rounded-full border border-transparent p-1.5 outline-none hover:border hover:border-secondary hover:bg-secondary"
          onClick={() => setOpenAuthDialog(true)}
        >
          <UserRound className="hidden lg:block" />
        </button>
      )}

      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full border border-transparent p-1.5 outline-none hover:border hover:border-secondary hover:bg-secondary"
            >
              <UserRound className="hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SignOutButton
                  variant="ghost"
                  className="h-2 w-full cursor-default justify-start px-0 font-normal hover:bg-transparent focus:outline-none"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <AuthModal open={openAuthDialog} onOpenChange={setOpenAuthDialog} />
    </>
  );
}
