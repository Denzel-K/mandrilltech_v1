import AdminDashboardClient from "@/app/components/AdminDashboardClient";

export const metadata = {
  title: 'Admin Dashboard | Mandrill Technologies',
  description: 'Admin dashboard for Mandrill Technologies website',
};

export default function AdminDashboard() {
  // No authentication check needed - middleware handles access control
  return <AdminDashboardClient />;
}
