"use client";

import { useCartStore } from "@/store";
import { Product } from "@/app/page";

export default function AddToCart(props: Product) {
  const cartStore = useCartStore();

  const cartQuantity = cartStore.cart.find(
    (cartItem) => cartItem.id === props.id,
  )?.quantity;

  return (
    <button
      onClick={() => cartStore.add(props)}
      className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700 w-full lg:w-auto"
    >
      Add to cart {cartQuantity && `(${cartQuantity})`}
    </button>
  );
}
