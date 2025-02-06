import { Mutate, StoreApi, create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UpdateCartData } from '@modules/cart/types';

import { ProductVariant } from '@libs/types/models';
import { generateId } from '@libs/utils/generators';

export interface CartItem {
  id: string;
  productVariantId: ProductVariant['id'];
  quantity: number;
}

interface State {
  items: CartItem[];
}

interface Actions {
  addItem: (productVariantId: ProductVariant['id'], quantity?: number) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, data: UpdateCartData) => void;
  findItem: (id: string) => CartItem | undefined;
  findByProductVariantId: (id: ProductVariant['id']) => CartItem | undefined;
}

export type StoreWithPersist<T> = Mutate<
  StoreApi<T>,
  [['zustand/persist', unknown]]
>;

export const STORAGE_KEY = 'cart';

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      items: [],
      isFetchingFullData: false,
      addItem: (productVariantId: ProductVariant['id'], quantity = 1) => {
        const item = get().items.find(
          (item) => item.productVariantId === productVariantId
        );
        const id = generateId();

        if (!item) {
          set((state) => ({
            ...state,

            items: [...state.items, { id, productVariantId, quantity }]
          }));
        }
      },
      updateItem: (id: string, data: UpdateCartData) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: data.quantity } : item
          )
        }));
      },
      removeItem: (id: string) => {
        const cartItem = get().findItem(id);

        if (!cartItem) return;

        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));
      },
      findItem: (id: string) => {
        return get().items.find((item) => item.id === id);
      },
      findByProductVariantId: (id: ProductVariant['id']) => {
        return get().items.find((item) => item.productVariantId === id);
      }
    }),
    { name: STORAGE_KEY }
  )
);
