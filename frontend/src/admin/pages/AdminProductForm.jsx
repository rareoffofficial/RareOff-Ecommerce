import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import ImageUploader from "../components/ImageUploader";
import { adminService } from "../../services/adminService";

const EMPTY = {
  sku: "", name: "", description: "",
  price: "", compareAtPrice: "", stock: 0,
  categoryId: "", brand: "RAREOFF", material: "",
  active: true, featured: false, trending: false,
  imageUrls: [],
};

export default function AdminProductForm() {
  const { id } = useParams();
  const editing = !!id;
  const navigate = useNavigate();

  const [form, setForm]             = useState(EMPTY);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving]         = useState(false);

  useEffect(() => { adminService.listCategories().then(setCategories).catch(() => {}); }, []);

  useEffect(() => {
    if (!editing) return;
    adminService.getProduct(id).then((p) => setForm({
      sku: p.sku, name: p.name, description: p.description || "",
      price: p.price, compareAtPrice: p.compareAtPrice || "",
      stock: p.stock, categoryId: p.categoryId || "",
      brand: p.brand || "", material: p.material || "",
      active: p.active, featured: p.featured, trending: p.trending,
      imageUrls: (p.images || []).map((i) => i.url),
    }));
  }, [id, editing]);

  const f = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [k]: v });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        stock: Number(form.stock),
        categoryId: form.categoryId ? Number(form.categoryId) : null,
      };
      if (editing) await adminService.updateProduct(id, body);
      else         await adminService.createProduct(body);
      toast.success(editing ? "Updated" : "Created");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  };

  const Field = ({ label, children }) => (
    <label className="block">
      <span className="text-xs text-zinc-400 tracking-widest uppercase">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );

  const input = "w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-red-500";

  return (
    <>
      <PageHeader title={editing ? "Edit Product" : "New Product"} />

      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <Field label="Name"><input className={input} required value={form.name} onChange={f("name")} /></Field>
            <Field label="SKU"><input className={input} required value={form.sku} onChange={f("sku")} /></Field>
            <Field label="Description"><textarea className={input} rows={5} value={form.description} onChange={f("description")} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Brand"><input className={input} value={form.brand} onChange={f("brand")} /></Field>
              <Field label="Material"><input className={input} value={form.material} onChange={f("material")} /></Field>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
            <p className="text-xs text-zinc-400 tracking-widest uppercase mb-4">Images</p>
            <ImageUploader value={form.imageUrls} onChange={(urls) => setForm({ ...form, imageUrls: urls })} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-5">
            <Field label="Price (₹)"><input type="number" min="0" step="0.01" required className={input} value={form.price} onChange={f("price")} /></Field>
            <Field label="Compare Price (₹)"><input type="number" min="0" step="0.01" className={input} value={form.compareAtPrice} onChange={f("compareAtPrice")} /></Field>
            <Field label="Stock"><input type="number" min="0" required className={input} value={form.stock} onChange={f("stock")} /></Field>
            <Field label="Category">
              <select className={input} value={form.categoryId} onChange={f("categoryId")}>
                <option value="">— None —</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          </div>

          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4">
            <label className="flex items-center gap-3"><input type="checkbox" className="accent-red-500" checked={form.active}   onChange={f("active")}   /> Active</label>
            <label className="flex items-center gap-3"><input type="checkbox" className="accent-red-500" checked={form.featured} onChange={f("featured")} /> Featured</label>
            <label className="flex items-center gap-3"><input type="checkbox" className="accent-red-500" checked={form.trending} onChange={f("trending")} /> Trending</label>
          </div>

          <button disabled={saving}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-4 rounded-xl font-bold">
            {saving ? "Saving..." : (editing ? "Update Product" : "Create Product")}
          </button>
        </div>
      </form>
    </>
  );
}
