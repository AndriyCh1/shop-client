import { Image as ImageIcon } from 'lucide-react';

import { cn } from '@libs/utils/tw-merge';

export interface PlaceholderProps {
  className?: string;
  imageClassName?: string;
}

export function Placeholder({ className, imageClassName }: PlaceholderProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-muted',
        className
      )}
    >
      <ImageIcon
        className={cn('h-12 w-12 text-muted-foreground', imageClassName)}
      />
    </div>
  );
}
