"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }
      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  }


  // password = "123456789"

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 md:p-10">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-2">Panel de administración</h1>
          <p className="text-sm text-slate-500 text-center mb-6">Inicia sesión con tu cuenta.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                id="login-email"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b]"
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <input
                id="login-password"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b]"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-center text-[#c0392b]" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-medium text-black bg-[#c0392b] hover:bg-[#a93226] rounded-lg transition-colors disabled:opacity-60 disabled:pointer-events-none"
              disabled={loading}
            >
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>

          <p className="text-center mt-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[#c0392b] transition-colors">
              Volver al sitio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
