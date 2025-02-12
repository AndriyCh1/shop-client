import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { srPaymentService } from '@modules/payments/services/payment-service';

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const response = await srPaymentService.createPaymentIntent({
      orderId: +orderId
    });

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
