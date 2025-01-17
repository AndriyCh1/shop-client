import 'server-only';

import { serverFetcher } from '@libs/services';
import { SuccessResponse } from '@libs/types/http';

import { CategoryHierarchy } from './types';

class CategoriesService {
  async getCategoriesHierarchy() {
    const response = await serverFetcher.get<
      SuccessResponse<CategoryHierarchy[]>
    >('/categories/hierarchy');

    return response.data;
  }
}

export const categoriesService = new CategoriesService();
