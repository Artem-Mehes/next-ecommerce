"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { formatPrice } from "@/utils/price";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce(
    (price, item) => price + item.unit_amount * item.quantity,
    0,
  );

  return (
    <motion.div
      onClick={cartStore.toggle}
      className="fixed w-full h-screen inset-0 bg-black/25"
      exit={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col bg-white absolute right-0 top-0 w-full lg:w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <button
          onClick={cartStore.toggle}
          className="font-bold text-sm self-start"
        >
          Back to store 🏃‍♂️
        </button>
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
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>

            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              className="flex flex-col items-center gap-10 text-2xl font-medium opacity-75 my-auto"
            >
              Cart is empty
              <TiShoppingCart size={100} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
