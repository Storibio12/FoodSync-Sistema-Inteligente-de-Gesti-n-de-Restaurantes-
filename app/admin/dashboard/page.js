import Link from "next/link";

export const metadata = {
  title: "Dashboard - Admin",
};

export default function AdminDashboardPage() {
  return (
    <div className="container p-t-115 p-b-85">
      <h1 className="tit3 t-center m-b-35">Dashboard</h1>
      <p className="t-center m-b-30">Bienvenido al panel de administración.</p>
      <p className="t-center">
        <Link href="/" className="txt4">Volver al sitio</Link>
      </p>
    </div>
  );
}
