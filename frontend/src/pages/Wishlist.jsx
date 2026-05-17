import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { inr } from "../utils/formatCurrency";

export default function Wishlist() {
  const { items, remove } = useWishlist();
  const { add } = useCart();

  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 uppercase tracking-[5px] mb-4">RareOff</p>
          <h1 className="text-5xl md:text-7xl font-black mb-16">WISHLIST</h1>

          {items.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-gray-400 text-xl mb-8">Your wishlist is empty.</p>
              <Link to="/shop" className="bg-white text-black px-10 py-5 rounded-full font-bold">Browse Shop</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((w) => (
                <div key={w.id} className="bg-zinc-900 rounded-3xl overflow-hidden">
                  <Link to={`/product/${w.productId}`}>
                    <img src={w.imageUrl} alt={w.name} className="w-full h-[380px] object-cover" />
                  </Link>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{w.name}</h3>
                    <p className="text-red-500 font-black text-lg mb-4">{inr(w.price)}</p>
                    <div className="flex gap-3">
                      <button onClick={async () => { await add(w.productId); toast.success("Added to cart"); }}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold">
                        Add To Cart
                      </button>
                      <button onClick={() => remove(w.productId)} className="p-3 rounded-full bg-zinc-800">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
