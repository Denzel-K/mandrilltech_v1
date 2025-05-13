import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminDashboardClient from "@/app/components/AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await auth();

  // Server-side redirect if not authenticated
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient session={session} />;
}
