"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      setError("Invalid email or password");
    } else {
      setSuccess("Successfully signed in!");
      // Fetch session to get user role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;
      if (role === "buyer") router.push("/dashboard/buyer");
      else if (role === "seller") router.push("/dashboard/seller");
      else if (role === "manufacturer") router.push("/dashboard/manufacturer");
      else router.push("/");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 bg-white bg-opacity-90 p-8 rounded-xl shadow">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border border-indigo-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border border-indigo-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded font-semibold transition">Sign In</button>
      </form>
    </div>
  );
}
