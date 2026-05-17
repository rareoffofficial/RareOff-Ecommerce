export default function DataTable({ columns, rows, emptyText = "No records" }) {
  if (!rows?.length) return <div className="bg-zinc-900 rounded-2xl p-12 text-center text-zinc-500">{emptyText}</div>;

  return (
    <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-zinc-950/60 text-zinc-400 text-xs uppercase tracking-widest">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className={`px-5 py-4 text-left ${c.thClass || ""}`}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id ?? i} className="border-t border-white/5 hover:bg-white/[0.02]">
                {columns.map((c) => (
                  <td key={c.key} className={`px-5 py-4 align-middle ${c.tdClass || ""}`}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
