import Link from "next/link";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fa-tachometer" },
  { href: "/admin/reservations", label: "Reservaciones", icon: "fa-calendar" },
  { href: "/admin/clients", label: "Clientes", icon: "fa-users" },
  { href: "/admin/tables", label: "Mesas", icon: "fa-table" },
  { href: "/admin/menu", label: "Menú", icon: "fa-cutlery" },
  { href: "/admin/inventory", label: "Inventario", icon: "fa-cubes" },
  { href: "/admin/sales", label: "Ventas", icon: "fa-shopping-cart" },
  { href: "/admin/reports", label: "Reportes", icon: "fa-bar-chart" },
  { href: "/admin/employees", label: "Empleados", icon: "fa-user" },
  { href: "/admin/shifts", label: "Turnos", icon: "fa-clock-o" },
  { href: "/admin/users", label: "Usuarios", icon: "fa-lock" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar bg1-pattern">
      <nav className="p-t-30 p-b-30 p-l-20 p-r-20">
        <div className="m-b-30">
          <Link href="/admin/dashboard" className="tit5 txt1" style={{ color: "#c0392b" }}>
            Pato Admin
          </Link>
        </div>
        <ul className="list-none p-l-0">
          {items.map(({ href, label, icon }) => (
            <li key={href} className="m-b-8">
              <Link
                href={href}
                className="txt4 dis-block p-t-8 p-b-8 p-l-15 bo-rad-10 color0-hov trans-0-4"
              >
                <i className={`fa ${icon} m-r-10`} aria-hidden="true"></i>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
