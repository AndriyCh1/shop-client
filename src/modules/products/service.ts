import 'server-only';

import { serverFetcher } from '@libs/server-fetcher';
import { Paginated, SuccessResponse } from '@libs/types/http';
import { Product, ProductVariant } from '@libs/types/models';

import {
  CategoryPathItem,
  ProductCatalogItem,
  ProductVariantDetails
} from './types';

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

  async getCategoryPath(id: Product['id']) {
    const response = await serverFetcher.get<
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

class ProductVariantService {
  private baseUrl = '/product-variants';

  async getVariantDetails(id: ProductVariant['id']) {
    const response = await serverFetcher.get<
      SuccessResponse<ProductVariantDetails>
    >(`${this.baseUrl}/details/${id}`);

    return response.data;
  }
}
export const productsService = new ProductsService();
export const productVariantService = new ProductVariantService();
