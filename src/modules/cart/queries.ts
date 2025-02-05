import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { ProductVariant } from '@libs/types/models';

import { cartKeys } from './query-keys';
import { clCartService } from './services';
import { UpdateCartData } from './types';

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

export interface UseAddItemToCartData {
  variantId: ProductVariant['id'];
  quantity: number;
}

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ variantId, quantity }: UseAddItemToCartData) => {
      return clCartService.addToCart(variantId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: isAxiosError(error)
          ? error.response?.data.message
          : error.message
      });
    }
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateCartData & { itemId: number }) => {
      const { itemId, ...restData } = data;
      return clCartService.updateItem(itemId, restData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: isAxiosError(error)
          ? error.response?.data.message
          : error.message
      });
    }
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (itemId: number) => clCartService.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.cart() });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: isAxiosError(error)
          ? error.response?.data.message
          : error.message
      });
    }
  });
};
