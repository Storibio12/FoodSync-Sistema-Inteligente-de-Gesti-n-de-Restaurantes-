"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/app/lib/adminApi";
import { FileText, Plus, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      setError(e.message || "Error al cargar los reportes");
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

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      // Ensure the date is interpreted as local to avoid timezone shift if it's just YYYY-MM-DD
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return new Intl.DateTimeFormat('es-DO', {
        year: 'numeric', month: 'long', day: 'numeric'
      }).format(localDate);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reportes Diarios</h1>
          <p className="text-sm text-slate-500 mt-1">Consulta y registra los informes del cierre de operaciones.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancelar registro" : "Nuevo reporte"}
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
                <FileText className="w-5 h-5 text-indigo-500" />
                Crear Reporte Diario
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fecha del Reporte</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    required
                    className="w-full sm:w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notas (Opcional)</label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Escriba aquí cualquier observación u ocurrencia destacable del día..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-y"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Guardar Reporte
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex items-center justify-center gap-2 text-slate-400">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            Cargando reportes almacenados...
          </div>
        ) : list.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-xl shadow-sm border border-slate-200">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No se han registrado reportes diarios.</p>
          </div>
        ) : (
          list.map((r) => (
            <motion.div
              key={r.id ?? r.report_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-medium text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  {formatDate(r.date ?? r.report_date)}
                </h3>
                <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                  #{r.id ?? r.report_id}
                </span>
              </div>
              <div className="p-5 flex-grow">
                {r.notes ? (
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {r.notes}
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Sin notas adicionales para este reporte.
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
