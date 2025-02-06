import 'server-only';

import { serverFetcher } from '@libs/server-fetcher';
import { SuccessResponse } from '@libs/types/http';

import { CategoryHierarchyItem } from '../types';

class CategoriesService {
  async getCategoriesHierarchy() {
    const response = await serverFetcher.get<
      SuccessResponse<CategoryHierarchyItem[]>
    >('/categories/hierarchy');

    return response.data;
  }
}

export const categoriesService = new CategoriesService();
