import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuTrigger
} from '@components/ui/navigation-menu';

import { NestedCategory } from '@libs/utils/categories';

import { CategoriesPanel, NavLink } from './';

export interface CategoriesMenuProps {
  categories: NestedCategory[];
}

export function NavigationMenu({ categories }: CategoriesMenuProps) {
  return (
    <NavigationMenuPrimitive className="z-[500] mx-1 hidden lg:mx-4 lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm lg:text-base">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <CategoriesPanel categories={categories} />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavLink link="/sale" name=" On Sale" />
        <NavLink link="/new-arrivals" name="New Arrivals" />
        <NavLink link="/contacts" name="Contacts" />
      </NavigationMenuList>
    </NavigationMenuPrimitive>
  );
}
