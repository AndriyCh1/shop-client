'use client';

import { useState } from 'react';

import { Button } from '@components/ui/button';
import { QuantityInput } from '@components/ui/quantity-input';

import { ProductVariant } from '@libs/types/models';
import { cn } from '@libs/utils/tw-merge';

export interface AddToCartProps {
  variant: ProductVariant;
  className?: string;
}

// NOTE: Form
export function AddToCart({ className }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className={cn('flex items-center justify-between gap-6', className)}>
      <QuantityInput
        className="w-[250px] px-4 py-2"
        inputClassName="text-base"
        value={quantity}
        onChange={setQuantity}
        min={1}
      />
      <Button className="h-[52px] w-full rounded-full text-base">
        Add to Cart
      </Button>
    </div>
  );
}
