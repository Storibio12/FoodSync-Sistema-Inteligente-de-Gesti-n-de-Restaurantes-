"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/app/lib/adminApi";

export default function AdminReportsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", notes: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("daily-reports");
      const reports = data?.data?.daily_reports ?? data?.data?.reports ?? (Array.isArray(data) ? data : []);
      setList(Array.isArray(reports) ? reports : []);
    } catch (e) {
      setError(e.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await adminPost("daily-reports", { date: form.date, ...(form.notes && { notes: form.notes }) });
      setShowForm(false);
      setForm({ date: "", notes: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al crear reporte");
    }
  }

  if (loading) return <div className="container p-t-40"><p className="txt4">Cargando...</p></div>;

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Reportes diarios</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => setShowForm(true)}>Nuevo reporte</button>
      </div>

      {showForm && (
        <div className="bo-rad-10 bgwhite p-l-30 p-r-30 p-t-30 p-b-30 m-b-30">
          <h3 className="tit5 m-b-20">Crear reporte diario</h3>
          <form onSubmit={handleSubmit}>
            <span className="txt9">Fecha</span>
            <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <input className="bo-rad-10 sizefull txt10 p-l-20" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required />
            </div>
            <span className="txt9">Notas (opcional)</span>
            <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
              <textarea className="bo-rad-10 sizefull txt10 p-l-20 p-t-15" rows={3} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
            </div>
            <button type="submit" className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-10">Guardar</button>
            <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" style={{ background: "#666" }} onClick={() => setShowForm(false)}>Cerrar</button>
          </form>
        </div>
      )}

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th className="p-r-20">Fecha / Notas</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr><td colSpan={2} className="p-l-20 p-t-20 p-b-20 txt23">No hay reportes.</td></tr>
            ) : (
              list.map((r) => (
                <tr key={r.id ?? r.report_id}>
                  <td className="p-l-20 p-t-15 p-b-15">{r.id ?? r.report_id ?? "—"}</td>
                  <td className="p-r-20">{r.date ?? r.report_date ?? "—"} {r.notes && ` — ${r.notes}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
