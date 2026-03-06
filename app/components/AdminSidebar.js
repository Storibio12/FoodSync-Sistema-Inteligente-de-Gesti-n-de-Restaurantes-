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
      className={`admin-sidebar bg1-pattern fixed md:relative inset-y-0 left-0 z-40 w-[260px] max-w-[85vw] md:max-w-none flex-shrink-0 flex flex-col max-h-screen transform transition-transform duration-200 ease-out ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="md:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>
      <nav className="flex-1 overflow-y-auto pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-5 min-h-0">
        <div className="mb-6 admin-logo-wrap">
          <Link href="/admin/dashboard" className="admin-logo-link" onClick={onClose}>
            FoodSync Admin
          </Link>
        </div>
        <ul className="list-none p-0 space-y-2">
          {items.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={onClose}
                className={`txt4 block py-3 px-4 rounded-lg color0-hov trans-0-4 flex items-center gap-3 text-sm ${
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

      <div className="p-4 border-t border-white/5 bg-slate-950/30 flex-shrink-0">
        <div className="text-xs text-slate-500 text-center">
          FoodSync © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
