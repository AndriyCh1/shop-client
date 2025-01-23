import { OptionController } from '@modules/products/components/option-controller';
import { SizeOption } from '@modules/products/components/variant-options/size-option';

import { cn } from '@libs/utils/tw-merge';

export interface SizeSelectorProps {
  sizeOptions: string[];
  getAvailabilityStatus: (option: string) => {
    inStock: boolean;
    exists: boolean;
  };
  onSizeChange: (value: string) => void;
  className?: string;
  initialSize?: string;
}

export function SizeSelector({
  className,
  sizeOptions,
  initialSize,
  getAvailabilityStatus,
  onSizeChange
}: SizeSelectorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <OptionController
        options={sizeOptions}
        initialValues={initialSize ? [initialSize] : []}
        renderOption={({ index, option, isSelected, onChange, values }) => {
          const { exists, inStock } = getAvailabilityStatus(option);

          return (
            <SizeOption
              key={index}
              className="h-11 px-5"
              value={option}
              active={isSelected}
              onChange={() => {
                if (values.length !== 1 || !isSelected) {
                  onSizeChange(option);
                  onChange();
                }
              }}
              crossed={!inStock}
              disabled={!exists}
            />
          );
        }}
      />
    </div>
  );
}
