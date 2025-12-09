"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="border rounded-full w-3xs p-2 text-lg bg-indigo-900 border-white text-white hover:cursor-pointer hover:bg-white hover:border-indigo-900 hover:text-indigo-900 transition ease-in-out"
    >
      Sign Out
    </button>
  );
}
