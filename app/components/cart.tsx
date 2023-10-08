"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { formatPrice } from "@/utils/price";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce(
    (price, item) => price + item.unit_amount * item.quantity,
    0,
  );

  return (
    <div
      onClick={cartStore.toggle}
      className="fixed w-full h-screen inset-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Cart</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4" key={item.id}>
            <Image
              width={120}
              height={120}
              alt={item.name}
              src={item.image}
              className="rounded-md h-24"
            />
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-4">
                <h2>Quantity: {item.quantity}</h2>

                <div className="flex gap-2 text-xl">
                  <button onClick={() => cartStore.remove(item.id)}>
                    <IoRemoveCircle />
                  </button>
                  <button onClick={() => cartStore.add(item)}>
                    <IoAddCircle />
                  </button>
                </div>
              </div>

              <p className="text-sm">
                {item.unit_amount ? formatPrice(item.unit_amount) : "N/A"}
              </p>
            </div>
          </div>
        ))}

        {cartStore.cart.length ? (
          <>
            <p>Total: {formatPrice(totalPrice)}</p>

            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-10 text-2xl font-medium opacity-75 my-auto">
            Cart is empty
            <TiShoppingCart size={100} />
          </div>
        )}
      </div>
    </div>
  );
}
