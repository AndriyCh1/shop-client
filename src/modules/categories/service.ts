import 'server-only';

import httpClient from '@libs/services/http-client';
import { SuccessResponse } from '@libs/types/http';

import { CategoryHierarchy } from './types';

class CategoriesService {
  async getCategoriesHierarchy() {
    const response = await httpClient.get<SuccessResponse<CategoryHierarchy[]>>(
      '/categories/hierarchy'
    );

    return response.data;
  }
}

export const categoriesService = new CategoriesService();
