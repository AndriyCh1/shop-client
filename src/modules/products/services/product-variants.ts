import { ProductVariantDetails } from '@modules/products/types';

import { serverFetcher } from '@libs/server-fetcher';
import { SuccessResponse } from '@libs/types/http';
import { ProductVariant } from '@libs/types/models';

class ProductVariantService {
  private baseUrl = '/product-variants';

  async getVariantDetails(id: ProductVariant['id']) {
    const response = await serverFetcher.get<
      SuccessResponse<ProductVariantDetails>
    >(`${this.baseUrl}/details/${id}`);

    return response.data;
  }
}
export const productVariantService = new ProductVariantService();
