import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { loadRazorpay } from "../utils/loadRazorpay";
import { inr } from "../utils/formatCurrency";

const EMPTY_ADDRESS = {
  fullName: "", phone: "", line1: "", line2: "",
  city: "", state: "", pincode: "", country: "IN",
};

export default function Checkout() {
  const { cart, refresh } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({ ...EMPTY_ADDRESS, fullName: user?.fullName || "", phone: user?.phone || "" });
  const [method, setMethod]   = useState("COD");
  const [placing, setPlacing] = useState(false);

  const f = (k) => (e) => setAddress({ ...address, [k]: e.target.value });

  const handleRazorpay = async (order) => {
    const ok = await loadRazorpay();
    if (!ok) { toast.error("Could not load Razorpay"); return; }

    const intent = await paymentService.createRazorpayOrder(order.id);
    const rzp = new window.Razorpay({
      key: intent.keyId,
      amount: intent.amount,
      currency: intent.currency,
      order_id: intent.razorpayOrderId,
      name: "RAREOFF",
      description: intent.receipt,
      prefill: { name: address.fullName, email: user?.email, contact: address.phone },
      theme: { color: "#ef4444" },
      handler: async (resp) => {
        try {
          await paymentService.verifyRazorpay({
            razorpayOrderId:   resp.razorpay_order_id,
            razorpayPaymentId: resp.razorpay_payment_id,
            razorpaySignature: resp.razorpay_signature,
          });
          toast.success("Payment successful");
          await refresh();
          navigate("/");
        } catch (e) {
          toast.error(e?.response?.data?.message || "Verification failed");
        }
      },
    });
    rzp.open();
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!cart.items?.length) { toast.error("Cart is empty"); return; }
    setPlacing(true);
    try {
      const order = await orderService.checkout({
        shippingAddress: address,
        paymentMethod: method,
      });
      if (method === "RAZORPAY") {
        await handleRazorpay(order);
      } else {
        toast.success("Order placed (COD)");
        await refresh();
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Checkout failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen py-28 px-6 md:px-10">
        <h1 className="text-5xl font-bold text-center mb-16">Checkout</h1>

        <form onSubmit={placeOrder} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-zinc-900 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8">Shipping Details</h2>
            <div className="space-y-4">
              <input required value={address.fullName} onChange={f("fullName")} placeholder="Full Name"
                     className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              <input required value={address.phone}    onChange={f("phone")}    placeholder="Phone"
                     className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              <input required value={address.line1}    onChange={f("line1")}    placeholder="Address Line 1"
                     className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              <input value={address.line2}    onChange={f("line2")}    placeholder="Address Line 2 (optional)"
                     className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input required value={address.city}    onChange={f("city")}    placeholder="City"
                       className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
                <input required value={address.state}   onChange={f("state")}   placeholder="State"
                       className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required value={address.pincode} onChange={f("pincode")} placeholder="Pincode"
                       className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
                <input value={address.country} onChange={f("country")} placeholder="Country"
                       className="w-full bg-zinc-800 p-4 rounded-xl outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-2xl h-fit">
            <h2 className="text-3xl font-bold mb-8">Payment Summary</h2>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between"><span className="text-gray-400">Items</span><span>{cart.totalItems}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>{inr(cart.totalPrice)}</span></div>
              <div className="flex justify-between text-sm text-gray-500"><span>Tax + shipping</span><span>calculated server-side</span></div>
            </div>

            <h3 className="text-xl font-bold mb-4">Payment Method</h3>
            <div className="space-y-3 mb-8">
              {["COD", "RAZORPAY"].map((m) => (
                <label key={m}
                       className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer ${method === m ? "bg-red-500/20 border border-red-500" : "bg-zinc-800"}`}>
                  <input type="radio" name="method" value={m} checked={method === m}
                         onChange={() => setMethod(m)} className="accent-red-500" />
                  <span>{m === "COD" ? "Cash On Delivery" : "Razorpay (Cards/UPI)"}</span>
                </label>
              ))}
            </div>

            <button type="submit" disabled={placing}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 py-5 rounded-xl text-xl font-bold">
              {placing ? "Placing..." : "Place Order"}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}
