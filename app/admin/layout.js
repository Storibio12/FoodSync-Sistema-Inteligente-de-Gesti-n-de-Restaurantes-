import AdminHeader from "../components/AdminHeader";
import AdminShell from "../components/AdminShell";

export const metadata = {
  title: "Admin - FoodSync",
};

export default function AdminLayout({ children }) {
  return (
    <div className="wrap-admin">
      <AdminHeader />
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
