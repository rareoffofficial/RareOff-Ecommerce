export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-[10px] text-red-500 tracking-[4px] uppercase">RAREOFF Admin</p>
        <h1 className="text-3xl md:text-4xl font-black mt-1">{title}</h1>
        {subtitle && <p className="text-zinc-400 mt-2 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}
