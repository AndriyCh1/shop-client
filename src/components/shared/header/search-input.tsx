import { Search } from 'lucide-react';

import { Input } from '@components/ui/input';

export function SearchInput() {
  return (
    <div className="flex w-full items-center rounded-full bg-gray-100 lg:w-[600px]">
      <Search className="ml-4 text-gray-600" width={24} height={24} />
      <Input
        placeholder="Search for products..."
        className="text-small ml-0 rounded-full border-none bg-gray-100 outline-none placeholder:text-gray-600 focus:outline-none lg:text-base"
      />
    </div>
  );
}
