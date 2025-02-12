import {
  CreatePaymentIntentData,
  CreatePaymentIntentResponse
} from '@modules/payments/types';

import { clientFetcher } from '@libs/client-fetcher';
import { serverFetcher } from '@libs/server-fetcher';
import { HttpClient, SuccessResponse } from '@libs/types/http';

class PaymentService {
  private readonly baseUrl = '/payments';
  constructor(private readonly httpClient: HttpClient) {}

  async createPaymentIntent(
    data: CreatePaymentIntentData
  ): Promise<SuccessResponse<CreatePaymentIntentResponse>> {
    const response = await this.httpClient.post(
      `${this.baseUrl}/create-payment-intent/orders/${data.orderId}`
    );

    return response.data;
  }
}

export const clPaymentService = new PaymentService(clientFetcher);
export const srPaymentService = new PaymentService(serverFetcher);
