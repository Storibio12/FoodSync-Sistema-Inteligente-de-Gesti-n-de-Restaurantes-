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
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 overflow-y-auto hidden md:flex flex-col">
      <div className="flex h-16 shrink-0 items-center px-6 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
        <Link href="/admin/dashboard" className="text-xl font-bold text-white tracking-wide">
          FoodSync<span className="text-indigo-400">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        {items.map(({ href, label, Icon }) => {
          const isActive = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-indigo-600/10 text-indigo-400 font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-indigo-500/20"
                  : "hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 bg-slate-950/30">
        <div className="text-xs text-slate-500 text-center">
          FoodSync © {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
