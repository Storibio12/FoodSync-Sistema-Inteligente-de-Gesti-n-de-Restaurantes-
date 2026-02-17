"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/app/lib/adminApi";

export default function AdminInventoryPage() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product_id: "", movement_type: "IN", quantity: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [movData, prodData] = await Promise.all([
        adminGet("inventory-movements"),
        adminGet("products"),
      ]);
      setMovements(movData?.data?.movements ?? []);
      setProducts(prodData?.data?.products ?? []);
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
      await adminPost("inventory-movements", {
        product_id: Number(form.product_id),
        movement_type: form.movement_type,
        quantity: Number(form.quantity),
      });
      setShowForm(false);
      setForm({ product_id: "", movement_type: "IN", quantity: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al registrar");
    }
  }

  if (loading) return <div className="container p-t-40"><p className="txt4">Cargando...</p></div>;

  return (
    <div className="container">
      <h1 className="tit3 m-b-35">Inventario</h1>
      {error && <p className="txt4 m-b-20" style={{ color: "#c0392b" }}>{error}</p>}

      <div className="m-b-30">
        <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" onClick={() => setShowForm(true)}>Nuevo movimiento</button>
      </div>

      {showForm && (
        <div className="bo-rad-10 bgwhite p-l-30 p-r-30 p-t-30 p-b-30 m-b-30">
          <h3 className="tit5 m-b-20">Registrar movimiento</h3>
          <form onSubmit={handleSubmit} className="row">
            <div className="col-md-4 m-b-20">
              <span className="txt9">Producto</span>
              <select className="bo-rad-10 sizefull txt10 p-l-20 bo2 size12 m-t-3" value={form.product_id} onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))} required>
                <option value="">Seleccionar</option>
                {products.map((p) => (
                  <option key={p.product_id ?? p.id} value={p.product_id ?? p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 m-b-20">
              <span className="txt9">Tipo</span>
              <select className="bo-rad-10 sizefull txt10 p-l-20 bo2 size12 m-t-3" value={form.movement_type} onChange={(e) => setForm((f) => ({ ...f, movement_type: e.target.value }))}>
                <option value="IN">Entrada</option>
                <option value="OUT">Salida</option>
              </select>
            </div>
            <div className="col-md-2 m-b-20">
              <span className="txt9">Cantidad</span>
              <input className="bo-rad-10 sizefull txt10 p-l-20 bo2 size12 m-t-3" type="number" min="1" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} required />
            </div>
            <div className="col-md-4 m-b-20 flex-w flex-align-end">
              <button type="submit" className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-10">Guardar</button>
              <button type="button" className="btn3 flex-c-m size13 txt11 trans-0-4" style={{ background: "#666" }} onClick={() => setShowForm(false)}>Cerrar</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive bo-rad-10 bgwhite overflow-hidden">
        <table className="table table-striped m-b-0">
          <thead>
            <tr className="txt9">
              <th className="p-l-20 p-t-20 p-b-20">ID</th>
              <th>Producto ID</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th className="p-r-20">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr><td colSpan={5} className="p-l-20 p-t-20 p-b-20 txt23">No hay movimientos.</td></tr>
            ) : (
              movements.map((m) => (
                <tr key={m.movement_id ?? m.id}>
                  <td className="p-l-20 p-t-15 p-b-15">{m.movement_id ?? m.id}</td>
                  <td>{m.product_id ?? "—"}</td>
                  <td>{m.movement_type ?? "—"}</td>
                  <td>{m.quantity ?? "—"}</td>
                  <td className="p-r-20">{m.created_at ?? m.date ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
