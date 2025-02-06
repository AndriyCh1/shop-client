import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';

import { srCartService } from '@modules/cart/services/cart-service';

export async function GET() {
  try {
    const cart = await srCartService.getCart();
    return NextResponse.json(cart);
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
