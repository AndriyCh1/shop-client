import { Category } from '@libs/types/models';

export type CategoryHierarchy = {
  id: Category['id'];
  name: Category['name'];
  description: Category['description'];
  parentId: Category['parentId'];
  depth: number;
};
