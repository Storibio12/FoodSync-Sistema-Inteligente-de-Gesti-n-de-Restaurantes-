"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";
import Swal from "sweetalert2";
import { Plus, Edit2, Trash2, X, UserSquare2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminEmployeesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
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
      if (editingId) {
        await adminPatch(`employee/${editingId}`, { name: form.name, position: form.position });
      } else {
        await adminPost("employee", { name: form.name, position: form.position });
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ name: "", position: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Eliminar este empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (!result.isConfirmed) return;
    setError("");
    try {
      await adminDelete(`employee/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(emp) {
    setEditingId(emp.employee_id ?? emp.id);
    setForm({ name: emp.name ?? "", position: emp.position ?? "" });
    setShowForm(true);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Nómina de Empleados</h1>
          <p className="text-sm text-slate-500 mt-1">Administra la información del personal del restaurante.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); if (!showForm) { setEditingId(null); setForm({ name: "", position: "" }); } }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c0392b] text-black text-sm font-medium rounded-lg hover:bg-[#a93226] hover:text-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancelar registro" : "Nuevo empleado"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <X className="w-4 h-4 text-red-500 flex-shrink-0" /> {error}
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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <UserSquare2 className="w-5 h-5 text-[#c0392b]" />
                {editingId ? "Editar empleado" : "Registrar nuevo empleado"}
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all placeholder:text-slate-400"
                    placeholder="Ej. María García"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Posición o Puesto</label>
                  <input
                    type="text"
                    value={form.position}
                    onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all placeholder:text-slate-400"
                    placeholder="Ej. Mesero, Chef, Gerente..."
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditingId(null); setForm({ name: "", position: "" }); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-black bg-[#c0392b] hover:bg-[#a93226] hover:text-black rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
                  >
                    {editingId ? "Guardar cambios" : "Registrar empleado"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">ID</th>
                <th scope="col" className="px-6 py-4 font-medium">Nombre Completo</th>
                <th scope="col" className="px-6 py-4 font-medium">Puesto / Posición</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      Cargando empleados...
                    </div>
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400">
                    <UserSquare2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No hay empleados registrados en la nómina.</p>
                  </td>
                </tr>
              ) : (
                list.map((e) => (
                  <tr key={e.employee_id ?? e.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-600">#{e.employee_id ?? e.id}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{e.name ?? "—"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium text-xs">
                        {e.position ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(e)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Editar empleado"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(e.employee_id ?? e.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Eliminar empleado"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
