import UsersDashboard from "@/app/components/ui/dashboards/UsersDashboard";

export const metadata = {
  title: "Users – Super Admin",
  description: "Manage all platform users, roles, and access control.",
};

export default function SuperAdminUsersPage() {
  return <UsersDashboard />;
}
