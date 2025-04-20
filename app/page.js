"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setAiResult("");
    const res = await fetch("/api/ai/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setAiResult(data.result);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 text-center">
        Welcome to <span className="text-indigo-600">LocalWave</span> 🌊
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-xl text-center">
        Connecting conscious consumers, local clothing brands, and manufacturers in one wave 🌍✨
      </p>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full max-w-xl mb-8">
        <input
          className="flex-1 border border-indigo-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow"
          placeholder="Ask LocalWave AI anything about local fashion..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow"
          disabled={loading}
        >
          {loading ? "Searching..." : "AI Search"}
        </button>
      </form>
      {aiResult && (
        <div className="bg-white bg-opacity-80 rounded-lg shadow p-6 max-w-xl w-full text-gray-800">
          <strong>AI says:</strong>
          <div className="mt-2 whitespace-pre-line">{aiResult}</div>
        </div>
      )}
    </main>
  );
}
