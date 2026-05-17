import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { inr } from "../utils/formatCurrency";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { add: addToCart } = useCart();
  const { add: addToWish, remove: removeWish, has } = useWishlist();

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [qty, setQty]           = useState(1);

  useEffect(() => {
    setLoading(true);
    productService.getById(id).then(setProduct).finally(() => setLoading(false));
  }, [id]);

  const requireAuth = () => {
    if (!user) { navigate("/login"); return false; }
    return true;
  };

  const handleAdd = async () => {
    if (!requireAuth()) return;
    try { await addToCart(product.id, qty); toast.success("Added to cart"); }
    catch (e) { toast.error(e?.response?.data?.message || "Failed"); }
  };

  const toggleWish = async () => {
    if (!requireAuth()) return;
    try {
      if (has(product.id)) { await removeWish(product.id); toast("Removed from wishlist"); }
      else                 { await addToWish(product.id);   toast.success("Added to wishlist"); }
    } catch (e) { toast.error(e?.response?.data?.message || "Failed"); }
  };

  if (loading) return (<><Navbar /><div className="min-h-screen bg-black text-white pt-40 px-6">Loading...</div></>);
  if (!product) return (<><Navbar /><div className="min-h-screen bg-black text-white pt-40 px-6">Product not found.</div></>);

  const img = product.images?.[0]?.url || "https://placehold.co/800x1000/000/fff";

  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-3xl overflow-hidden bg-zinc-900">
            <img src={img} alt={product.name} className="w-full h-[700px] object-cover" />
          </div>

          <div>
            <p className="text-red-500 uppercase tracking-[5px] mb-4">RareOff · {product.categoryName}</p>
            <h1 className="text-5xl md:text-6xl font-black mb-6">{product.name}</h1>
            <p className="text-red-500 text-4xl font-black mb-8">{inr(product.price)}</p>
            <p className="text-gray-400 leading-relaxed mb-10">{product.description}</p>

            <div className="flex items-center gap-5 mb-8">
              <div className="flex items-center border border-white/10 rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-5 py-3">−</button>
                <span className="px-6 font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-5 py-3">+</button>
              </div>
              <span className="text-gray-500">{product.stock} in stock</span>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAdd}
                className="flex-1 bg-red-500 hover:bg-red-600 py-5 rounded-full text-lg font-black flex items-center justify-center gap-3">
                <ShoppingBag size={20} /> Add To Cart
              </button>
              <button onClick={toggleWish}
                className={`p-5 rounded-full border border-white/10 ${has(product.id) ? "bg-red-500" : "bg-zinc-900"}`}>
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
