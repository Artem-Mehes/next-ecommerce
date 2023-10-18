"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.gif";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.5, opacity: 0 }}
      className="flex flex-col gap-8 mt-10"
    >
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
        <h2 className="font-sm">Check your email fro the receipt</h2>
      </div>

      <Image src={dance} alt="Success" />

      <Link
        href="/dashboard"
        className="font-medium"
        onClick={() => {
          setTimeout(() => cartStore.setViewType("cart"), 1000);
          cartStore.toggle();
        }}
      >
        Check your order
      </Link>
    </motion.div>
  );
}
