"use client";

import { useState, useEffect } from "react";
import { adminGet } from "@/app/lib/adminApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { BarChart3, TrendingUp, Package, CalendarDays, AlertCircle, Loader2, Users, Utensils, Target, Download } from "lucide-react";

const DAYS_OPTIONS = [
  { value: "30", label: "Últimos 30 días" },
  { value: "90", label: "Últimos 90 días" },
  { value: "", label: "Todo el histórico" },
];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState("30");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const query = days ? `?days=${days}` : "";
        const res = await adminGet(`analytics/dashboard${query}`);
        const payload = res?.data ?? res;
        if (!cancelled) setData(payload);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error al cargar patrones.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-2 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Cargando patrones de consumo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        {error}
      </div>
    );
  }

  const reservations = data?.reservations || {};
  const sales = data?.sales || {};
  const topItems = data?.topItems || [];
  const inventoryOutflows = data?.inventoryOutflows || [];
  const demandForecast = data?.demandForecast || [];
  const suggestions = data?.suggestions || { reservations: [], staff: [], inventory: [] };

  const byDay = reservations?.byDayOfWeek || [];
  const byHour = reservations?.byHour || [];
  const salesByDay = sales?.byDay || [];

  const topDay = byDay.length ? byDay.reduce((a, b) => (b.count > a.count ? b : a), byDay[0]) : null;
  const topHour = byHour.length ? byHour.reduce((a, b) => (b.count > a.count ? b : a), byHour[0]) : null;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-[#c0392b]" />
            Patrones de consumo
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Optimización de reservas, inventario, personal y demanda según patrones de consumo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <span>Período:</span>
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 focus:ring-2 focus:ring-[#c0392b]/30 focus:border-[#c0392b] outline-none"
            >
              {DAYS_OPTIONS.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          {demandForecast.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const headers = ["Día", "Reservas esperadas", "Ventas esperadas", "Ingresos est. ($)"];
                const rows = demandForecast.map((r) => [
                  r.label ?? "",
                  r.expectedReservations ?? 0,
                  r.expectedSalesCount ?? 0,
                  r.expectedRevenue ?? "",
                ]);
                const csv = [headers.join(","), ...rows.map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
                const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `patrones-consumo-${new Date().toISOString().slice(0, 10)}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* Demanda esperada */}
      {demandForecast.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#c0392b]" />
            Demanda esperada (por día de la semana)
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Promedio según histórico. Úsalo para planificar capacidad, personal y compras.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 font-medium text-slate-700">Día</th>
                  <th className="text-right py-2 font-medium text-slate-700">Reservas esperadas</th>
                  <th className="text-right py-2 font-medium text-slate-700">Ventas esperadas</th>
                  <th className="text-right py-2 font-medium text-slate-700">Ingresos est. ($)</th>
                </tr>
              </thead>
              <tbody>
                {demandForecast.map((row) => (
                  <tr key={row.dayOfWeek} className="border-b border-slate-100">
                    <td className="py-2 font-medium text-slate-800">{row.label}</td>
                    <td className="text-right py-2 text-slate-600">{row.expectedReservations}</td>
                    <td className="text-right py-2 text-slate-600">{row.expectedSalesCount}</td>
                    <td className="text-right py-2 text-slate-600">{row.expectedRevenue?.toLocaleString("es-DO") ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-[220px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="expectedReservations" fill="#c0392b" name="Reservas esperadas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expectedSalesCount" fill="#2980b9" name="Ventas esperadas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Sugerencias de optimización */}
      {(suggestions.reservations?.length > 0 || suggestions.staff?.length > 0 || suggestions.inventory?.length > 0) && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#c0392b]" />
            Sugerencias de optimización
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.reservations?.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#c0392b]" />
                  Reservas
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {suggestions.reservations.map((s, i) => (
                    <li key={i}>{s.message}</li>
                  ))}
                </ul>
              </div>
            )}
            {suggestions.staff?.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#c0392b]" />
                  Personal
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {suggestions.staff.map((s, i) => (
                    <li key={i}>{s.message}</li>
                  ))}
                </ul>
              </div>
            )}
            {suggestions.inventory?.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#c0392b]" />
                  Inventario
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {suggestions.inventory.map((s, i) => (
                    <li key={i}>{s.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recomendaciones rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topDay && topDay.count > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <CalendarDays className="w-5 h-5 text-[#c0392b] mb-2" />
            <p className="text-sm font-medium text-slate-800">Reservas por día</p>
            <p className="text-slate-600 text-sm mt-1">
              El día con más reservas es <strong>{topDay.label}</strong>. Considera más personal y mesas disponibles.
            </p>
          </div>
        )}
        {topHour && topHour.count > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <TrendingUp className="w-5 h-5 text-[#c0392b] mb-2" />
            <p className="text-sm font-medium text-slate-800">Franja horaria</p>
            <p className="text-slate-600 text-sm mt-1">
              La hora con más reservas es <strong>{topHour.time}</strong>. Refuerza el equipo en esa franja.
            </p>
          </div>
        )}
        {inventoryOutflows.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <Package className="w-5 h-5 text-[#c0392b] mb-2" />
            <p className="text-sm font-medium text-slate-800">Inventario</p>
            <p className="text-slate-600 text-sm mt-1">
              Los productos con más salidas requieren mayor reposición. Revisa la gráfica inferior.
            </p>
          </div>
        )}
      </section>

      {/* Gráfico: Reservas por día de la semana */}
      {byDay.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Reservas por día de la semana</h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byDay} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#c0392b" name="Reservas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Gráfico: Reservas por hora */}
      {byHour.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Reservas por hora</h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byHour} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#e74c3c" name="Reservas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Ventas por día y total */}
      {salesByDay.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Ventas por fecha</h2>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesByDay} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [value, "Ventas"]} />
                <Line type="monotone" dataKey="count" stroke="#c0392b" name="Nº ventas" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="total" stroke="#27ae60" name="Total ($)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {sales?.totalRevenue != null && (
            <p className="text-sm text-slate-600 mt-3">
              Ingresos totales (período): <strong>{Number(sales.totalRevenue).toLocaleString("es-DO")}</strong>
            </p>
          )}
        </section>
      )}

      {/* Top ítems vendidos */}
      {topItems.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Productos más vendidos</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topItems} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={75} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#2980b9" name="Cantidad" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Salidas de inventario (consumo) */}
      {inventoryOutflows.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Mayor consumo en inventario (salidas)</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryOutflows} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="product_name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#16a085" name="Unidades (salidas)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Prioriza la reposición de estos productos según el patrón de salidas.
          </p>
        </section>
      )}

      {!data?.reservations?.totalReservations && !salesByDay.length && topItems.length === 0 && inventoryOutflows.length === 0 && demandForecast.length === 0 && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p>No hay datos suficientes aún. Registra reservas, ventas y movimientos de inventario para ver patrones y optimizaciones.</p>
        </div>
      )}
    </div>
  );
}
