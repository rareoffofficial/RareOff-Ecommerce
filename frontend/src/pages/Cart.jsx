import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { inr } from "../utils/formatCurrency";

export default function Cart() {
  const { cart, update, remove, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return (<><Navbar /><div className="min-h-screen bg-black text-white pt-40 px-6">Loading cart...</div></>);

  const empty = !cart.items?.length;

  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 uppercase tracking-[5px] mb-4">RareOff</p>
          <h1 className="text-5xl md:text-7xl font-black mb-16">YOUR CART</h1>

          {empty ? (
            <div className="flex flex-col items-center justify-center text-center py-32">
              <div className="bg-zinc-900 p-10 rounded-full mb-10"><ShoppingBag size={60} /></div>
              <h2 className="text-4xl font-black mb-6">Your Cart Is Empty</h2>
              <Link to="/shop" className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-red-500 hover:text-white transition">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
              <div className="space-y-8">
                {cart.items.map((it) => (
                  <div key={it.id} className="bg-zinc-900 rounded-[35px] p-6 md:p-8 flex flex-col md:flex-row gap-8">
                    <div className="overflow-hidden rounded-3xl">
                      <img src={it.imageUrl} alt={it.name}
                           className="w-full md:w-[240px] h-[320px] object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-red-500 uppercase tracking-[4px] mb-4">RareOff</p>
                        <h2 className="text-3xl font-black mb-5">{it.name}</h2>
                        <p className="text-red-500 text-3xl font-black">{inr(it.price)}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
                        <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                          <button onClick={() => update(it.id, Math.max(1, it.quantity - 1))} className="px-5 py-4"><Minus size={18} /></button>
                          <span className="px-6 font-bold">{it.quantity}</span>
                          <button onClick={() => update(it.id, it.quantity + 1)} className="px-5 py-4"><Plus size={18} /></button>
                        </div>
                        <button onClick={() => { remove(it.id); toast("Removed"); }}
                                className="flex items-center gap-3 text-red-500 hover:text-white transition">
                          <Trash2 size={20} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-28 h-fit">
                <div className="bg-zinc-900 rounded-[40px] p-10">
                  <h2 className="text-4xl font-black mb-10">Order Summary</h2>
                  <div className="flex justify-between mb-6 text-lg">
                    <span className="text-gray-400">Items</span><span>{cart.totalItems}</span>
                  </div>
                  <div className="flex justify-between mb-6 text-lg">
                    <span className="text-gray-400">Shipping</span><span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-white/10 pt-8 flex justify-between items-center mb-10">
                    <span className="text-2xl font-bold">Subtotal</span>
                    <span className="text-red-500 text-4xl font-black">{inr(cart.totalPrice)}</span>
                  </div>
                  <button onClick={() => navigate("/checkout")}
                          className="w-full bg-white text-black py-5 rounded-full text-lg font-black hover:bg-red-500 hover:text-white transition">
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
