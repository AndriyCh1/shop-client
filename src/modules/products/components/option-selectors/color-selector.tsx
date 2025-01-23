import { OptionController } from '@modules/products/components/option-controller';
import { ColorOption } from '@modules/products/components/variant-options/color-option';

import { cn } from '@libs/utils/tw-merge';

export interface ColorSelectorProps {
  colorOptions: string[];
  getAvailabilityStatus: (option: string) => {
    inStock: boolean;
    exists: boolean;
  };
  onColorChange: (value: string) => void;
  className?: string;
  initialColor?: string;
}

export function ColorSelector({
  className,
  colorOptions,
  onColorChange,
  getAvailabilityStatus,
  initialColor
}: ColorSelectorProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <OptionController
        options={colorOptions}
        initialValues={initialColor ? [initialColor] : []}
        renderOption={({ index, option, isSelected, onChange, values }) => {
          const { exists, inStock } = getAvailabilityStatus(option);

          return (
            <ColorOption
              key={index}
              className="size-9"
              value={option}
              active={isSelected}
              onChange={() => {
                /* Avoid updating when only one option is selected and it's selected */
                if (values.length !== 1 || !isSelected) {
                  onColorChange(option);
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
