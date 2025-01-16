import { CategoryHierarchy } from '@modules/categories/types';

export type NestedCategory = CategoryHierarchy & {
  children: NestedCategory[];
};

export function nestCategories(
  categories: CategoryHierarchy[],
  parentId: number | null = null,
  toDepth?: number
): NestedCategory[] {
  if (toDepth !== undefined && toDepth <= 1) {
    return categories.map((category) => ({ ...category, children: [] }));
  }

  const parentCategories = categories.filter(
    (category) => category.parentId === parentId
  );

  return parentCategories.map((category) => ({
    ...category,
    children: nestCategories(
      categories,
      category.id,
      toDepth !== undefined ? toDepth - 1 : toDepth
    )
  }));
}
