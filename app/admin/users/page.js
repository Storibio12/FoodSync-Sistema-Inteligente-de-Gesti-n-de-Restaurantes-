"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";

export default function AdminUsersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role_id: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("users");
      setList(data?.data?.users ?? []);
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
    const payload = { name: form.name, email: form.email, ...(form.password && { password: form.password }), ...(form.role_id && { role_id: Number(form.role_id) }) };
    try {
      if (modal?.id != null) {
        await adminPatch(`users/${modal.id}`, payload);
      } else {
        if (!form.password) throw new Error("La contraseña es obligatoria para nuevo usuario");
        await adminPost("users", { ...payload, password: form.password });
      }
      setModal(null);
      setForm({ name: "", email: "", password: "", role_id: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este usuario?")) return;
    setError("");
    try {
      await adminDelete(`users/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(u) {
    setModal({ id: u.user_id ?? u.id });
    setForm({ name: u.name ?? "", email: u.email ?? "", password: "", role_id: String(u.role_id ?? "") });
  }

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Usuarios</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => { setModal({}); setForm({ name: "", email: "", password: "", role_id: "" }); }}>Nuevo usuario</button>
      </div>

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr><td colSpan={5} className="p-l-20 p-t-20 p-b-20 txt23">No hay usuarios.</td></tr>
            ) : (
              list.map((u) => (
                <tr key={u.user_id ?? u.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{u.user_id ?? u.id}</td>
                  <td>{u.name ?? "—"}</td>
                  <td>{u.email ?? "—"}</td>
                  <td>{u.role_id ?? "—"}</td>
                  <td className="p-r-20">
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5" onClick={() => openEdit(u)}>Editar</button>
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4" style={{ background: "#c0392b" }} onClick={() => handleDelete(u.user_id ?? u.id)}>Eliminar</button>
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
            <h3 className="tit5 m-b-25">{modal.id != null ? "Editar usuario" : "Nuevo usuario"}</h3>
            <form onSubmit={handleSubmit}>
              <span className="txt9">Nombre</span>
              <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <span className="txt9">Email</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required />
              </div>
              <span className="txt9">Contraseña {modal.id != null && "(dejar en blanco para no cambiar)"}</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} placeholder={modal.id != null ? "Opcional" : ""} required={modal.id == null} />
              </div>
              <span className="txt9">Rol ID (opcional)</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" min="1" value={form.role_id} onChange={(e) => setForm((f) => ({ ...f, role_id: e.target.value }))} />
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
