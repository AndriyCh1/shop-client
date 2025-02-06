import { CategoryPathItem, ProductCatalogItem } from '@modules/products/types';

import { clientFetcher } from '@libs/client-fetcher';
import { serverFetcher } from '@libs/server-fetcher';
import { HttpClient, Paginated, SuccessResponse } from '@libs/types/http';
import { Product, ProductVariant } from '@libs/types/models';

class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = '/products';

  async getCatalog() {
    const response = await this.httpClient.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/catalog`);

    return response.data;
  }

  async getNewArrivals() {
    const response = await this.httpClient.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/new-arrivals`);

    return response.data;
  }

  async getBestSellers() {
    const response = await this.httpClient.get<
      SuccessResponse<Paginated<ProductCatalogItem>>
    >(`${this.baseUrl}/best-sellers`);

    return response.data;
  }

  async getCategoryPath(id: Product['id']) {
    const response = await this.httpClient.get<
      SuccessResponse<CategoryPathItem[]>
    >(`${this.baseUrl}/${id}/category-path`);

    return response.data;
  }

  async getProductVariants(id: Product['id']) {
    const response = await serverFetcher.get<SuccessResponse<ProductVariant[]>>(
      `${this.baseUrl}/${id}/variants`
    );

    return response.data;
  }
}

const srProductsService = new ProductsService(serverFetcher);
const clProductsService = new ProductsService(clientFetcher);

export { srProductsService, clProductsService };
