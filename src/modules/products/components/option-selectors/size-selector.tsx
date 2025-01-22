import { OptionController } from '@modules/products/components/option-selector';
import { SizeOption } from '@modules/products/components/variant-options/size-option';

export interface SizeSelectorProps {
  sizeOptions: string[];
  initialSize?: string;
  getAvailabilityStatus: (option: string) => {
    inStock: boolean;
    exists: boolean;
  };
  onSizeChange: (value: string) => void;
}

export function SizeSelector({
  sizeOptions,
  initialSize,
  getAvailabilityStatus,
  onSizeChange
}: SizeSelectorProps) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <OptionController
        options={sizeOptions}
        initialValues={initialSize ? [initialSize] : []}
        renderOption={({ index, option, isSelected, onChange, values }) => {
          const { exists, inStock } = getAvailabilityStatus(option);

          return (
            <SizeOption
              key={index}
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
