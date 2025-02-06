import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

import { srProductVariantService } from '@modules/products/services/product-variants-service';
import { GetVariantsOptions } from '@modules/products/types';

export async function GET(request: NextRequest) {
  try {
    const parsedSearchParams = qs.parse(
      request.nextUrl.searchParams.toString()
    ) as {
      ids: GetVariantsOptions['ids'];
    };

    const productVariants = await srProductVariantService.getVariants({
      ids: parsedSearchParams.ids
    });

    return NextResponse.json(productVariants);
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
