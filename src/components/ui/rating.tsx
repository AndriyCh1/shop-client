import { StarHalfIcon, StarIcon } from 'lucide-react';

import { cn } from '@libs/utils/tw-merge';

export interface RatingProps {
  className?: string;
  rating?: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showDecimal?: boolean;
}
export function Rating({
  className,
  rating = 0,
  maxRating = 5,
  size = 'medium',
  showDecimal = false
}: RatingProps) {
  return (
    <div
      className={cn('flex items-center gap-1', className)}
      aria-description={`Rating: ${rating} out of ${maxRating}`}
    >
      {Array.from({ length: maxRating }).map((_, index) => {
        return (
          <div
            key={index}
            className={cn(
              size === 'small' ? 'h-3 w-3' : '',
              size === 'medium' ? 'h-4 w-4' : '',
              size === 'large' ? 'h-5 w-5' : ''
            )}
          >
            {
              // Return half star for half ratings
              rating % 1 !== 0 &&
              index === Math.floor(rating) &&
              index + 1 === Math.ceil(rating) ? (
                <div className="relative" key={index}>
                  <StarIcon
                    className="absolute left-0 top-0 h-full w-full fill-gray-300 text-gray-300"
                    aria-hidden="true"
                  />

                  <StarHalfIcon
                    className="relative z-10 h-full w-full fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <StarIcon
                  key={index}
                  className={cn('h-full w-full', {
                    'fill-yellow-400 text-yellow-400': index < rating,
                    'fill-gray-300 text-gray-300': index >= rating
                  })}
                  aria-hidden="true"
                />
              )
            }
          </div>
        );
      })}

      {showDecimal && (
        <span className="text-gray-400">{(rating % 1).toFixed(1)}</span>
      )}
    </div>
  );
}
