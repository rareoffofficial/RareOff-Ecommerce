import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">Create Account</h1>

        <form className="flex flex-col gap-5" onSubmit={submit}>
          <input required value={form.fullName} onChange={f("fullName")}
                 placeholder="Full Name"
                 className="bg-zinc-800 text-white p-4 rounded-lg outline-none" />
          <input type="email" required value={form.email} onChange={f("email")}
                 placeholder="Email"
                 className="bg-zinc-800 text-white p-4 rounded-lg outline-none" />
          <input value={form.phone} onChange={f("phone")}
                 placeholder="Phone (optional)"
                 className="bg-zinc-800 text-white p-4 rounded-lg outline-none" />
          <input type="password" required minLength={8} value={form.password} onChange={f("password")}
                 placeholder="Password (min 8 chars, letter + number)"
                 className="bg-zinc-800 text-white p-4 rounded-lg outline-none" />
          <button disabled={loading}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-4 rounded-lg font-bold text-lg">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-red-500 ml-2">Login</Link>
        </p>
      </div>
    </div>
  );
}
