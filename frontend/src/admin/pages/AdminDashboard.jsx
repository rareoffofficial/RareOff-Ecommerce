import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Tag, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import { adminService } from "../../services/adminService";
import { inr } from "../../utils/formatCurrency";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, pending: 0 });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [prod, cats, orders, pending] = await Promise.all([
          adminService.listProducts({ size: 1 }),
          adminService.listCategories(),
          adminService.listOrders({ size: 5, sort: "placedAt,desc" }),
          adminService.listOrders({ status: "PENDING", size: 1 }),
        ]);
        setStats({
          products:   prod.totalElements ?? prod.content?.length ?? 0,
          categories: cats.length ?? 0,
          orders:     orders.totalElements ?? 0,
          pending:    pending.totalElements ?? 0,
        });
        setRecent(orders.content || []);
      } catch {}
    })();
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Storefront overview at a glance." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard icon={Package}     label="Products"   value={stats.products} />
        <StatCard icon={Tag}         label="Categories" value={stats.categories} />
        <StatCard icon={ShoppingBag} label="Orders"     value={stats.orders} />
        <StatCard icon={Clock}       label="Pending"    value={stats.pending} />
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs text-red-500 tracking-widest">VIEW ALL →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-zinc-500 text-sm">No recent orders.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((o) => (
              <Link key={o.id} to={`/admin/orders/${o.id}`}
                    className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/40 hover:bg-zinc-950 border border-white/5">
                <div>
                  <p className="font-mono text-sm">{o.orderNumber}</p>
                  <p className="text-xs text-zinc-500 mt-1">{o.items.length} items · {inr(o.total)}</p>
                </div>
                <Badge value={o.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
