"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="admin-header bg2-pattern p-t-20 p-b-20">
      <div className="container">
        <div className="flex-w flex-sb-m flex-wrap">
          <div className="flex-w">
            <Link href="/admin/dashboard" className="txt4 m-r-30">
              Dashboard
            </Link>
            <Link href="/" className="txt4" target="_blank" rel="noopener noreferrer">
              Ver sitio
            </Link>
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogout}
              className="btn3 flex-c-m size13 txt11 trans-0-4"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
