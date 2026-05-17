import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import { adminService } from "../../services/adminService";

export default function ImageUploader({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const f of files) {
        const r = await adminService.upload(f);
        urls.push(r.url);
      }
      onChange([...value, ...urls]);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Upload failed");
    } finally { setUploading(false); }
  };

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
        {value.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-800 group">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => remove(i)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 opacity-0 group-hover:opacity-100">
              <X size={14} />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 bg-red-500 text-[9px] px-2 py-0.5 rounded">PRIMARY</span>
            )}
          </div>
        ))}

        <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-red-500 flex flex-col items-center justify-center cursor-pointer text-zinc-500 hover:text-white">
          <UploadCloud size={22} />
          <span className="text-xs mt-2">{uploading ? "Uploading..." : "Add"}</span>
          <input type="file" multiple accept="image/*" className="hidden"
                 onChange={(e) => handleFiles(e.target.files)} disabled={uploading} />
        </label>
      </div>
      <p className="text-xs text-zinc-500">First image becomes primary. Max 10MB each.</p>
    </div>
  );
}
