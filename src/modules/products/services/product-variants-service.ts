import qs from 'qs';

import {
  GetVariantsOptions,
  ProductVariantDetails
} from '@modules/products/types';

import { clientFetcher } from '@libs/client-fetcher';
import { serverFetcher } from '@libs/server-fetcher';
import { HttpClient, SuccessResponse } from '@libs/types/http';
import { ProductVariant } from '@libs/types/models';

class ProductVariantService {
  private baseUrl = '/product-variants';

  constructor(private readonly httpClient: HttpClient) {}

  async getVariants(options: GetVariantsOptions = {}) {
    const path = `${this.baseUrl}?${qs.stringify({ ids: options.ids })}`;

    const response =
      await this.httpClient.get<SuccessResponse<ProductVariant[]>>(path);

    return response.data;
  }

  async getVariantDetails(id: ProductVariant['id']) {
    const response = await this.httpClient.get<
      SuccessResponse<ProductVariantDetails>
    >(`${this.baseUrl}/details/${id}`);

    return response.data;
  }
}
export const srProductVariantService = new ProductVariantService(serverFetcher);
export const clProductVariantService = new ProductVariantService(clientFetcher);
