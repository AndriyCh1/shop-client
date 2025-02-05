import { Mutate, StoreApi, create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UpdateCartData } from '@modules/cart/types';

import { ProductVariant } from '@libs/types/models';
import { generateId } from '@libs/utils/generators';

export interface CartProduct {
  id: ProductVariant['id'];
  name: ProductVariant['name'];
  salePrice: ProductVariant['salePrice'];
  attributes: ProductVariant['attributes'];
  image?: string;
}

export interface CartItem {
  id: string;
  product: CartProduct;
  quantity: number;
}

interface State {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (id: CartItem['id']) => void;
  updateItem: (id: CartItem['id'], data: UpdateCartData) => void;
  findByProductId: (id: CartProduct['id']) => CartItem | undefined;
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
      totalItems: 0,
      totalPrice: 0,
      addItem: (product: CartProduct, quantity = 1) => {
        const cart = get().items;
        const cartItem = cart.find((item) => item.product.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );

          set((state) => ({
            items: updatedCart,
            totalItems: state.totalItems,
            totalPrice: state.totalPrice + product.salePrice * quantity
          }));
        } else {
          const id = generateId();

          set((state) => ({
            ...state,
            items: [...state.items, { id, product, quantity }],
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.salePrice * quantity
          }));
        }
      },
      updateItem: (id: CartItem['id'], data: UpdateCartData) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: data.quantity } : item
          ),
          totalItems: state.totalItems,
          totalPrice: state.totalPrice
        }));
      },
      removeItem: (id: CartItem['id']) => {
        const cartItem = get().items.find((item) => item.id === id);

        if (!cartItem) return;

        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - cartItem.product.salePrice
        }));
      },
      findByProductId: (id: CartProduct['id']) => {
        return get().items.find((item) => item.product.id === id);
      }
    }),
    { name: STORAGE_KEY }
  )
);
