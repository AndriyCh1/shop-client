import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { categoriesService } from '@modules/categories/service';

import { ContentContainer } from '@components/shared/content-container';

import { nestCategories } from '@libs/utils/categories';

import { BurgerMenu, NavigationMenu, SearchInput, UserButton } from './';

export async function Header() {
  const categories = await categoriesService.getCategoriesHierarchy();
  const nestedCategories = nestCategories(categories.data);

  return (
    <header>
      <ContentContainer>
        <div className="flex items-center justify-between gap-2 py-4 sm:gap-6 lg:gap-2">
          <BurgerMenu categories={nestedCategories} />
          <Link href="/" className="hidden xs:block">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={140}
              className="min-w-[100px]"
            />
          </Link>
          <NavigationMenu categories={nestedCategories} />
          <SearchInput />
          <div className="flex items-center gap-2 px-2">
            <ShoppingCart />
            <UserButton />
          </div>
        </div>
      </ContentContainer>
    </header>
  );
}
