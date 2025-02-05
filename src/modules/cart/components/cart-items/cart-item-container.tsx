import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { UpdateCartData } from '@modules/cart/types';

import { Placeholder } from '@components/ui/placeholder';
import { QuantityInput } from '@components/ui/quantity-input';

export interface Item {
  id: number | string;
  product: {
    id: number | string;
    name: string;
    price: number;
    attributes: Record<string, string>;
    image: string;
  };
  quantity: number;
}

export interface CartItemContainerProps {
  item: Item;
  onRemove: (id: Item['id']) => void;
  onUpdate: (id: Item['id'], data: UpdateCartData) => void;
}

export function CartItemContainer({
  item,
  onRemove,
  onUpdate
}: CartItemContainerProps) {
  const handleRemoveItem = () => {
    onRemove(item.id);
  };

  const handleUpdateItem = (data: UpdateCartData) => {
    onUpdate(item.id, data);
  };

  const renderImage = () => {
    if (!item.product.image) {
      return <Placeholder className="h-32 w-32 rounded-xl" />;
    }

    return (
      <div className="relative rounded-2xl bg-muted p-2">
        <Image
          src={item.product.image}
          width={110}
          height={110}
          alt="Cart item image"
        />
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className="flex flex-col items-end justify-between">
        <Trash2
          role="button"
          className="text-carmin-pink hover:cursor-pointer"
          onClick={handleRemoveItem}
        />
        <QuantityInput
          className="max-w-[250px] px-4 py-2"
          inputClassName="text-base"
          value={item.quantity}
          min={1}
          onChange={(value) => {
            handleUpdateItem({ quantity: value });
          }}
        />
      </div>
    );
  };

  const renderDetails = () => {
    return (
      <div className="flex flex-1 justify-between gap-4 py-1">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold">{item.product.name}</h3>
            {Object.entries(item.product.attributes).map(
              ([attributeKey, attributeValue], idx) => (
                <span key={idx} className="block text-base capitalize">
                  <span className="mr-1">{attributeKey}:</span>
                  <span className="text-muted-foreground">
                    {attributeValue}
                  </span>
                </span>
              )
            )}
          </div>
          <span className="block text-2xl font-bold">
            ${item.product.price}
          </span>
        </div>
        {renderActions()}
      </div>
    );
  };

  return (
    <div className="flex w-full gap-4">
      {renderImage()}
      {renderDetails()}
    </div>
  );
}
