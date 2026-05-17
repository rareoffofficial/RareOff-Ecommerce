const VARIANTS = {
  PENDING:   "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  PAID:      "bg-green-500/15  text-green-300  border-green-500/30",
  SHIPPED:   "bg-blue-500/15   text-blue-300   border-blue-500/30",
  DELIVERED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  CANCELLED: "bg-red-500/15    text-red-300    border-red-500/30",
  REFUNDED:  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  FAILED:    "bg-red-500/15    text-red-300    border-red-500/30",
  ACTIVE:    "bg-green-500/15  text-green-300  border-green-500/30",
  INACTIVE:  "bg-zinc-500/15   text-zinc-300   border-zinc-500/30",
};

export default function Badge({ value }) {
  const cls = VARIANTS[value] || "bg-zinc-500/15 text-zinc-300 border-zinc-500/30";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[10px] tracking-widest border ${cls}`}>
      {value}
    </span>
  );
}
