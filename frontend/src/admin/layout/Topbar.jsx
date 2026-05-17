import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ onMenu }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur border-b border-white/5 px-5 py-4 flex items-center justify-between">
      <button onClick={onMenu} className="lg:hidden text-white"><Menu size={22} /></button>
      <Link to="/" className="text-xs text-zinc-400 hover:text-white tracking-widest">← VIEW STORE</Link>
      <div className="text-right">
        <p className="text-sm text-white">{user?.fullName || "Admin"}</p>
        <p className="text-[10px] text-red-500 tracking-widest">ADMIN</p>
      </div>
    </header>
  );
}
