"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/app/lib/adminApi";
import { Package, ArrowDownToLine, ArrowUpFromLine, Plus, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      setError(e.message || "Error al cargar el inventario");
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
      setError(e.message || "Error al registrar el movimiento");
    }
  }

  const getProductName = (id) => {
    const prod = products.find(p => (p.product_id ?? p.id) == id);
    return prod ? prod.name : "Desconocido";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-DO', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Movimientos de Inventario</h1>
          <p className="text-sm text-slate-500 mt-1">Registra y monitorea las entradas y salidas de productos.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c0392b] text-black text-sm font-medium rounded-lg hover:bg-[#a93226] hover:text-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancelar registro" : "Registrar movimiento"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> {error}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                Nuevo Movimiento
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Producto</label>
                  <select
                    value={form.product_id}
                    onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="">Selecciona un producto</option>
                    {products.map((p) => (
                      <option key={p.product_id ?? p.id} value={p.product_id ?? p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Movimiento</label>
                  <select
                    value={form.movement_type}
                    onChange={(e) => setForm((f) => ({ ...f, movement_type: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="IN">Entrada (IN)</option>
                    <option value="OUT">Salida (OUT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                    required
                    placeholder="Ej. 10"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="md:col-span-4 flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-black bg-[#c0392b] hover:bg-[#a93226] hover:text-black rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
                  >
                    Guardar Movimiento
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Num. Registro</th>
                <th scope="col" className="px-6 py-4 font-medium">Producto</th>
                <th scope="col" className="px-6 py-4 font-medium">Tipo</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Cantidad</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      Cargando historial de movimientos...
                    </div>
                  </td>
                </tr>
              ) : movements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No hay movimientos registrados.</p>
                  </td>
                </tr>
              ) : (
                movements.map((m) => (
                  <tr key={m.movement_id ?? m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      #{String(m.movement_id ?? m.id).padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      <div className="flex flex-col">
                        <span>{getProductName(m.product_id)}</span>
                        <span className="text-xs text-slate-500 font-normal">ID: {m.product_id ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {m.movement_type === "IN" || m.movement_type?.toLowerCase() === "entrada" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-100/50">
                          <ArrowDownToLine className="w-3.5 h-3.5" /> Entrada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-medium text-xs border border-amber-100/50">
                          <ArrowUpFromLine className="w-3.5 h-3.5" /> Salida
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {m.movement_type === "IN" ? "+" : "-"}{m.quantity ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">
                      {formatDate(m.created_at ?? m.date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
