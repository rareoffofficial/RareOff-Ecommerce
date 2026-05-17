import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { adminService } from "../../services/adminService";
import { inr } from "../../utils/formatCurrency";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const refresh = () => {
    setLoading(true);
    adminService.listProducts({ size: 100 })
      .then((r) => setProducts(r.content || []))
      .finally(() => setLoading(false));
  };
  useEffect(refresh, []);

  const handleDelete = async () => {
    try { await adminService.deleteProduct(toDelete.id); toast.success("Deleted"); setToDelete(null); refresh(); }
    catch (e) { toast.error(e?.response?.data?.message || "Delete failed"); }
  };

  const columns = [
    { key: "img", header: "",
      render: (r) => (
        <img src={r.images?.[0]?.url || "https://placehold.co/60"} alt=""
             className="w-12 h-12 rounded-lg object-cover" />),
      tdClass: "w-16" },
    { key: "name",  header: "Name",
      render: (r) => (<div><p className="font-medium">{r.name}</p><p className="text-xs text-zinc-500">{r.sku}</p></div>) },
    { key: "category", header: "Category", render: (r) => r.categoryName || "—" },
    { key: "price",  header: "Price", render: (r) => inr(r.price) },
    { key: "stock",  header: "Stock", render: (r) => r.stock },
    { key: "status", header: "Status",
      render: (r) => <Badge value={r.active ? "ACTIVE" : "INACTIVE"} /> },
    { key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-2 justify-end">
          <Link to={`/admin/products/${r.id}/edit`} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"><Pencil size={14} /></Link>
          <button onClick={() => setToDelete(r)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><Trash2 size={14} /></button>
        </div>
      ),
      tdClass: "text-right" },
  ];

  return (
    <>
      <PageHeader
        title="Products"
        subtitle={`${products.length} item${products.length === 1 ? "" : "s"}`}
        actions={
          <Link to="/admin/products/new"
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> New Product
          </Link>
        }
      />
      {loading ? <p className="text-zinc-500">Loading...</p> : <DataTable columns={columns} rows={products} />}

      <Modal open={!!toDelete} onClose={() => setToDelete(null)} title="Delete product?"
             footer={<>
               <button onClick={() => setToDelete(null)} className="px-4 py-2 rounded-lg bg-zinc-800">Cancel</button>
               <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white">Delete</button>
             </>}>
        <p className="text-zinc-400 text-sm">This will permanently remove <span className="text-white font-bold">{toDelete?.name}</span>.</p>
      </Modal>
    </>
  );
}
