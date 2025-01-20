import 'server-only';

import { ProductCatalogItem } from '@modules/products/types';

import { serverFetcher } from '@libs/server-fetcher';
import { Paginated, SuccessResponse } from '@libs/types/http';

class ProductsService {
  private baseUrl = '/products';

  async getCatalog() {
    const response = await serverFetcher.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/catalog`);

    return response.data;
  }

  async getNewArrivals() {
    const response = await serverFetcher.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/new-arrivals`);

    return response.data;
  }

  async getBestSellers() {
    const response = await serverFetcher.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/best-sellers`);

    return response.data;
  }
}

export const productsService = new ProductsService();
