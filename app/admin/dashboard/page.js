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
    <div className="container">
      <h1 className="tit3 m-b-10">Dashboard</h1>
      <p className="txt4 m-b-40">Resumen del panel. Accede a cada módulo desde el menú lateral.</p>

      <div className="row">
        <div className="col-md-4 p-b-30">
          <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25">
            <h3 className="tit5 m-b-20">Últimas reservaciones</h3>
            {recentReservations.length === 0 ? (
              <p className="txt23 size13">No hay reservaciones recientes.</p>
            ) : (
              <ul className="list-none p-l-0">
                {recentReservations.map((r) => (
                  <li key={r.reservation_id ?? r.id ?? r.client_id} className="p-b-10 txt23 size13">
                    {r.date} {r.time} — {r.people_count ?? r.people_count} pers. {r.status && `(${r.status})`}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/admin/reservations" className="txt4">Ver todas</Link>
          </div>
        </div>
        <div className="col-md-4 p-b-30">
          <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25">
            <h3 className="tit5 m-b-20">Reportes recientes</h3>
            {recentReports.length === 0 ? (
              <p className="txt23 size13">No hay reportes.</p>
            ) : (
              <ul className="list-none p-l-0">
                {recentReports.map((r, i) => (
                  <li key={r.id ?? r.report_id ?? i} className="p-b-10 txt23 size13">
                    {r.date ?? r.report_date ?? "Reporte"}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/admin/reports" className="txt4">Ver reportes</Link>
          </div>
        </div>
        <div className="col-md-4 p-b-30">
          <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25">
            <h3 className="tit5 m-b-20">Ventas recientes</h3>
            {recentSales.length === 0 ? (
              <p className="txt23 size13">No hay ventas.</p>
            ) : (
              <ul className="list-none p-l-0">
                {recentSales.slice(0, 5).map((s, i) => (
                  <li key={s.sale_id ?? s.id ?? i} className="p-b-10 txt23 size13">
                    Venta #{s.sale_id ?? s.id ?? i + 1} {s.total != null && `— ${s.total}`}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/admin/sales" className="txt4">Ver ventas</Link>
          </div>
        </div>
      </div>

      <div className="row p-t-20">
        <div className="col-12">
          <h3 className="tit5 m-b-20">Accesos rápidos</h3>
          <div className="flex-w flex-wrap">
            {[
              { href: "/admin/reservations", label: "Reservaciones" },
              { href: "/admin/clients", label: "Clientes" },
              { href: "/admin/tables", label: "Mesas" },
              { href: "/admin/menu", label: "Menú" },
              { href: "/admin/sales", label: "Ventas" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-10 m-b-10">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
