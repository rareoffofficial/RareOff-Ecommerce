import { Link } from "react-router-dom";
import { inr } from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  if (!product) return null;
  const img = product.images?.[0]?.url || "https://placehold.co/600x800/000/fff";
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-zinc-900 rounded-3xl overflow-hidden hover:scale-[1.02] transition duration-500"
    >
      <div className="overflow-hidden">
        <img
          src={img}
          alt={product.name}
          className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
        />
      </div>
      <div className="p-5">
        <p className="text-red-500 uppercase tracking-[3px] text-[10px] mb-2">RareOff</p>
        <h3 className="text-white text-xl font-bold mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-red-500 text-lg font-black">{inr(product.price)}</p>
      </div>
    </Link>
  );
}
