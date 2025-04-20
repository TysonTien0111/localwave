"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", image: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (status === "authenticated") fetchProducts();
  }, [status]);

  async function fetchProducts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      setProducts(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      // Always send image (even if blank)
      const payload = { ...form, image: form.image || "" };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save product");
      setForm({ name: "", image: "", price: "" });
      setEditingId(null);
      fetchProducts();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleEdit(product) {
    setForm({ name: product.name, image: product.image || "", price: product.price.toString() });
    setEditingId(product.id);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    setError("");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (e) {
      setError(e.message);
    }
  }

  if (status === "loading") return <div>Loading...</div>;
  if (status !== "authenticated" || session.user.role !== "seller") return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Seller Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Welcome, {session.user.email}!</p>
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">Manage Your Products</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
            <input
              className="border border-indigo-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Product Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              className="border border-indigo-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Image URL (e.g. /images/shirt1.jpg)"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            />
            <span className="text-xs text-gray-500 mb-1">Upload your image to <code>public/images/</code> and use <code>/images/filename.jpg</code> as the path.</span>
            <input
              className="border border-indigo-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              required
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold transition">
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", image: "", price: "" }); }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold transition">
                  Cancel
                </button>
              )}
            </div>
          </form>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {loading ? (
            <div>Loading products...</div>
          ) : (
            <ul className="divide-y divide-indigo-100">
              {products.map(product => (
                <li key={product.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-semibold text-indigo-700">{product.name}</div>
                    <div className="text-gray-600 text-sm">${product.price}</div>
                    <img
                      src={product.image && product.image !== '' ? product.image : '/images/wave.svg'}
                      alt={product.name}
                      className="h-16 w-24 object-cover rounded mt-2"
                      onError={e => { e.target.src = '/images/wave.svg'; }}
                    />
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-semibold transition">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
