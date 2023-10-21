"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { AiFillShopping } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import Cart from "./cart";
import { useCartStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import ToggleTheme from "@/app/components/toggle-theme";

export default function Nav({ user }: { user: Session["user"] }) {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center py-6">
      <Link href="/" className="flex-grow">
        <h1 className="text-2xl font-extrabold">Styled</h1>
      </Link>

      <div className="flex gap-8 items-center">
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
                className="absolute bg-primary text-white text-sm font-bold w-5 h-5 rounded-full left-4 bottom-4"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {user ? (
          <div className="dropdown dropdown-end cursor-pointer">
            <Image
              width={36}
              height={36}
              alt="avatar"
              src={user?.image!}
              className="rounded-full"
              tabIndex={0}
            />

            <ul className="dropdown-content menu p-4 space-y-2 shadow bg-base-100 rounded-box w-72">
              <li
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                <Link
                  href="/dashboard"
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Orders
                </Link>
              </li>
              <li
                onClick={() => {
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }}
              >
                <button
                  onClick={() => signOut()}
                  className="hover:bg-base-300 p-4 rounded-md"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-primary text-white py-2 px-4 rounded-md"
          >
            Sign in
          </button>
        )}

        <ToggleTheme />

        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </div>
    </nav>
  );
}
