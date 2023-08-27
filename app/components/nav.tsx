"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Nav({ user }: { user: Session["user"] }) {
  return (
    <nav className="flex justify-between items-center p-6">
      <div className="flex gap-6">
        <h1>Heading</h1>
      </div>

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
