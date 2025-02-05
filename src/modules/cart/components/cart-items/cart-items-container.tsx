import { Fragment } from 'react';

import { UpdateCartData } from '@modules/cart/types';

import { Card, CardContent } from '@components/ui/card';
import { Separator } from '@components/ui/separator';

import { CartItemContainer, Item } from './cart-item-container';

export interface CartItemsProps {
  items: Item[];
  onItemRemove: (id: Item['id']) => void;
  onItemUpdate: (id: Item['id'], data: UpdateCartData) => void;
  className?: string;
}

export function CartItemsContainer({
  items,
  onItemRemove,
  onItemUpdate,
  className
}: CartItemsProps) {
  return (
    <Card className={className}>
      <CardContent className="px-6 py-5">
        {items.map((item, idx) => (
          <Fragment key={item.id}>
            <CartItemContainer
              item={item}
              onRemove={onItemRemove}
              onUpdate={onItemUpdate}
            />
            {idx !== items.length - 1 && <Separator className="my-6" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
