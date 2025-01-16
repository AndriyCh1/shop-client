import Link from 'next/link';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@components/ui/navigation-menu';

import { NestedCategory } from '@libs/utils/categories';
import { cn } from '@libs/utils/tw-merge';

import { CategoriesPanel } from './';

export interface CategoriesMenuProps {
  categories: NestedCategory[];
}

export function NavigationMenu({ categories }: CategoriesMenuProps) {
  return (
    <NavigationMenuPrimitive className="mx-1 hidden lg:mx-4 lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm lg:text-base">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CategoriesPanel categories={categories} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sale" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-sm lg:text-base'
              )}
            >
              On Sale
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/new-arrivals" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-sm lg:text-base'
              )}
            >
              New Arrivals
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                'text-sm lg:text-base'
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuPrimitive>
  );
}
