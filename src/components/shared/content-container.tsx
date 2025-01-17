import { cn } from '@libs/utils/tw-merge';

export function ContentContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto max-w-screen-2xl px-8 md:px-16', className)}
      {...props}
    >
      {children}
    </div>
  );
}
