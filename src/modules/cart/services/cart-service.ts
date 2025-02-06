import { UpdateCartData } from '@modules/cart/types';

import { clientFetcher } from '@libs/client-fetcher';
import { serverFetcher } from '@libs/server-fetcher';
import { HttpClient, SuccessResponse } from '@libs/types/http';
import { Cart } from '@libs/types/models';

export class CartService {
  private readonly baseUrl = '/cart';

  constructor(private readonly httpClient: HttpClient) {}

  async getCart() {
    const response = await this.httpClient.get<SuccessResponse<Cart | null>>(
      this.baseUrl
    );

    return response.data;
  }

  async addToCart(productVariantId: number, quantity: number) {
    const response = await this.httpClient.post(`${this.baseUrl}/items`, {
      productVariantId,
      quantity
    });

    return response.data;
  }

  async updateItem(itemId: number, data: UpdateCartData) {
    const response = await this.httpClient.patch(
      `${this.baseUrl}/items/${itemId}`,
      data
    );

    return response.data;
  }

  async removeItem(itemId: number) {
    const response = await this.httpClient.delete(
      `${this.baseUrl}/items/${itemId}`
    );

    return response.data;
  }
}

export const srCartService = new CartService(serverFetcher);
export const clCartService = new CartService(clientFetcher);
