import { CreateOrderData } from '@modules/orders/types';

import { clientFetcher } from '@libs/client-fetcher';
import { serverFetcher } from '@libs/server-fetcher';
import { HttpClient, SuccessResponse } from '@libs/types/http';
import { Order } from '@libs/types/models';

class OrdersService {
  private readonly baseUrl = '/orders';

  constructor(private readonly httpClient: HttpClient) {}

  async createOrder(payload: CreateOrderData) {
    const response = await this.httpClient.post<SuccessResponse<Order>>(
      this.baseUrl,
      payload
    );

    return response.data;
  }
}

export const clOrdersService = new OrdersService(clientFetcher);
export const srOrdersService = new OrdersService(serverFetcher);
