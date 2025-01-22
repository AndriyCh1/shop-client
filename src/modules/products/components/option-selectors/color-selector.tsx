import { OptionController } from '@modules/products/components/option-selector';
import { ColorOption } from '@modules/products/components/variant-options/color-option';

export interface ColorSelectorProps {
  colorOptions: string[];
  initialColor?: string;
  getAvailabilityStatus: (option: string) => {
    inStock: boolean;
    exists: boolean;
  };
  onColorChange: (value: string) => void;
}

export function ColorSelector({
  colorOptions,
  onColorChange,
  getAvailabilityStatus,
  initialColor
}: ColorSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <OptionController
        options={colorOptions}
        initialValues={initialColor ? [initialColor] : []}
        renderOption={({ index, option, isSelected, onChange, values }) => {
          const { exists, inStock } = getAvailabilityStatus(option);

          return (
            <ColorOption
              key={index}
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
