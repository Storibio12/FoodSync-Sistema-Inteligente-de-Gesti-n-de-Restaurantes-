"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";

export default function AdminMenuPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", unit_price: "", stock: "", min_stock: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("products");
      setList(data?.data?.products ?? []);
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
    const payload = {
      name: form.name,
      unit_price: Number(form.unit_price) || 0,
      ...(form.stock !== "" && { stock: Number(form.stock) }),
      ...(form.min_stock !== "" && { min_stock: Number(form.min_stock) }),
    };
    try {
      if (modal?.id != null) {
        await adminPatch(`products/${modal.id}`, payload);
      } else {
        await adminPost("products", payload);
      }
      setModal(null);
      setForm({ name: "", unit_price: "", stock: "", min_stock: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    setError("");
    try {
      await adminDelete(`products/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(p) {
    setModal({ id: p.product_id ?? p.id });
    setForm({
      name: p.name ?? "",
      unit_price: String(p.unit_price ?? ""),
      stock: String(p.stock ?? ""),
      min_stock: String(p.min_stock ?? ""),
    });
  }

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Menú / Productos</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => { setModal({}); setForm({ name: "", unit_price: "", stock: "", min_stock: "" }); }}>Nuevo producto</button>
      </div>

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Nombre</th>
              <th>Precio unit.</th>
              <th>Stock</th>
              <th>Stock mín.</th>
              <th className="p-r-20">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr><td colSpan={6} className="p-l-20 p-t-20 p-b-20 txt23">No hay productos.</td></tr>
            ) : (
              list.map((p) => (
                <tr key={p.product_id ?? p.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{p.product_id ?? p.id}</td>
                  <td>{p.name ?? "—"}</td>
                  <td>{p.unit_price != null ? p.unit_price : "—"}</td>
                  <td>{p.stock != null ? p.stock : "—"}</td>
                  <td>{p.min_stock != null ? p.min_stock : "—"}</td>
                  <td className="p-r-20">
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4 m-r-5" onClick={() => openEdit(p)}>Editar</button>
                    <button type="button" className="btn3 flex-c-m size12 txt11 trans-0-4" style={{ background: "#c0392b" }} onClick={() => handleDelete(p.product_id ?? p.id)}>Eliminar</button>
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
            <h3 className="tit5 m-b-25">{modal.id != null ? "Editar producto" : "Nuevo producto"}</h3>
            <form onSubmit={handleSubmit}>
              <span className="txt9">Nombre</span>
              <div className="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <span className="txt9">Precio unitario</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" step="0.01" min="0" value={form.unit_price} onChange={(e) => setForm((f) => ({ ...f, unit_price: e.target.value }))} required />
              </div>
              <span className="txt9">Stock (opcional)</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
              </div>
              <span className="txt9">Stock mínimo (opcional)</span>
              <div className="size12 bo2 bo-rad-10 m-t-3 m-b-23">
                <input className="bo-rad-10 sizefull txt10 p-l-20" type="number" min="0" value={form.min_stock} onChange={(e) => setForm((f) => ({ ...f, min_stock: e.target.value }))} />
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
