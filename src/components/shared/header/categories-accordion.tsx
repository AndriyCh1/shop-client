import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@components/ui/accordion';

import { NestedCategory } from '@libs/utils/categories';
import { cn } from '@libs/utils/tw-merge';

export interface CategoriesAccordionProps {
  categories: NestedCategory[];
}

const LEAF_LEVEL = 3;

export function CategoriesAccordion({ categories }: CategoriesAccordionProps) {
  const renderLeaf = (leafs: NestedCategory[]) => {
    return leafs.map((category) => (
      <li key={category.id}>
        <Link href={`/category/${category.id}`} className="font-medium">
          {category.name}
        </Link>
      </li>
    ));
  };

  const renderLevels = (categories: NestedCategory[], level: number = 1) => {
    if (level + 1 > LEAF_LEVEL) {
      return <ul className="pl-2">{renderLeaf(categories)}</ul>;
    }

    return categories.map((child) => (
      <Accordion
        key={child.id}
        type="single"
        collapsible
        className={cn('w-full', { 'pl-2': level > 1 })}
      >
        <AccordionItem value={child.name}>
          <AccordionTrigger className="py-3 hover:no-underline">
            {child.name}
          </AccordionTrigger>
          <AccordionContent>
            <Link
              href={`/category/${child.id}`}
              className="block pb-2 font-semibold italic underline underline-offset-4"
            >
              {child.name}
            </Link>
            {renderLevels(child.children, level + 1)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ));
  };

  return renderLevels(categories);
}
