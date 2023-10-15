import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/page";

export interface CartProduct extends Product {
  quantity: number;
}

type ViewType = "cart" | "checkout" | "success";

interface CartState {
  isOpen: boolean;
  toggle: () => void;
  cart: CartProduct[];
  paymentIntent?: string;
  add: (item: Product) => void;
  remove: (id: Product["id"]) => void;
  setPaymentIntent: (value: string) => void;
  viewType: "cart" | "checkout" | "success";
  setViewType: (viewType: ViewType) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      viewType: "cart",
      paymentIntent: "",

      setViewType: (viewType) =>
        set({
          viewType,
        }),

      toggle: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),

      remove: (id) =>
        set((state) => {
          const item = state.cart.find((cartItem) => cartItem.id === id);

          if (item && item.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }

              return cartItem;
            });

            return { cart: updatedCart };
          }

          return {
            cart: state.cart.filter((cartItem) => cartItem.id !== id),
          };
        }),

      add: (item) =>
        set((state) => {
          const itemExists = state.cart.some(({ id }) => id === item.id);

          if (itemExists) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }

              return cartItem;
            });

            return { cart: updatedCart };
          }

          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      setPaymentIntent: (value) =>
        set({
          paymentIntent: value,
        }),
    }),
    { name: "cart" },
  ),
);
