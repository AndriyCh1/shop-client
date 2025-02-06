import { useQuery } from '@tanstack/react-query';

import { cartKeys } from '@modules/cart/consts/query-keys';
import { clProductVariantService } from '@modules/products/services/product-variants-service';
import { GetVariantsOptions } from '@modules/products/types';

interface UseGetCartProductVariantsData {
  ids: GetVariantsOptions['ids'];
}

export const useGetCartProductVariants = (
  data: UseGetCartProductVariantsData
) => {
  return useQuery({
    queryKey: cartKeys.cartProductVariants(),
    queryFn: () => clProductVariantService.getVariants(data)
  });
};
