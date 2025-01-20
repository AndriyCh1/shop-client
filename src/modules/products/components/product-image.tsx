import Image from 'next/image';

import { Placeholder } from '@components/ui/placeholder';

export interface ProductImageProps {
  imagePath?: string;
  alt?: string;
  placeholderClassName?: string;
  imageClassName?: string;
}

export function ProductImage({
  imagePath,
  alt,
  placeholderClassName = 'h-80',
  imageClassName = 'h-40 text-muted-foreground'
}: ProductImageProps) {
  return imagePath ? (
    <Image
      src={imagePath}
      alt={alt || ''}
      quality={100}
      width={100}
      height={100}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      className="transition-all duration-300 ease-in-out hover:scale-105"
    />
  ) : (
    <Placeholder
      className={placeholderClassName}
      imageClassName={imageClassName}
    />
  );
}
