import UsersDashboard from "@/app/components/ui/dashboards/UsersDashboard";

export const metadata = {
  title: "Users | Super Admin – LumosStay",
  description:
    "Manage all registered users, assign roles, and control access across the LumosStay platform.",
  robots: { index: false, follow: false },
};

export default function SuperAdminUsersPage() {
  return <UsersDashboard />;
}
