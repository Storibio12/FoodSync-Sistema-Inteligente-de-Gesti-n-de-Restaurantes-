import AdminShell from "../components/AdminShell";

export const metadata = {
  title: "Admin - FoodSync",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
