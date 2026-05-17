import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, LogOut, X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const links = [
  { to: "/admin",            label: "Dashboard",  icon: LayoutDashboard, end: true },
  { to: "/admin/products",   label: "Products",   icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/orders",     label: "Orders",     icon: ShoppingBag },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = async () => { await logout(); navigate("/login"); };

  return (
    <>
      {/* mobile backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-[260px] z-50
          bg-zinc-950 border-r border-white/5
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* logo */}
        <div className="px-6 py-7 flex items-center justify-between border-b border-white/5">
          <h1 className="text-white text-2xl tracking-[3px]" style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
            RAREOFF
          </h1>
          <button onClick={onClose} className="lg:hidden text-white"><X size={20} /></button>
        </div>

        {/* admin label */}
        <div className="px-6 py-4">
          <p className="text-[10px] tracking-[3px] text-red-500 uppercase">Admin Console</p>
          <p className="text-sm text-zinc-400 mt-1 truncate">{user?.email}</p>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                ${isActive
                  ? "bg-red-500/15 text-white border border-red-500/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"}
              `}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* footer */}
        <div className="p-3 border-t border-white/5">
          <button onClick={doLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-400 hover:bg-white/5 hover:text-white">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
