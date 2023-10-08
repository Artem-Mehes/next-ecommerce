"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { AiFillShopping } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import { useCartStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ user }: { user: Session["user"] }) {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center p-6">
      <Link href="/" className="flex-grow">
        <h1>Styled</h1>
      </Link>

      <div className="flex gap-10 items-center">
        <button className="relative text-3xl" onClick={cartStore.toggle}>
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                className="absolute bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full left-4 bottom-4"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {user ? (
          <Image
            width={36}
            height={36}
            alt="avatar"
            src={user?.image!}
            className="rounded-full"
          />
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-teal-600 text-white py-2 px-4 rounded-md"
          >
            Sign in
          </button>
        )}

        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </div>
    </nav>
  );
}
