import { useCallback, useState } from 'react';

interface UseOptionSelectorParams {
  multiple?: boolean;
  defaultValues?: string[];
}

export function useOptionSelector({
  multiple = false,
  defaultValues = []
}: UseOptionSelectorParams = {}) {
  const [selected, setSelected] = useState(defaultValues);

  const onChange = useCallback(
    (value: string, isSelected: boolean) => {
      setSelected((prev) => {
        if (!isSelected) {
          return prev.filter((v) => v !== value);
        }

        if (multiple) {
          return [...prev, value];
        }

        return [value];
      });
    },
    [multiple]
  );

  return { selected, onChange };
}
