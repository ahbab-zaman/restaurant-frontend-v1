const users = [
  { name: "Sara Ahmed", role: "Super Admin", email: "sara@lumosstay.com", status: "Active" },
  { name: "Rafi Hasan", role: "Hotel Manager", email: "rafi@lumosstay.com", status: "Active" },
  { name: "Mehedi Noor", role: "Guest", email: "mehedi@gmail.com", status: "Pending" },
];

export default function SuperAdminUsersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-zinc-600">Manage platform access and user roles.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Total Users</p><p className="mt-3 text-4xl font-semibold">2,482</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">Managers</p><p className="mt-3 text-4xl font-semibold">48</p></div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"><p className="text-sm text-zinc-500">New This Week</p><p className="mt-3 text-4xl font-semibold text-emerald-600">+36</p></div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr className="text-left text-sm text-zinc-600">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-sm">
            {users.map((user) => (
              <tr key={user.email} className="transition-colors hover:bg-zinc-50">
                <td className="px-5 py-4 font-medium text-zinc-900">{user.name}</td>
                <td className="px-5 py-4 text-zinc-600">{user.role}</td>
                <td className="px-5 py-4 text-zinc-600">{user.email}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${user.status === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
