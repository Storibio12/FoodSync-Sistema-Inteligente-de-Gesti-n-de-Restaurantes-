"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";

export default function AdminEmployeesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", position: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("employee");
      setList(data?.data?.employees ?? []);
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
      if (modal?.id != null) {
        await adminPatch(`employee/${modal.id}`, { name: form.name, position: form.position });
      } else {
        await adminPost("employee", { name: form.name, position: form.position });
      }
      setModal(null);
      setForm({ name: "", position: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este empleado?")) return;
    setError("");
    try {
      await adminDelete(`employee/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(emp) {
    setModal({ id: emp.employee_id ?? emp.id });
    setForm({ name: emp.name ?? "", position: emp.position ?? "" });
  }

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Empleados</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => { setModal({}); setForm({ name: "", position: "" }); }}>Nuevo empleado</button>
      </div>

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Nombre</th>
              <th>Posición</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr><td colSpan={4} className="p-l-20 p-t-20 p-b-20 txt23">No hay empleados.</td></tr>
            ) : (
              list.map((e) => (
                <tr key={e.employee_id ?? e.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{e.employee_id ?? e.id}</td>
                  <td>{e.name ?? "—"}</td>
                  <td>{e.position ?? "—"}</td>
                  <td className="p-r-20">
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5" onClick={() => openEdit(e)}>Editar</button>
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4" style={{ background: "#c0392b" }} onClick={() => handleDelete(e.employee_id ?? e.id)}>Eliminar</button>
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
            <h3 className="tit5 m-b-25">{modal.id != null ? "Editar empleado" : "Nuevo empleado"}</h3>
            <form onSubmit={handleSubmit}>
              <span className="txt9">Nombre</span>
              <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <span className="txt9">Posición</span>
              <div className="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} required />
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
