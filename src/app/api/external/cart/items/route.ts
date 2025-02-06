import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { srCartService } from '@modules/cart/services/cart-service';

export async function POST(request: NextRequest) {
  try {
    const { productVariantId, quantity } = await request.json();
    const response = await srCartService.addToCart(productVariantId, quantity);

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
