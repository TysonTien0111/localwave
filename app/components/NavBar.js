"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (status === "loading") {
    return (
      <nav className="flex gap-4 p-4 border-b items-center justify-center">
        <img src="/globe.svg" alt="Loading..." className="animate-spin h-6 w-6" />
      </nav>
    );
  }

  return (
    <nav className="flex gap-4 p-4 border-b items-center">
      <Link href="/">Home</Link>
      {session && role === "seller" && <Link href="/dashboard/seller">Seller Dashboard</Link>}
      {!session && <Link href="/auth/signin">Sign In</Link>}
      {!session && <Link href="/auth/signup">Sign Up</Link>}
      {session && (
        <button onClick={() => signOut({ callbackUrl: "/" })} className="ml-4">Logout</button>
      )}
    </nav>
  );
}
