import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productService } from "../services/productService";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.list({ trending: true, size: 8 })
      .then((p) => setProducts(p.content || []))
      .catch(() => {});
  }, []);

  if (!products.length) return null;

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-red-500 uppercase tracking-[5px] mb-4 text-center">Trending</p>
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16">MOST WANTED</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
