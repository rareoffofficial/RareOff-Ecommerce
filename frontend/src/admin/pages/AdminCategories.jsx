import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { adminService } from "../../services/adminService";

const EMPTY = { name: "", imageUrl: "", parentId: null };

export default function AdminCategories() {
  const [cats, setCats]       = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [toDelete, setDelete] = useState(null);

  const refresh = () => adminService.listCategories().then(setCats).catch(() => {});
  useEffect(() => { refresh(); }, []);

  const open = (c) => { setEditing(c); setForm(c ? { name: c.name, imageUrl: c.imageUrl || "", parentId: c.parentId } : EMPTY); };
  const close = () => { setEditing(null); setForm(EMPTY); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing?.id) await adminService.updateCategory(editing.id, form);
      else             await adminService.createCategory(form);
      toast.success("Saved"); close(); refresh();
    } catch (err) { toast.error(err?.response?.data?.message || "Save failed"); }
    finally { setSaving(false); }
  };

  const doDelete = async () => {
    try { await adminService.deleteCategory(toDelete.id); toast.success("Deleted"); setDelete(null); refresh(); }
    catch (err) { toast.error(err?.response?.data?.message || "Delete failed"); }
  };

  const columns = [
    { key: "name",     header: "Name" },
    { key: "slug",     header: "Slug" },
    { key: "parent",   header: "Parent", render: (r) => r.parentId || "—" },
    { key: "actions",  header: "",
      render: (r) => (
        <div className="flex gap-2 justify-end">
          <button onClick={() => open(r)} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"><Pencil size={14} /></button>
          <button onClick={() => setDelete(r)} className="p-2 rounded-lg bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
        </div>),
      tdClass: "text-right" },
  ];

  const input = "w-full bg-zinc-800 border border-white/5 rounded-xl px-4 py-3 outline-none focus:border-red-500";

  return (
    <>
      <PageHeader title="Categories" subtitle={`${cats.length} categories`}
        actions={
          <button onClick={() => open(null)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> New Category
          </button>
        }
      />
      <DataTable columns={columns} rows={cats} />

      <Modal open={editing !== null} onClose={close}
             title={editing?.id ? "Edit Category" : "New Category"}>
        <form onSubmit={save} className="space-y-5">
          <input required placeholder="Name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Image URL" className={input} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <select className={input} value={form.parentId || ""} onChange={(e) => setForm({ ...form, parentId: e.target.value ? Number(e.target.value) : null })}>
            <option value="">— Top level —</option>
            {cats.filter((c) => c.id !== editing?.id).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={close} className="px-4 py-2 rounded-lg bg-zinc-800">Cancel</button>
            <button disabled={saving} className="px-4 py-2 rounded-lg bg-red-500 text-white">{saving ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!toDelete} onClose={() => setDelete(null)} title="Delete category?"
             footer={<>
               <button onClick={() => setDelete(null)} className="px-4 py-2 rounded-lg bg-zinc-800">Cancel</button>
               <button onClick={doDelete} className="px-4 py-2 rounded-lg bg-red-500 text-white">Delete</button>
             </>}>
        <p className="text-zinc-400 text-sm">Remove <b className="text-white">{toDelete?.name}</b>?</p>
      </Modal>
    </>
  );
}
