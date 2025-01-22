'use client';

import { useEffect, useState } from 'react';

import { cn } from '@libs/utils/tw-merge';

export interface ColorOptionProps {
  value: string;
  className?: string;
  active?: boolean;
  crossed?: boolean;
  disabled?: boolean;
  onChange?: (active: boolean) => void;
}

export function ColorOption({
  value: color,
  className,
  active = false,
  crossed = false,
  disabled = false,
  onChange
}: ColorOptionProps) {
  const [isActive, setActive] = useState(false);

  const handleOnChange = () => {
    // If the component is uncontrolled
    if (active === undefined) {
      setActive(!isActive);
    } else {
      onChange?.(!isActive);
    }
  };

  useEffect(() => {
    setActive(active);
  }, [active]);

  if (crossed || disabled) {
    return (
      <button
        type="button"
        className={cn(
          'relative h-8 w-8 rounded-full',
          'after:absolute after:left-1/2 after:top-1/2 after:block after:h-0.5 after:w-full after:rounded-full',
          'after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:scale-[0.80] after:bg-slate-400 after:content-[""]',
          { 'ring-1 ring-slate-400 ring-offset-2': isActive },
          { 'border border-slate-400': disabled },
          className
        )}
        style={{ backgroundColor: disabled ? 'white' : color }}
        disabled={disabled}
        onClick={handleOnChange}
      >
        <span className="sr-only">Unavailable</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        `relative h-8 w-8 rounded-full`,
        { 'ring-1 ring-slate-400 ring-offset-2': isActive },
        { 'cursor-not-allowed': disabled },
        className
      )}
      style={{ backgroundColor: color }}
      disabled={disabled}
      onClick={handleOnChange}
    />
  );
}
