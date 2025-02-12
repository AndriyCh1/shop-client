'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@hooks/use-toast';
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { OrderSummary } from '@modules/orders/components/order-summary/order-summary';
import { useCreateOrder } from '@modules/orders/queries/use-create-order';
import { useCreatePaymentIntent } from '@modules/payments/queries/use-create-payment-intent';

import { stripePromise } from '@libs/stripe';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
  card: z.string().min(1, 'Card is required'),
  shippingAddress: z.object({
    addressLine1: z.string().min(1, 'Address Line 1 is required'),
    addressLine2: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    postalCode: z.string().min(1, 'Postal Code is required'),
    city: z.string().min(1, 'City is required')
  }),
  contactInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phoneNumber: z.string(),
    email: z.string().email().min(1, 'Email is required')
  })
});

interface CheckoutFormProps {
  orderItems: {
    productVariantId: number;
    quantity: number;
  }[];
}

const initialFormValues = {
  card: '',
  shippingAddress: {
    addressLine1: '',
    addressLine2: '',
    country: '',
    postalCode: '',
    city: ''
  },
  contactInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  }
};

export function CheckoutFormBody({ orderItems }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema> & { card: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: initialFormValues
  });

  const createOrderMutation = useCreateOrder();
  const createPaymentIntentMutation = useCreatePaymentIntent();

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data: order } = await createOrderMutation.mutateAsync({
        ...values,
        items: orderItems
      });

      const { data: paymentIntent } =
        await createPaymentIntentMutation.mutateAsync({ orderId: order.id });

      const { error: paymentIntentError } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        { payment_method: { card: elements.getElement(CardElement)! } }
      );

      if (paymentIntentError) {
        toast({
          variant: 'destructive',
          title: 'Payment failed',
          description: paymentIntentError.message
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error placing an order',
        description:
          error instanceof Error ? error.message : 'Something went wrong'
      });
    } finally {
      setProcessing(false);
      return router.push(`/checkout/success`);
    }
  }

  if (orderItems.length === 0) {
    return (
      <div className="my-5 flex justify-center">
        <p className="text-lg font-medium">Your cart is empty</p>
      </div>
    );
  }

  const cardElement = elements?.getElement(CardElement);

  cardElement?.on('change', ({ error, empty, complete }) => {
    if (error) {
      form.setError('card', { message: error.message }, { shouldFocus: true });
      return;
    }

    if (empty) {
      form.setError(
        'card',
        { message: 'Card is required' },
        { shouldFocus: true }
      );
      return;
    }

    if (!complete) {
      form.setError(
        'card',
        { message: 'Card is not complete', type: 'manual' },
        { shouldFocus: true }
      );
      return;
    }

    form.setValue('card', 'card');
    form.clearErrors('card');
  });

  // Since the form's isValid is derived from the validation result of the schema result,
  // we should check manually handled fields to see if they are valid
  const isCustomFieldsValid = !form.formState.errors.card;

  return (
    <div className="my-5 flex justify-between gap-5">
      <Form {...form}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isCustomFieldsValid) return;
            await form.handleSubmit(handleFormSubmit)();
          }}
          className="flex-[0_3_64%] self-start"
        >
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
              <CardDescription>
                Complete your order by providing shipping and contact
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactInfo.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactInfo.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="contactInfo.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Address</h3>
                  <FormField
                    control={form.control}
                    name="shippingAddress.addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shippingAddress.addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="shippingAddress.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shippingAddress.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="shippingAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="card"
                    render={() => (
                      <FormItem>
                        <FormLabel>Card</FormLabel>
                        <FormControl>
                          <CardElement />
                        </FormControl>
                        {form.formState.isSubmitted && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-5 flex items-center justify-end">
            <Button
              className="h-12 w-48 rounded-full"
              type="submit"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </Form>
      <OrderSummary className="flex-[0_1_35%] self-start" />
    </div>
  );
}

export function CheckoutFormSkeleton() {
  return (
    <div className="mt-5 flex gap-3">
      <div className="h-[500px] w-3/5 animate-pulse rounded bg-muted"></div>
      <div className="h-[500px] w-2/5 animate-pulse rounded bg-muted"></div>
    </div>
  );
}

export function CheckoutFormContainer(props: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormBody {...props} />
    </Elements>
  );
}
