import { Badge } from '@components/ui/badge';

import { cn } from '@libs/utils/tw-merge';

export interface SalePriceBadgeProps {
  className?: string;
  price: number;
}

export function SalePriceBadge({ className, price }: SalePriceBadgeProps) {
  return (
    <Badge
      className={cn(
        'bg-carmin-pink/10 px-2 py-0.5 text-xs font-medium leading-tight text-carmin-pink shadow-none hover:bg-carmin-pink/10 hover:text-carmin-pink',
        className
      )}
    >
      {`-${Math.round(price)}%`}
    </Badge>
  );
}
