import { CartProduct } from "@/store";

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);

export const getOrderAmount = (items: CartProduct[]) =>
  items.reduce((price, item) => price + item.unit_amount * item.quantity, 0);
