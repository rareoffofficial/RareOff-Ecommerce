import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import { adminService } from "../../services/adminService";
import { inr } from "../../utils/formatCurrency";

const NEXT = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = () => adminService.getOrder(id).then(setOrder).catch(() => {});
  useEffect(() => { load(); }, [id]);

  const updateStatus = async (s) => {
    setUpdating(true);
    try { await adminService.updateOrderStatus(id, s); toast.success("Updated"); load(); }
    catch (e) { toast.error(e?.response?.data?.message || "Failed"); }
    finally { setUpdating(false); }
  };

  if (!order) return <p className="text-zinc-500">Loading...</p>;

  return (
    <>
      <PageHeader
        title={order.orderNumber}
        subtitle={`Placed ${new Date(order.placedAt).toLocaleString()}`}
        actions={<Link to="/admin/orders" className="text-xs tracking-widest text-zinc-400 hover:text-white">← BACK</Link>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((it) => (
                <div key={it.id} className="flex items-center gap-4 p-3 bg-zinc-950/40 rounded-xl">
                  <img src={it.image || "https://placehold.co/80"} alt="" className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-bold">{it.name}</p>
                    <p className="text-xs text-zinc-500">{it.sku} · qty {it.quantity}</p>
                  </div>
                  <p className="font-bold">{inr(it.lineTotal)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Shipping</h2>
            <p className="text-sm text-zinc-300 leading-7">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
              {order.shippingAddress.country}<br />
              <span className="text-zinc-500">{order.shippingAddress.phone}</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">Subtotal</span><span>{inr(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Shipping</span><span>{inr(order.shippingFee)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Tax</span><span>{inr(order.tax)}</span></div>
            <div className="flex justify-between text-lg font-black border-t border-white/5 pt-3">
              <span>Total</span><span className="text-red-500">{inr(order.total)}</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-zinc-400">Order Status</span><Badge value={order.status} /></div>
            <div className="flex items-center justify-between"><span className="text-zinc-400">Payment</span><Badge value={order.paymentStatus} /></div>
            <div className="flex items-center justify-between"><span className="text-zinc-400">Method</span><span>{order.paymentMethod || "—"}</span></div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <p className="text-xs text-zinc-400 tracking-widest uppercase mb-4">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {NEXT.map((s) => (
                <button key={s} disabled={updating || s === order.status}
                        onClick={() => updateStatus(s)}
                        className={`px-3 py-2 rounded-lg text-xs tracking-widest border
                          ${s === order.status
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-zinc-800 hover:bg-zinc-700 border-white/5"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
