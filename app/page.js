import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 text-center">
        Welcome to <span className="text-indigo-600">LocalWave</span> 🌊
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-xl text-center">
        Connecting conscious consumers, local clothing brands, and manufacturers in one wave 🌍✨
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link href="/shop">
          <button className="bg-white shadow-md hover:shadow-xl text-indigo-600 border border-indigo-400 px-6 py-3 rounded-lg font-semibold transition">
            👚 I’m a Shopper
          </button>
        </Link>

        <Link href="/seller">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            🧵 I’m a Seller
          </button>
        </Link>

        <Link href="/manufacturer">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition">
            🏭 I’m a Manufacturer
          </button>
        </Link>
      </div>
    </main>
  );
}
