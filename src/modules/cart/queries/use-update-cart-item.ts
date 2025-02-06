import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { cartKeys } from '@modules/cart/consts/query-keys';
import { clCartService } from '@modules/cart/services/cart-service';
import { UpdateCartData } from '@modules/cart/types';

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
