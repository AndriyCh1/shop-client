import { CircleUser, Menu, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@components/ui/sheet';

import { NestedCategory } from '@libs/utils/categories';

import { CategoriesAccordion } from './';

export interface BurgerMenuProps {
  categories: NestedCategory[];
}

export function BurgerMenu({ categories }: BurgerMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer lg:hidden" size={30} role="button" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-4 text-start">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            <span className="text-sm">
              Select a category, sign in or go to your cart
            </span>
          </SheetDescription>
        </SheetHeader>
        <CategoriesAccordion categories={categories} />
        <Link
          href="/cart"
          className="mt-4 flex items-center gap-2 py-2 hover:font-medium"
        >
          <ShoppingCart size={20} />
          <span className="text-sm">Cart</span>
        </Link>
        <Link
          href="/sign-in"
          className="flex items-center gap-2 py-2 hover:font-medium"
        >
          <CircleUser size={20} />
          <span className="text-sm">Sign In</span>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
