import { useQuery } from '@tanstack/react-query';

import { cartKeys } from '@modules/cart/consts/query-keys';
import { clCartService } from '@modules/cart/services/cart-service';

export interface UseGetCartOptions {
  enabled?: boolean;
}

export const useGetCart = (options: UseGetCartOptions = {}) => {
  return useQuery({
    ...options,
    queryKey: cartKeys.cart(),
    queryFn: () => clCartService.getCart()
  });
};
