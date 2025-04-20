"use client";
import { useState, useEffect } from "react";

export default function Home() {
  // AI Search states
  const [query, setQuery] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Product Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Load all products when the page first loads
  useEffect(() => {
    handleProductSearch();
  }, []);

  async function handleAiSearch(e) {
    e.preventDefault();
    setAiLoading(true);
    setAiResult("");
    const res = await fetch("/api/ai/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setAiResult(data.result);
    setAiLoading(false);
  }

  const handleProductSearch = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
        sortBy: sortBy
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const processedProducts = data.map(product => ({
          ...product,
          image: product.image && product.image !== '' ? product.image : '/images/file.svg'
        }));
        setProducts(processedProducts);
      } else {
        console.error('Unexpected response format:', data);
        setError('Received unexpected data format from server');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setError('Failed to search products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* AI Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            Welcome to <span className="text-indigo-600">LocalWave</span> 🌊
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-12 max-w-xl mx-auto text-center">
            Connecting conscious consumers, local clothing brands, and manufacturers in one wave 🌍✨
          </p>
          <form onSubmit={handleAiSearch} className="flex flex-col md:flex-row gap-4 w-full max-w-xl mx-auto mb-8">
            <input
              className="flex-3 border border-indigo-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow text-black placeholder:text-gray-400"
              placeholder="Ask LocalWave AI anything about local fashion..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow"
              disabled={aiLoading}
            >
              {aiLoading ? "Searching..." : "AI Search"}
            </button>
          </form>
          {aiResult && (
            <div className="bg-white bg-opacity-80 rounded-lg shadow p-6 max-w-xl mx-auto text-gray-800">
              <strong>AI says:</strong>
              <div className="mt-2 whitespace-pre-line">{aiResult}</div>
            </div>
          )}
        </div>

        {/* Product Search Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Find Local Products</h2>
          
          <form onSubmit={handleProductSearch} className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black text-black"
              />
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black text-black"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black text-black"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              >
                <option value="name" className="text-black">Sort by Name</option>
                <option value="price_asc" className="text-black">Price: Low to High</option>
                <option value="price_desc" className="text-black">Price: High to Low</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Products'}
            </button>
          </form>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-end mb-4">
            <button
              onClick={() => handleProductSearch()}
              className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold transition shadow"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Products'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-gray-600">
                Loading products...
              </div>
            ) : Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <img 
                    src={product.image && product.image !== '' ? product.image : '/images/wave.svg'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={e => { e.target.src = '/images/wave.svg'; }}
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
                  <p className="text-gray-600 text-sm mt-2">Sold by: {product.seller?.email || 'Unknown seller'}</p>
                  <button
                    onClick={() => {
                      console.log('View details for product:', product.id);
                    }}
                    className="mt-4 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600">
                {products.length === 0 ? 'No products found. Try a different search term.' : 'Loading...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
