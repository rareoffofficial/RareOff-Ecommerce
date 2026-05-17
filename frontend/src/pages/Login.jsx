import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">Login</h1>

        <form className="flex flex-col gap-5" onSubmit={submit}>
          <input
            type="email" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter Email"
            className="bg-zinc-800 text-white p-4 rounded-lg outline-none"
          />
          <input
            type="password" required value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter Password"
            className="bg-zinc-800 text-white p-4 rounded-lg outline-none"
          />
          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-4 rounded-lg font-bold text-lg"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6">
          Don’t have an account?
          <Link to="/register" className="text-red-500 ml-2">Register</Link>
        </p>
      </div>
    </div>
  );
}
