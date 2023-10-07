"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Nav({ user }: { user: Session["user"] }) {
  return (
    <nav className="flex justify-between items-center p-6">
      <Link href="/">
        <h1>Styled</h1>
      </Link>

      {user ? (
        <Image
          width={48}
          height={48}
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
    </nav>
  );
}
