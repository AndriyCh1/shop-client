'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { NestedCategory } from '@libs/utils/categories';
import { cn } from '@libs/utils/tw-merge';

interface CategoriesMenuProps {
  categories: NestedCategory[];
}

export function CategoriesPanel({ categories }: CategoriesMenuProps) {
  const [currentCategoryIdx, setCurrentCategoryIdx] = useState(0);

  return (
    <div className="flex max-h-[500px] w-full max-w-7xl rounded-sm bg-[#fcfcfd] py-1 text-sm">
      <ul className="w-[200px] border-r-2 border-r-[#e5e5e5] md:w-[300px]">
        {categories
          .filter((category) => !category.parentId)
          .map((category, idx) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.id}`}
                className={cn(
                  'flex items-center justify-between gap-2 py-2 pl-4 pr-2',
                  { 'font-medium': currentCategoryIdx === idx }
                )}
                onMouseEnter={() => setCurrentCategoryIdx(idx)}
              >
                {category.name}
                <ChevronRight width={15} />
              </Link>
            </li>
          ))}
      </ul>
      <ul className="xs:w-[35vw] w-[25vw] px-4 py-2 sm:w-[40vw] md:w-[50vw]">
        {categories.length > 0 && (
          <div className="flex h-full w-fit flex-col flex-wrap items-start justify-start gap-4">
            {categories[currentCategoryIdx].children.map((secondLevel) => (
              <li key={secondLevel.id}>
                <Link
                  href={`/category/${secondLevel.id}`}
                  className="pb-16 font-medium"
                >
                  {secondLevel.name}
                </Link>
                <ul>
                  {secondLevel.children.map((leaf) => (
                    <li key={leaf.id} className="leading-none">
                      <Link href={`/category/${leaf.id}`} className="text-sm">
                        {leaf.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}
