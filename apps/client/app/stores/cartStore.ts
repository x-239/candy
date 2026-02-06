import { create } from "zustand";
import {
  CartStoreActionsType,
  CartStoreStateType,
  CartItemType,
} from "../types";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      cart: [] as CartItemType[],
      addToCart: (product: CartItemType) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id && p.selectedSize === product.selectedSize,
          );

          if (existingIndex !== -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += product.quantity;
            return { cart: newCart };
          }

          return { cart: [...state.cart, product] };
        }),
      removeFromCart: (uid: string) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.uid === uid
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    },
  ),
);

export default useCartStore;
