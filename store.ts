import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/app/page";

export interface CartProduct extends Product {
  quantity: number;
}

type ViewType = "cart" | "checkout" | "success";

interface CartStateFields {
  isOpen: boolean;
  cart: CartProduct[];
  paymentIntent?: string;
  viewType: "cart" | "checkout" | "success";
}

interface CartState extends CartStateFields {
  toggle: () => void;
  add: (item: Product) => void;
  remove: (id: Product["id"]) => void;
  setPaymentIntent: (value: string) => void;
  setViewType: (viewType: ViewType) => void;
  clearCart: () => void;
}

const initialState: CartStateFields = {
  cart: [],
  isOpen: false,
  viewType: "cart",
  paymentIntent: "",
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...initialState,

      clearCart: () =>
        set({
          cart: [],
        }),

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

interface ThemeStore {
  toggle: () => void;
  mode: "light" | "dark";
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",

      toggle: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme" },
  ),
);
