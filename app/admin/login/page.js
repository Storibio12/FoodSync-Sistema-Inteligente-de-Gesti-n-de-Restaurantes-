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

  return (
    <div className="container p-t-115 p-b-85">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="bo-rad-10 bgwhite p-l-50 p-r-50 p-t-50 p-b-50">
            <h3 className="tit3 t-center m-b-35">Panel de administración</h3>
            <p className="t-center m-b-30">Inicia sesión con tu cuenta.</p>

            <form onSubmit={handleSubmit}>
              <span className="txt9">Email</span>
              <div className="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input
                  className="bo-rad-10 sizefull txt10 p-l-20"
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <span className="txt9">Contraseña</span>
              <div className="wrap-inputpass size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input
                  className="bo-rad-10 sizefull txt10 p-l-20"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="t-center size13 m-b-20" style={{ color: "#c0392b" }}>
                  {error}
                </p>
              )}
              <div className="wrap-btn-booking flex-c-m m-t-6">
                <button
                  type="submit"
                  className="btn3 flex-c-m size13 txt11 trans-0-4"
                  disabled={loading}
                >
                  {loading ? "Entrando…" : "Entrar"}
                </button>
              </div>
            </form>

            <p className="t-center m-t-30">
              <Link href="/" className="txt4">
                Volver al sitio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
