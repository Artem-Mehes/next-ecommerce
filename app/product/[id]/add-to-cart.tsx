"use client";

import { useCartStore } from "@/store";
import { Product } from "@/app/page";
import { useState } from "react";

export default function AddToCart(props: Product) {
  const cartStore = useCartStore();

  const [added, setAdded] = useState(false);

  const cartQuantity = cartStore.cart.find(
    (cartItem) => cartItem.id === props.id,
  )?.quantity;

  return (
    <button
      disabled={added}
      onClick={() => {
        cartStore.add(props);
        setAdded(true);
        setTimeout(() => setAdded(false), 500);
      }}
      className="my-4 btn btn-primary w-full"
    >
      {added
        ? "Adding to cart"
        : `Add to cart${cartQuantity ? ` (${cartQuantity})` : ""}`}
    </button>
  );
}
