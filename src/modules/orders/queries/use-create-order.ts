import { toast } from '@hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { clOrdersService } from '@modules/orders/services/orders-service';
import { CreateOrderData } from '@modules/orders/types';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderData) => clOrdersService.createOrder(data),
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
