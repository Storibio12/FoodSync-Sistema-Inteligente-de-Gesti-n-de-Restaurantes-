import Link from "next/link";

export const metadata = {
  title: "Dashboard - Admin",
};

const modules = [
  { href: "/admin/reservations", label: "Reservaciones", icon: "fa-calendar", desc: "Ver y gestionar reservas" },
  { href: "/admin/clients", label: "Clientes", icon: "fa-users", desc: "Clientes del restaurante" },
  { href: "/admin/tables", label: "Mesas", icon: "fa-table", desc: "Mesas y disponibilidad" },
  { href: "/admin/menu", label: "Menú", icon: "fa-cutlery", desc: "Productos y platos" },
  { href: "/admin/inventory", label: "Inventario", icon: "fa-cubes", desc: "Stock y movimientos" },
  { href: "/admin/sales", label: "Ventas", icon: "fa-shopping-cart", desc: "Ventas y detalle" },
  { href: "/admin/reports", label: "Reportes", icon: "fa-bar-chart", desc: "Reportes diarios" },
  { href: "/admin/employees", label: "Empleados", icon: "fa-user", desc: "Gestión de empleados" },
  { href: "/admin/shifts", label: "Turnos", icon: "fa-clock-o", desc: "Turnos de trabajo" },
  { href: "/admin/users", label: "Usuarios", icon: "fa-lock", desc: "Usuarios del sistema" },
];

export default function AdminDashboardPage() {
  return (
    <div className="container">
      <h1 className="tit3 m-b-10">Dashboard</h1>
      <p className="txt4 m-b-40">Bienvenido al panel de administración. Accede a cada módulo desde aquí o desde el menú lateral.</p>

      <div className="row">
        {modules.map(({ href, label, icon, desc }) => (
          <div key={href} className="col-sm-6 col-md-4 col-lg-3 p-b-30">
            <Link href={href} className="dis-block bo-rad-10 bgwhite p-t-30 p-b-30 p-l-25 p-r-25 hov-img-zoom trans-0-4">
              <div className="m-b-15">
                <i className={`fa ${icon} fs-30 color1`} aria-hidden="true"></i>
              </div>
              <h4 className="txt5 m-b-8">{label}</h4>
              <p className="size13 m-b-0 txt23">{desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
