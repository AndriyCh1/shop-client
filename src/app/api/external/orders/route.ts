import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { srOrdersService } from '@modules/orders/services/orders-service';
import { CreateOrderData } from '@modules/orders/types';

export async function POST(request: NextRequest) {
  try {
    const payload: CreateOrderData = await request.json();
    const response = await srOrdersService.createOrder(payload);

    return NextResponse.json(response);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data.message },
        { status: error.response?.status }
      );
    }

    return NextResponse.json(
      { message: (error as Error).message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
