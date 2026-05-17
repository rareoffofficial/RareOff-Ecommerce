import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import { adminService } from "../../services/adminService";
import { inr } from "../../utils/formatCurrency";

const STATUSES = ["", "PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = { size: 100, sort: "placedAt,desc" };
    if (status) params.status = status;
    adminService.listOrders(params)
      .then((r) => setOrders(r.content || []))
      .finally(() => setLoading(false));
  }, [status]);

  const columns = [
    { key: "orderNumber", header: "Order #",
      render: (r) => <Link to={`/admin/orders/${r.id}`} className="font-mono text-sm hover:text-red-500">{r.orderNumber}</Link> },
    { key: "items",  header: "Items", render: (r) => r.items.length },
    { key: "total",  header: "Total", render: (r) => <span className="font-bold">{inr(r.total)}</span> },
    { key: "method", header: "Method", render: (r) => r.paymentMethod || "—" },
    { key: "ps",     header: "Payment", render: (r) => <Badge value={r.paymentStatus} /> },
    { key: "status", header: "Status",  render: (r) => <Badge value={r.status} /> },
    { key: "date",   header: "Placed",
      render: (r) => new Date(r.placedAt).toLocaleString() },
  ];

  return (
    <>
      <PageHeader title="Orders" subtitle={`${orders.length} order${orders.length === 1 ? "" : "s"}`}
        actions={
          <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none">
            {STATUSES.map((s) => <option key={s} value={s}>{s || "All statuses"}</option>)}
          </select>
        }
      />
      {loading ? <p className="text-zinc-500">Loading...</p> : <DataTable columns={columns} rows={orders} />}
    </>
  );
}
