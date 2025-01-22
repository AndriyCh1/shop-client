'use client';

import { useRouter } from 'next/navigation';

import { ColorSelector } from '@modules/products/components/option-selectors/color-selector';
import { SizeSelector } from '@modules/products/components/option-selectors/size-selector';
import { ProductAttributeKey } from '@modules/products/consts';
import {
  findVariantByAttributes,
  getVariantMatchingOptions
} from '@modules/products/utils';

import { ProductVariant } from '@libs/types/models';
import { groupByKeys } from '@libs/utils/objects';

export interface ProductOptionsProps {
  variants: ProductVariant[];
  currentVariant: ProductVariant;
}

export function ProductOptions({
  variants,
  currentVariant
}: ProductOptionsProps) {
  const router = useRouter();

  const allOptions = groupByKeys(variants.map((v) => v.attributes));
  const variantOptions = currentVariant.attributes;
  const availableOptions = getVariantMatchingOptions(variants, currentVariant);

  const handleSelectNewOption = (key: ProductAttributeKey, value: string) => {
    const nextVariant = findVariantByAttributes(variants, {
      ...currentVariant.attributes,
      [key]: value
    });

    if (nextVariant) {
      return router.push(
        `/products/${currentVariant.productId}?v=${nextVariant.id}`
      );
    }
  };

  const getAvailabilityStatus = (key: ProductAttributeKey, value: string) => {
    const option = availableOptions.find((option) => {
      const optionToCheck = { ...currentVariant.attributes, [key]: value };
      return Object.keys(optionToCheck).every((key) => {
        return option[key] === optionToCheck[key as ProductAttributeKey];
      });
    });

    if (!option) {
      return { inStock: true, exists: false };
    }

    return { inStock: !!option._inStock, exists: !!option._exists };
  };

  const optionsToRender: React.ReactNode[] = [];

  for (const key in allOptions) {
    switch (key) {
      case 'color': {
        optionsToRender.push(
          <ColorSelector
            colorOptions={allOptions[key]}
            onColorChange={(option) => handleSelectNewOption(key, option)}
            initialColor={variantOptions[key]}
            getAvailabilityStatus={(option) =>
              getAvailabilityStatus(key, option)
            }
          />
        );
        break;
      }
      case 'size': {
        optionsToRender.push(
          <SizeSelector
            onSizeChange={(option) => handleSelectNewOption(key, option)}
            sizeOptions={allOptions[key]}
            initialSize={variantOptions[key]}
            getAvailabilityStatus={(option) =>
              getAvailabilityStatus(key, option)
            }
          />
        );
        break;
      }
    }
  }
  return <div>{...optionsToRender}</div>;
}
