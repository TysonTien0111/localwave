"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: "seller" }),
    });
    if (res.ok) {
      setSuccess("Account created! Please sign in.");
      setEmail("");
      setPassword("");
      setTimeout(() => router.push("/auth/signin"), 1200);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Sign Up as Seller</h1>
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
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded font-semibold transition">Sign Up</button>
      </form>
    </div>
  );
}
