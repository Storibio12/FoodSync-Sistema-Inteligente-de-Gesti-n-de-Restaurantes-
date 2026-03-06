"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
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

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <aside
      className={`admin-sidebar bg1-pattern fixed md:relative inset-y-0 left-0 z-40 w-[260px] flex-shrink-0 transform transition-transform duration-200 ease-out ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <nav className="p-t-30 p-b-30 p-l-20 p-r-20">
        <div className="m-b-30 admin-logo-wrap">
          <Link href="/admin/dashboard" className="admin-logo-link" onClick={onClose}>
            FoodSync Admin
          </Link>
        </div>
        <ul className="list-none p-l-0">
          {items.map(({ href, label, Icon }) => (
            <li key={href} className="m-b-8">
              <Link
                href={href}
                onClick={onClose}
                className={`txt4 dis-block p-t-8 p-b-8 p-l-15 bo-rad-10 color0-hov trans-0-4 flex items-center gap-3 ${
                  pathname === href ? "!text-[#c0392b] bg-white/10" : ""
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
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
