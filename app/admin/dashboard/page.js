 "use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { adminGet } from "@/app/lib/adminApi";
import { AlertCircle, Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reservations, setReservations] = useState([]);
  const [reports, setReports] = useState([]);
  const [sales, setSales] = useState([]);
  const [kpis, setKpis] = useState({});

  useEffect(() => {
    let cancelled = false;
    const watchdog = setTimeout(() => {
      if (!cancelled) {
        setError("Tiempo de espera cargando el dashboard. Revisa que la API esté accesible.");
        setLoading(false);
      }
    }, 16000);

    async function load() {
      setLoading(true);
      setError("");
      try {
        const results = await Promise.allSettled([
          adminGet("reservations"),
          adminGet("daily-reports"),
          adminGet("sales"),
          adminGet("analytics/kpis"),
        ]);

        const [reservationsRes, reportsRes, salesRes, kpisRes] = results;
        const firstError = results.find((r) => r.status === "rejected")?.reason;
        if (firstError) throw firstError;

        if (cancelled) return;

        const reservationsData = reservationsRes.value;
        const reportsData = reportsRes.value;
        const salesData = salesRes.value;
        const kpisData = kpisRes.value;

        setReservations(reservationsData?.data?.reservations || []);
        setReports(
          reportsData?.data?.dailyReports ||
            reportsData?.data?.daily_reports ||
            reportsData?.data?.reports ||
            (Array.isArray(reportsData) ? reportsData : [])
        );
        setSales(Array.isArray(salesData) ? salesData : salesData?.data?.sales || []);
        setKpis(kpisData?.data ?? kpisData ?? {});
      } catch (e) {
        if (!cancelled) setError(e?.message || "No se pudo cargar el dashboard");
      } finally {
        clearTimeout(watchdog);
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      clearTimeout(watchdog);
      cancelled = true;
    };
  }, []);

  const { recentReservations, recentReports, recentSales } = useMemo(() => {
    const sortedReservations = [...(reservations || [])].sort((a, b) => {
      const aKey = `${a.date || ""}T${a.time || "00:00"}`;
      const bKey = `${b.date || ""}T${b.time || "00:00"}`;
      return bKey.localeCompare(aKey);
    });
    const sortedReports = Array.isArray(reports)
      ? [...reports].sort((a, b) =>
          String(b.date ?? b.report_date ?? "").localeCompare(String(a.date ?? a.report_date ?? ""))
        )
      : [];
    const sortedSales = [...(sales || [])].sort((a, b) => {
      const aKey = a.created_at || a.date || a.sale_date || a.timestamp || "";
      const bKey = b.created_at || b.date || b.sale_date || b.timestamp || "";
      return String(bKey).localeCompare(String(aKey));
    });
    return {
      recentReservations: sortedReservations.slice(0, 5),
      recentReports: sortedReports.slice(0, 3),
      recentSales: sortedSales.slice(0, 5),
    };
  }, [reservations, reports, sales]);

  const reservationsToday = kpis.reservationsToday ?? 0;
  const salesThisMonthCount = kpis.salesThisMonthCount ?? 0;
  const salesThisMonthRevenue = kpis.salesThisMonthRevenue ?? 0;
  const lowStockCount = kpis.lowStockCount ?? 0;
  const lowStockProducts = kpis.lowStockProducts || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-2 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Cargando dashboard...</span>
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

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Resumen del panel. Accede a cada módulo desde el menú lateral.</p>
      </div>

      {/* KPIs */}
      <section aria-label="Indicadores clave" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Reservas hoy</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{reservationsToday}</p>
          <Link href="/admin/reservations" className="text-sm text-[#c0392b] hover:underline mt-1 inline-block">Ver reservas</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ventas del mes</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{salesThisMonthCount}</p>
          <p className="text-sm text-slate-600">{Number(salesThisMonthRevenue).toLocaleString("es-DO")} $</p>
          <Link href="/admin/sales" className="text-sm text-[#c0392b] hover:underline mt-1 inline-block">Ver ventas</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Productos a reponer</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{lowStockCount}</p>
          {lowStockCount > 0 && (
            <Link href="/admin/inventory" className="text-sm text-amber-600 hover:underline mt-1 inline-block">Revisar inventario</Link>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Reportes</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{Array.isArray(reports) ? reports.length : 0}</p>
          <Link href="/admin/reports" className="text-sm text-[#c0392b] hover:underline mt-1 inline-block">Ver reportes</Link>
        </div>
      </section>

      {lowStockCount > 0 && lowStockProducts.length > 0 && (
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">Stock bajo</h2>
          <ul className="text-sm text-amber-800 space-y-1">
            {lowStockProducts.slice(0, 5).map((p) => (
              <li key={p.product_id ?? p.id}>
                {p.name ?? "Producto"} — stock: {p.stock ?? "—"}
              </li>
            ))}
          </ul>
          <Link href="/admin/inventory" className="text-sm font-medium text-amber-700 hover:underline mt-2 inline-block">Ver todo el inventario</Link>
        </section>
      )}

      {/* Resumen reciente */}
      <section aria-label="Resumen reciente">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Resumen reciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col min-h-[200px]">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Últimas reservaciones</h3>
            {recentReservations.length === 0 ? (
              <p className="text-sm text-slate-500">No hay reservaciones recientes.</p>
            ) : (
              <ul className="list-none p-0 space-y-2 flex-1">
                {recentReservations.map((r) => (
                  <li key={r.reservation_id ?? r.id ?? r.client_id} className="text-sm text-slate-600">
                    {r.date} {r.time} — {r.people_count ?? r.people ?? "—"} pers. {r.status && `(${r.status})`}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link href="/admin/reservations" className="text-sm font-medium text-[#c0392b] hover:underline">Ver todas</Link>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col min-h-[200px]">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Reportes recientes</h3>
            {recentReports.length === 0 ? (
              <p className="text-sm text-slate-500">No hay reportes.</p>
            ) : (
              <ul className="list-none p-0 space-y-2 flex-1">
                {recentReports.map((r, i) => (
                  <li key={r.id ?? r.report_id ?? i} className="text-sm text-slate-600">
                    {r.date ?? r.report_date ?? "Reporte"}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link href="/admin/reports" className="text-sm font-medium text-[#c0392b] hover:underline">Ver reportes</Link>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col min-h-[200px]">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Ventas recientes</h3>
            {recentSales.length === 0 ? (
              <p className="text-sm text-slate-500">No hay ventas.</p>
            ) : (
              <ul className="list-none p-0 space-y-2 flex-1">
                {recentSales.slice(0, 5).map((s, i) => (
                  <li key={s.sale_id ?? s.id ?? i} className="text-sm text-slate-600">
                    Venta #{s.sale_id ?? s.id ?? i + 1} {s.total != null && `— ${s.total}`}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <Link href="/admin/sales" className="text-sm font-medium text-[#c0392b] hover:underline">Ver ventas</Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Análisis">
        <Link
          href="/admin/analytics"
          className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 text-sm font-medium transition-colors"
        >
          Ver patrones de consumo (reservas, ventas, inventario)
          <span aria-hidden>→</span>
        </Link>
      </section>
    </div>
  );
}
