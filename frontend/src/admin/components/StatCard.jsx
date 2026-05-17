export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-zinc-400 text-xs tracking-widest uppercase">{label}</p>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <Icon size={18} />
          </div>
        )}
      </div>
      <p className="text-4xl font-black text-white">{value}</p>
      {hint && <p className="text-xs text-zinc-500 mt-2">{hint}</p>}
    </div>
  );
}
