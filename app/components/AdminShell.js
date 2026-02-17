"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell dis-flex">
      <AdminSidebar />
      <main className="admin-main flex-1 p-t-40 p-b-85 p-l-30 p-r-30">
        {children}
      </main>
    </div>
  );
}
