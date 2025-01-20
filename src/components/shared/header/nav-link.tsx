import Link from 'next/link';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@components/ui/navigation-menu';

import { cn } from '@libs/utils/tw-merge';

export interface NavLinkProps {
  link: string;
  name: string;
  className?: string;
}

export function NavLink({ link, name, className }: NavLinkProps) {
  return (
    <NavigationMenuItem>
      <Link href={link} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            'text-sm lg:text-base',
            className
          )}
        >
          <span className="crawl-underline">{name}</span>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
