"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/app/lib/adminApi";

export default function AdminSalesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    adminGet("sales")
      .then((data) => setList(Array.isArray(data) ? data : (data?.data?.sales ?? [])))
      .catch((e) => setError(e.message || "Error al cargar"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container p-t-40"><p className="txt4">Cargando...</p></div>;

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Ventas</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Total</th>
              <th className="p-r-20">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={3} className="p-l-20 p-t-20 p-b-20 txt23">No hay ventas.</td></tr>
            ) : (
              list.map((s) => (
                <tr key={s.sale_id ?? s.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{s.sale_id ?? s.id}</td>
                  <td>{s.total != null ? s.total : "—"}</td>
                  <td className="p-r-20">{s.sale_date ?? s.created_at ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
