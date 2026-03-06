"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Utensils,
  MenuSquare,
  Package,
  ShoppingCart,
  BarChart3,
  UserCircle,
  Clock,
  Lock,
} from "lucide-react";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Reservaciones", Icon: CalendarDays },
  { href: "/admin/clients", label: "Clientes", Icon: Users },
  { href: "/admin/tables", label: "Mesas", Icon: Utensils },
  { href: "/admin/menu", label: "Menú", Icon: MenuSquare },
  { href: "/admin/inventory", label: "Inventario", Icon: Package },
  { href: "/admin/sales", label: "Ventas", Icon: ShoppingCart },
  { href: "/admin/reports", label: "Reportes", Icon: BarChart3 },
  { href: "/admin/employees", label: "Empleados", Icon: UserCircle },
  { href: "/admin/shifts", label: "Turnos", Icon: Clock },
  { href: "/admin/users", label: "Usuarios", Icon: Lock },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar bg1-pattern">
      <nav className="p-t-30 p-b-30 p-l-20 p-r-20">
        <div className="m-b-30">
          <Link href="/admin/dashboard" className="tit5 txt1">
            FoodSync Admin
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

      <div className="p-4 border-t border-white/5 bg-slate-950/30">
        <div className="text-xs text-slate-500 text-center">
          FoodSync © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
