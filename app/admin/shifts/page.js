"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost, adminPatch, adminDelete } from "@/app/lib/adminApi";
import Swal from "sweetalert2";
import { Plus, Edit2, Trash2, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminShiftsPage() {
  const [list, setList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ employee_id: "", date: "", start_time: "", end_time: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [shiftsData, empData] = await Promise.all([
        adminGet("shifts"),
        adminGet("employee"),
      ]);
      setList(Array.isArray(shiftsData) ? shiftsData : (shiftsData?.data?.shifts ?? shiftsData?.data ?? []));
      setEmployees(empData?.data?.employees ?? []);
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
      employee_id: Number(form.employee_id),
      date: form.date,
      start_time: form.start_time.length === 5 ? form.start_time + ":00" : form.start_time,
      end_time: form.end_time.length === 5 ? form.end_time + ":00" : form.end_time,
    };
    try {
      if (modal?.id != null) {
        await adminPatch(`shifts/${modal.id}`, payload);
      } else {
        await adminPost("shifts", payload);
      }
      setModal(null);
      setForm({ employee_id: "", date: "", start_time: "", end_time: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Eliminar este turno?",
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
      await adminDelete(`shifts/${id}`);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  }

  function openEdit(s) {
    setModal({ id: s.shift_id ?? s.id });
    setForm({
      employee_id: String(s.employee_id ?? ""),
      date: (s.date || "").slice(0, 10),
      start_time: (s.start_time || "").slice(0, 5),
      end_time: (s.end_time || "").slice(0, 5),
    });
  }

  const getEmployeeName = (id) => {
    const emp = employees.find(e => (e.employee_id ?? e.id) == id);
    return emp ? emp.name : "Desconocido";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gestión de Turnos</h1>
          <p className="text-sm text-slate-500 mt-1">Asigna y administra los horarios del personal.</p>
        </div>
        <button
          onClick={() => { setModal({}); setForm({ employee_id: "", date: "", start_time: "", end_time: "" }); }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" /> Nuevo turno
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <X className="w-4 h-4 text-red-500 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">ID</th>
                <th scope="col" className="px-6 py-4 font-medium">Empleado</th>
                <th scope="col" className="px-6 py-4 font-medium">Fecha</th>
                <th scope="col" className="px-6 py-4 font-medium">Horario</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      Cargando turnos...
                    </div>
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No hay turnos registrados.</p>
                  </td>
                </tr>
              ) : (
                list.map((s) => (
                  <tr key={s.shift_id ?? s.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-600">#{s.shift_id ?? s.id}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      <div className="flex flex-col">
                        <span>{getEmployeeName(s.employee_id)}</span>
                        <span className="text-xs text-slate-500 font-normal">ID: {s.employee_id ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.date ?? "—"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-sm">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {s.start_time?.slice(0, 5) ?? "—"} a {s.end_time?.slice(0, 5) ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Editar turno"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.shift_id ?? s.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Eliminar turno"
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

      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">
                  {modal.id != null ? "Editar turno" : "Registrar nuevo turno"}
                </h3>
                <button
                  onClick={() => setModal(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Empleado</label>
                  <select
                    value={form.employee_id}
                    onChange={(e) => setForm((f) => ({ ...f, employee_id: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  >
                    <option value="">Selecciona un empleado</option>
                    {employees.map((emp) => (
                      <option key={emp.employee_id ?? emp.id} value={emp.employee_id ?? emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fecha del turno</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hora de inicio</label>
                    <input
                      type="time"
                      value={form.start_time}
                      onChange={(e) => setForm((f) => ({ ...f, start_time: e.target.value }))}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hora de fin</label>
                    <input
                      type="time"
                      value={form.end_time}
                      onChange={(e) => setForm((f) => ({ ...f, end_time: e.target.value }))}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setModal(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {modal.id != null ? "Guardar cambios" : "Asignar turno"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
