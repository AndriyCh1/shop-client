import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@libs/utils/tw-merge';

const inputVariants = cva(
  cn(
    'border-input bg-background placeholder:text-muted-foreground flex h-10 w-full',
    'rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-primary'
  ),
  {
    variants: {
      variant: {
        default: 'border',
        standard: 'border-b'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
