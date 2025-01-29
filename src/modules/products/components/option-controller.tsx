'use client';

import { useOptionSelector } from '@hooks/use-option-selector';

type Option = string;

interface OptionControllerProps {
  options: Option[];
  multiple?: boolean;
  initialValues?: string[];
  renderOption: (params: {
    option: Option;
    index: number;
    isSelected: boolean;
    values: string[];
    onChange: () => void;
  }) => React.ReactNode;
}

export function OptionController({
  options,
  multiple = false,
  initialValues,
  renderOption
}: OptionControllerProps) {
  const selector = useOptionSelector({
    multiple,
    defaultValues: initialValues
  });

  return options.map((option, index) => {
    const isSelected = selector.selected.includes(option);

    const onChange = () => {
      selector.onChange(option, !isSelected);
    };

    return renderOption({
      option,
      index,
      isSelected,
      onChange,
      values: selector.selected
    });
  });
}
