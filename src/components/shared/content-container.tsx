import { cn } from '@libs/utils/tw-merge';

export function ContentContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto max-w-[1240px] px-4 sm:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
