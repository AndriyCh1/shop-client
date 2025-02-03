import { Mutate, StoreApi, create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProductVariant } from '@libs/types/models';

interface CartProduct {
  product: ProductVariant;
  quantity: number;
}

interface State {
  products: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (item: ProductVariant, quantity?: number) => void;
  removeFromCart: (item: ProductVariant) => void;
  findProductById: (id: ProductVariant['id']) => CartProduct | undefined;
}

export type StoreWithPersist<T> = Mutate<
  StoreApi<T>,
  [['zustand/persist', unknown]]
>;

export const STORAGE_KEY = 'cart';

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      products: [],
      totalItems: 0,
      totalPrice: 0,
      addToCart: (product: ProductVariant, quantity = 1) => {
        const cart = get().products;
        const cartItem = cart.find((item) => item.product.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );

          set((state) => ({
            products: updatedCart,
            totalItems: state.totalItems,
            totalPrice: state.totalPrice + product.salePrice * quantity
          }));
        } else {
          set((state) => ({
            ...state,
            products: [...state.products, { product, quantity }],
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.salePrice * quantity
          }));
        }
      },
      removeFromCart: (product: ProductVariant) => {
        set((state) => ({
          products: state.products.filter(
            (item) => item.product.id !== product.id
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.salePrice
        }));
      },
      findProductById: (id: number) => {
        return get().products.find((item) => item.product.id === id);
      }
    }),
    { name: STORAGE_KEY }
  )
);
