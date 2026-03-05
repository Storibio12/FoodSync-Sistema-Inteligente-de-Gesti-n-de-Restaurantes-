import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminToken, getApiUrl, getAuthHeaders } from "@/app/lib/auth";
import { CalendarDays, FileText, DollarSign, Users, Utensils, Package, MenuSquare } from "lucide-react";

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Resumen de las actividades recientes. Accede a cada módulo para más detalles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reservaciones Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Últimas Reservaciones</h2>
            </div>

            {recentReservations.length === 0 ? (
              <div className="text-sm text-slate-400 italic py-4 text-center">No hay reservaciones recientes.</div>
            ) : (
              <ul className="space-y-3">
                {recentReservations.map((r) => (
                  <li key={r.reservation_id ?? r.id ?? r.client_id} className="text-sm text-slate-600 flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                    <span className="font-medium text-slate-700">{r.date} {r.time}</span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-md">{r.people_count ?? r.people_count} pers.</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/admin/reservations" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-6 inline-block w-full text-center">
            Ver todas las reservaciones &rarr;
          </Link>
        </div>

        {/* Reportes Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Reportes Recientes</h2>
            </div>

            {recentReports.length === 0 ? (
              <div className="text-sm text-slate-400 italic py-4 text-center">No hay reportes recientes.</div>
            ) : (
              <ul className="space-y-3">
                {recentReports.map((r, i) => (
                  <li key={r.id ?? r.report_id ?? i} className="text-sm text-slate-600 flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                    <span className="font-medium text-slate-700">{r.date ?? r.report_date ?? "Reporte"}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/admin/reports" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 mt-6 inline-block w-full text-center">
            Ver todos los reportes &rarr;
          </Link>
        </div>

        {/* Ventas Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Ventas Recientes</h2>
            </div>

            {recentSales.length === 0 ? (
              <div className="text-sm text-slate-400 italic py-4 text-center">No hay ventas registradas.</div>
            ) : (
              <ul className="space-y-3">
                {recentSales.slice(0, 5).map((s, i) => (
                  <li key={s.sale_id ?? s.id ?? i} className="text-sm text-slate-600 flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
                    <span className="font-medium text-slate-700">Venta #{s.sale_id ?? s.id ?? i + 1}</span>
                    {s.total != null && <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md">${s.total}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/admin/sales" className="text-sm font-medium text-amber-600 hover:text-amber-700 mt-6 inline-block w-full text-center">
            Explorar ventas &rarr;
          </Link>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Utensils className="w-64 h-64 text-white" />
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Accesos Rápidos</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
          {[
            { href: "/admin/reservations", label: "Reservaciones", icon: CalendarDays },
            { href: "/admin/clients", label: "Clientes", icon: Users },
            { href: "/admin/tables", label: "Mesas", icon: Utensils },
            { href: "/admin/menu", label: "Menú", icon: MenuSquare },
            { href: "/admin/inventory", label: "Inventario", icon: Package },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-200 group"
            >
              <Icon className="w-6 h-6 text-slate-400 group-hover:text-white mb-3 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
