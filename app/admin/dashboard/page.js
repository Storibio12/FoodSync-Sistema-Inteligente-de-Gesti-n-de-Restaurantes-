import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminToken, getApiUrl, getAuthHeaders } from "@/app/lib/auth";

async function fetchAdmin(path) {
  const token = await getAdminToken();
  if (!token) redirect("/admin/login");
  const base = getApiUrl().replace(/\/$/, "");
  const res = await fetch(`${base}/${path.replace(/^\//, "")}`, {
    headers: getAuthHeaders(token),
    cache: "no-store",
  });
  if (res.status === 401) redirect("/admin/login");
  if (!res.ok) return null;
  return res.json();
}

export const metadata = {
  title: "Dashboard - Admin",
};

export default async function AdminDashboardPage() {
  const [reservationsData, reportsData, salesData] = await Promise.all([
    fetchAdmin("reservations").catch(() => null),
    fetchAdmin("daily-reports").catch(() => null),
    fetchAdmin("sales").catch(() => null),
  ]);

  const reservations = reservationsData?.data?.reservations || [];
  const reports = reportsData?.data?.daily_reports || reportsData?.data?.reports || (Array.isArray(reportsData) ? reportsData : []);
  const sales = Array.isArray(salesData) ? salesData : salesData?.data?.sales || [];

  const recentReservations = reservations.slice(0, 5);
  const recentReports = Array.isArray(reports) ? reports.slice(0, 3) : [];
  const recentSales = sales.slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8 w-full min-w-0">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Resumen del panel. Accede a cada módulo desde el menú lateral.</p>
      </div>

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
                    {r.date} {r.time} — {r.people_count ?? r.people_count} pers. {r.status && `(${r.status})`}
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

    </div>
  );
}
