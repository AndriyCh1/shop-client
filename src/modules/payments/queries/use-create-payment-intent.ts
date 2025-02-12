import { toast } from '@hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { clPaymentService } from '@modules/payments/services/payment-service';
import { CreatePaymentIntentData } from '@modules/payments/types';

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: (data: CreatePaymentIntentData) =>
      clPaymentService.createPaymentIntent(data),
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
