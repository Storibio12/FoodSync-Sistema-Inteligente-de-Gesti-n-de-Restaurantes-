import AdminHeader from "../components/AdminHeader";

export const metadata = {
  title: "Admin - Pato Place",
};

export default function AdminLayout({ children }) {
  return (
    <div className="wrap-admin">
      <AdminHeader />
      {children}
    </div>
  );
}
