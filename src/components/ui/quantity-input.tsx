'use client';

import { Minus, Plus } from 'lucide-react';

import { cn } from '@libs/utils/tw-merge';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function QuantityInput({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  disabled = false,
  className = '',
  inputClassName = '',
  buttonClassName = ''
}: QuantityInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10);
    if (isNaN(newValue)) return;
    updateValue(newValue);
  };

  const updateValue = (newValue: number) => {
    // Ensure the value stays within bounds
    const clampedValue = Math.min(Math.max(newValue, min), max);
    onChange(clampedValue);
  };

  const increment = () => {
    updateValue(value + step);
  };

  const decrement = () => {
    updateValue(value - step);
  };

  return (
    <div
      className={cn(
        'flex w-fit items-center justify-between rounded-full bg-secondary',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'group h-9 w-9 rounded-l-full rounded-r-none [&_svg]:size-6',
          buttonClassName
        )}
        onClick={decrement}
        disabled={disabled || value <= min}
      >
        <span className="duration-400 content-center rounded-full p-1.5 shadow-2xl transition-colors animate-in group-hover:bg-gray-200/40">
          <Minus className="h-4 w-4" />
        </span>
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className={cn(
          'h-9 w-12 border-0 bg-inherit text-center',
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          inputClassName
        )}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      />
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'group h-9 w-9 rounded-l-none rounded-r-full [&_svg]:size-6',
          buttonClassName
        )}
        onClick={increment}
        disabled={disabled || value >= max}
      >
        <span className="duration-400 content-center rounded-full p-1.5 shadow-2xl transition-colors animate-in group-hover:bg-gray-200/40">
          <Plus className="h-12 w-12" />
        </span>
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
