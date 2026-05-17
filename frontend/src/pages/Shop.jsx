import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";

export default function Shop() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ]                   = useState("");
  const [loading, setLoading]       = useState(true);

  useEffect(() => { categoryService.list().then(setCategories).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const params = { size: 24 };
    if (categoryId) params.categoryId = categoryId;
    if (q)         params.q = q;
    productService.list(params)
      .then((p) => setProducts(p.content || []))
      .finally(() => setLoading(false));
  }, [categoryId, q]);

  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-10">SHOP</h1>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search products..."
              className="bg-zinc-900 px-5 py-3 rounded-full outline-none text-white w-72"
            />
            <select
              value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
              className="bg-zinc-900 px-5 py-3 rounded-full outline-none text-white"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-400">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
