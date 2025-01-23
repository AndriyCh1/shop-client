'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Placeholder } from '@components/ui/placeholder';

import { cn } from '@libs/utils/tw-merge';

export interface ProductDetailsImagesProps {
  images: string[];
  name?: string;
}

export function ProductDetailsImages({
  images,
  name
}: ProductDetailsImagesProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [images]);

  const [hoveredImageIdx, setHoveredImageIdx] = useState<number | null>(null);
  const mainImageIdx = hoveredImageIdx ?? selectedImageIdx;

  return (
    <div className="flex w-full flex-col-reverse gap-1 md:w-1/2 md:flex-row">
      <div
        className="flex flex-nowrap gap-2 overflow-scroll py-2 md:h-fit md:flex-[4_1_0] md:flex-col md:py-0 xl:flex-[3_1_0]"
        onMouseLeave={() => setHoveredImageIdx(null)}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIdx(index)}
            className={cn(
              'relative overflow-hidden rounded-xl border border-transparent bg-muted',
              'aspect-square size-32 flex-[0_0_auto] md:size-full md:flex-[1_1_auto]',
              { 'border border-primary': index === selectedImageIdx }
            )}
            onMouseEnter={() => setHoveredImageIdx(index)}
          >
            <Image
              src={image}
              alt={`${name || 'Product image'} thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="size-full object-contain transition-transform duration-300 ease-in-out"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square h-[28rem] overflow-hidden rounded-xl bg-muted md:flex-[10_1_0] lg:h-[32rem]">
        {images[mainImageIdx] && (
          <Image
            src={images[mainImageIdx]}
            alt={`${name || 'Product image'} thumbnail`}
            fill
            sizes="100%"
            className="rounded-lg object-contain"
          />
        )}

        {!images[mainImageIdx] && <Placeholder />}
      </div>
    </div>
  );
}
