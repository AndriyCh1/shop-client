import { Separator } from '@radix-ui/react-dropdown-menu';

import { Card, CardContent } from '@components/ui/card';

export interface OrderSummaryContainerProps {
  subTotal: number;
  deliveryFee: number;
  className?: string;
}

export function OrderSummaryContainer({
  subTotal,
  deliveryFee,
  className
}: OrderSummaryContainerProps) {
  const total = subTotal + deliveryFee;

  return (
    <Card className={className}>
      <CardContent className="px-6 py-5">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <dl className="mt-6 space-y-5 text-base">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-bold">${subTotal.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Delivery fee</dt>
            <dd className="font-bold">
              {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Free'}
            </dd>
          </div>
          <Separator className="mt-6" />
          <div className="mt-6 flex justify-between">
            <dt>Total</dt>
            <dd className="font-bold">${total.toFixed(2)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
