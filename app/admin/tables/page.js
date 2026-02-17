"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";

export default function AdminTablesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ table_number: "", capacity: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("tables");
      setList(data?.data?.tables ?? []);
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
    const payload = { table_number: Number(form.table_number), capacity: Number(form.capacity) };
    try {
      if (modal?.id != null) {
        await adminPatch(`tables/${modal.id}`, payload);
      } else {
        await adminPost("tables", payload);
      }
      setModal(null);
      setForm({ table_number: "", capacity: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta mesa?")) return;
    setError("");
    try {
      await adminDelete(`tables/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(t) {
    setModal({ id: t.table_id ?? t.id });
    setForm({ table_number: String(t.table_number ?? ""), capacity: String(t.capacity ?? "") });
  }

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Mesas</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => { setModal({}); setForm({ table_number: "", capacity: "" }); }}>Nueva mesa</button>
      </div>

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Nº Mesa</th>
              <th>Capacidad</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr><td colSpan={4} className="p-l-20 p-t-20 p-b-20 txt23">No hay mesas.</td></tr>
            ) : (
              list.map((t) => (
                <tr key={t.table_id ?? t.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{t.table_id ?? t.id}</td>
                  <td>{t.table_number ?? "—"}</td>
                  <td>{t.capacity ?? "—"}</td>
                  <td className="p-r-20">
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5" onClick={() => openEdit(t)}>Editar</button>
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4" style={{ background: "#c0392b" }} onClick={() => handleDelete(t.table_id ?? t.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <div className="admin-modal-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }} onClick={() => setModal(null)}>
          <div className="bo-rad-10 bgwhite p-l-50 p-r-50 p-t-50 p-b-50" style={{ minWidth: 320 }} onClick={(e) => e.stopPropagation()}>
            <h3 className="tit5 m-b-25">{modal.id != null ? "Editar mesa" : "Nueva mesa"}</h3>
            <form onSubmit={handleSubmit}>
              <span className="txt9">Número de mesa</span>
              <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" min="1" value={form.table_number} onChange={(e) => setForm((f) => ({ ...f, table_number: e.target.value }))} required />
              </div>
              <span className="txt9">Capacidad</span>
              <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" min="1" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))} required />
              </div>
              <div className="flex-w">
                <button type="submit" className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-10">Guardar</button>
                <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" style={{ background: "#666" }} onClick={() => setModal(null)}>Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
