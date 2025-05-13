import AdminDashboardClient from "@/app/components/AdminDashboardClient";

export default function AdminDashboard() {
  // No authentication check needed - middleware handles access control
  return <AdminDashboardClient />;
}
