"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/app/lib/adminApi";
import { Receipt, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSalesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    adminGet("sales")
      .then((data) => setList(Array.isArray(data) ? data : (data?.data?.sales ?? [])))
      .catch((e) => setError(e.message || "Error al cargar las ventas"))
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (amount) => {
    if (amount == null) return "—";
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Historial de Ventas</h1>
          <p className="text-sm text-slate-500 mt-1">Consulta el registro de todas las transacciones completadas.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-indigo-500" />
            Últimas Transacciones
          </h2>
          <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
            {list.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Num. Transacción</th>
                <th scope="col" className="px-6 py-4 font-medium">Fecha y Hora</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Monto Total</th>
                <th scope="col" className="px-6 py-4 font-medium text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      Cargando historial de ventas...
                    </div>
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400">
                    <Receipt className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No se encontraron registros de ventas.</p>
                  </td>
                </tr>
              ) : (
                list.map((s) => (
                  <tr key={s.sale_id ?? s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      #{String(s.sale_id ?? s.id).padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatDate(s.sale_date ?? s.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(s.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-100/50">
                        Completada
                      </span>
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
