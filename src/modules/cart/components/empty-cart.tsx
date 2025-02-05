import Link from 'next/link';

import { Button } from '@components/ui/button';

export function EmptyCart() {
  return (
    <div className="my-8 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <p className="mt-2 text-lg">
        You can add items to your cart by clicking on the &quot;Add to
        cart&quot; button on the product page.
      </p>
      <Button asChild className="mt-4 rounded-full px-16 py-6">
        <Link href="/">Continue shopping</Link>
      </Button>
    </div>
  );
}
