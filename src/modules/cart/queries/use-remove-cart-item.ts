import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { cartKeys } from '@modules/cart/consts/query-keys';
import { clCartService } from '@modules/cart/services/cart-service';

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
