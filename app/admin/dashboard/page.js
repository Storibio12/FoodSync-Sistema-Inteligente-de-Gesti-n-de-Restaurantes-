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

      {/* Apartado: Resumen reciente (reservaciones, reportes, ventas) */}
      <section className="dashboard-apartado m-b-50" aria-label="Resumen reciente">
        <h2 className="tit5 m-b-25" style={{ fontSize: "0.9rem", fontWeight: 600, color: "#333", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Resumen reciente
        </h2>
        <div className="row">
          <div className="col-md-4 p-b-30">
            <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25" style={{ minHeight: "220px", display: "flex", flexDirection: "column" }}>
              <h3 className="tit5 m-b-20" style={{ fontSize: "0.95rem" }}>Últimas reservaciones</h3>
              {recentReservations.length === 0 ? (
                <p className="txt23 size12" style={{ fontSize: "0.8rem" }}>No hay reservaciones recientes.</p>
              ) : (
                <ul className="list-none p-l-0">
                  {recentReservations.map((r) => (
                    <li key={r.reservation_id ?? r.id ?? r.client_id} className="p-b-10 txt23 size12" style={{ fontSize: "0.8rem" }}>
                      {r.date} {r.time} — {r.people_count ?? r.people_count} pers. {r.status && `(${r.status})`}
                    </li>
                  ))}
                </ul>
              )}
              <div className="m-t-auto p-t-15">
                <Link href="/admin/reservations" className="txt4" style={{ fontSize: "0.8rem" }}>Ver todas</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-b-30">
            <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25" style={{ minHeight: "220px", display: "flex", flexDirection: "column" }}>
              <h3 className="tit5 m-b-20" style={{ fontSize: "0.95rem" }}>Reportes recientes</h3>
              {recentReports.length === 0 ? (
                <p className="txt23 size12" style={{ fontSize: "0.8rem" }}>No hay reportes.</p>
              ) : (
                <ul className="list-none p-l-0">
                  {recentReports.map((r, i) => (
                    <li key={r.id ?? r.report_id ?? i} className="p-b-10 txt23 size12" style={{ fontSize: "0.8rem" }}>
                      {r.date ?? r.report_date ?? "Reporte"}
                    </li>
                  ))}
                </ul>
              )}
              <div className="m-t-auto p-t-15">
                <Link href="/admin/reports" className="txt4" style={{ fontSize: "0.8rem" }}>Ver reportes</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-b-30">
            <div className="bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25" style={{ minHeight: "220px", display: "flex", flexDirection: "column" }}>
              <h3 className="tit5 m-b-20" style={{ fontSize: "0.95rem" }}>Ventas recientes</h3>
              {recentSales.length === 0 ? (
                <p className="txt23 size12" style={{ fontSize: "0.8rem" }}>No hay ventas.</p>
              ) : (
                <ul className="list-none p-l-0">
                  {recentSales.slice(0, 5).map((s, i) => (
                    <li key={s.sale_id ?? s.id ?? i} className="p-b-10 txt23 size12" style={{ fontSize: "0.8rem" }}>
                      Venta #{s.sale_id ?? s.id ?? i + 1} {s.total != null && `— ${s.total}`}
                    </li>
                  ))}
                </ul>
              )}
              <div className="m-t-auto p-t-15">
                <Link href="/admin/sales" className="txt4" style={{ fontSize: "0.8rem" }}>Ver ventas</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartado: Accesos rápidos */}
      <section className="dashboard-apartado" aria-label="Accesos rápidos">
      <div className="row p-t-20">
        <div className="col-12">
          <h3 className="tit5 m-b-20" style={{ fontSize: "0.95rem" }}>Accesos rápidos</h3>
          <div className="flex-w flex-wrap">
            {[
              { href: "/admin/reservations", label: "Reservaciones" },
              { href: "/admin/clients", label: "Clientes" },
              { href: "/admin/tables", label: "Mesas" },
              { href: "/admin/menu", label: "Menú" },
              { href: "/admin/sales", label: "Ventas" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="btn3 flex-c-m size13 txt11 trans-0-4 m-r-15 m-b-12" style={{ fontSize: "0.75rem", padding: "5px 10px" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
