"use client";

import { useState, useEffect } from "react";
import { adminGet, adminPost } from "@/app/lib/adminApi";
import { FileText, Plus, X, AlertCircle, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminReportsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: "", total_sales: "", total_reservations: "", notes: "" });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await adminGet("daily-reports");
      const reports = data?.data?.dailyReports ?? data?.data?.daily_reports ?? data?.data?.reports ?? (Array.isArray(data) ? data : []);
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
      const payload = {
        date: form.date,
        total_sales: Number(form.total_sales) || 0,
        total_reservations: Number(form.total_reservations) || 0,
      };
      if (form.notes) payload.notes = form.notes;
      await adminPost("daily-reports", payload);
      setShowForm(false);
      setForm({ date: "", total_sales: "", total_reservations: "", notes: "" });
      await load();
    } catch (e) {
      setError(e.message || "Error al crear reporte");
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      return new Intl.DateTimeFormat("es-DO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(localDate);
    } catch (e) {
      return dateString;
    }
  };

  function exportCsv() {
    const headers = ["Fecha", "Ventas totales", "Reservaciones totales"];
    const rows = list.map((r) => [
      r.date ?? r.report_date ?? "",
      r.total_sales ?? 0,
      r.total_reservations ?? 0,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reportes-diarios-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Reportes Diarios</h1>
          <p className="text-sm text-slate-500 mt-1">Consulta y registra los informes del cierre de operaciones.</p>
        </div>
        <div className="flex items-center gap-2">
          {list.length > 0 && (
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c0392b] text-black text-sm font-medium rounded-lg hover:bg-[#a93226] hover:text-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b] focus:ring-offset-2"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancelar registro" : "Nuevo reporte"}
          </button>
        </div>
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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                Crear Reporte Diario
              </h3>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Fecha del Reporte</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ventas totales</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.total_sales}
                    onChange={(e) => setForm((f) => ({ ...f, total_sales: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reservaciones totales</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.total_reservations}
                    onChange={(e) => setForm((f) => ({ ...f, total_reservations: e.target.value }))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notas (Opcional)</label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Escriba aquí cualquier observación u ocurrencia destacable del día..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c0392b]/50 focus:border-[#c0392b] transition-all resize-y"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-5 border-t border-slate-100">
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
                <h3 className="font-medium text-slate-900 flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  <span className="truncate">{formatDate(r.date ?? r.report_date)}</span>
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                    #{r.id ?? r.report_id}
                  </span>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
                        try {
                          await import("@/app/lib/adminApi").then(m => m.adminDelete(`daily-reports/${r.id ?? r.report_id}`));
                          load();
                        } catch (err) {
                          alert(err.message || "Error al eliminar");
                        }
                      }
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Eliminar reporte"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-grow space-y-3">
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-slate-600">
                    <span className="font-medium text-slate-800">Ventas:</span>{" "}
                    {typeof r.total_sales === "number" ? r.total_sales.toLocaleString("es-DO") : (r.total_sales ?? "0")}
                  </span>
                  <span className="text-slate-600">
                    <span className="font-medium text-slate-800">Reservaciones:</span>{" "}
                    {r.total_reservations ?? "0"}
                  </span>
                </div>
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
