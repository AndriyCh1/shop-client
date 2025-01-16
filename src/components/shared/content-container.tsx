import { cn } from '@libs/utils/tw-merge';

export function ContentContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto max-w-[1240px]', className)} {...props}>
      <div className="mx-4 sm:mx-8">{children}</div>
    </div>
  );
}
