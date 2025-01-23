'use client';

import { useEffect, useState } from 'react';

import { Button } from '@components/ui/button';

import { cn } from '@libs/utils/tw-merge';

export interface SizeOptionProps {
  value: string;
  className?: string;
  active?: boolean;
  crossed?: boolean;
  disabled?: boolean;
  onChange?: (active: boolean) => void;
}

export function SizeOption({
  value: size,
  className,
  active = false,
  crossed = false,
  disabled = false,
  onChange
}: SizeOptionProps) {
  const [isActive, setActive] = useState(false);

  const onChangeHandler = () => {
    if (active === undefined) {
      setActive(!isActive);
    } else {
      onChange?.(!isActive);
    }
  };

  useEffect(() => {
    setActive(active);
  }, [active]);

  const crossedButtonClassName = cn(
    'after:absolute after:left-1/2 after:top-1/2 after:block after:h-full after:w-[1px] after:rounded-full',
    'after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:scale-[0.90] after:bg-slate-600 after:content-[""]'
  );

  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'secondary'}
      className={cn(
        `relative rounded-full text-sm font-medium capitalize`,
        { [crossedButtonClassName]: crossed },
        { 'text-muted-foreground hover:bg-black/10': !isActive && !crossed },
        { 'bg-gray-50 text-gray-400 hover:bg-black/10': !isActive && crossed },
        { 'bg-black/60 hover:bg-black/65': isActive && crossed },
        className
      )}
      disabled={disabled}
      onClick={onChangeHandler}
    >
      {size}
    </Button>
  );
}
