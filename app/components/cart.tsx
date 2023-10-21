"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { formatPrice, getOrderAmount } from "@/utils/price";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "@/app/components/checkout";
import OrderConfirmed from "@/app/components/order-confirmed";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = getOrderAmount(cartStore.cart);

  return (
    <motion.div
      onClick={cartStore.toggle}
      className="fixed w-full h-screen inset-0 bg-black/50"
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
        className="flex flex-col gap-8 bg-base-300 absolute right-0 top-0 w-full lg:w-1/4 h-screen p-12 overflow-y-scroll"
      >
        {cartStore.viewType === "cart" && (
          <>
            <button
              onClick={cartStore.toggle}
              className="font-bold text-sm self-start"
            >
              Back to store 🏃‍♂️
            </button>

            {cartStore.cart.map((item) => (
              <div
                className="flex gap-4 bg-base-200 p-2 rounded shadow-2xl"
                key={item.id}
              >
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
              <motion.div layout className="flex flex-col gap-3">
                <p>
                  Total:{" "}
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </p>

                <button
                  onClick={() => cartStore.setViewType("checkout")}
                  className="py-2 bg-primary w-full rounded-md text-white flex gap-3 justify-center items-center"
                >
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
          </>
        )}

        {cartStore.viewType === "checkout" && (
          <>
            <button
              className="font-bold text-sm self-start"
              onClick={() => cartStore.setViewType("cart")}
            >
              Check your cart 🛒
            </button>

            <Checkout />
          </>
        )}

        {cartStore.viewType === "success" && <OrderConfirmed />}
      </div>
    </motion.div>
  );
}
