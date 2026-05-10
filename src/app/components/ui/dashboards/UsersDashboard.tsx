"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAuthUser } from "@/lib/auth/auth.query";
import { apiError } from "@/lib/auth/api-client";
import {
  useUsersQuery,
  useAdminUpdateUserMutation,
  useDeleteUserMutation,
} from "@/lib/users/users.query";
import { AdminUser, AdminUpdateUserPayload } from "@/types/user";
import ConfirmationModal from "@/app/components/ui/modals/ConfirmationModal";
import LoadingSpinner from "@/app/components/ui/common/LoadingSpinner";
import PremiumPagination from "@/app/components/ui/common/PremiumPagination";
import UserDetailsModal from "@/app/components/ui/modals/UserDetailsModal";
import UserFormModal from "@/app/components/ui/modals/UserFormModal";
import UsersTable from "@/app/components/ui/tables/UsersTable";

export default function UsersDashboard() {
  const authUser = useAuthUser();
  const isSuperAdmin = authUser?.role === "SUPER_ADMIN";

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useUsersQuery(page, limit);
  const updateMutation = useAdminUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();

  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

  const users = useMemo(() => data?.items ?? [], [data?.items]);

  // Role summary counts derived from current page data; actual totals come from meta
  const totalUsers = data?.meta.total ?? 0;
  const totalManagers = users.filter((u) => u.role === "HOTEL_ADMIN").length;
  const totalAdmins = users.filter((u) => u.role === "SUPER_ADMIN").length;

  async function onUpdate(payload: AdminUpdateUserPayload) {
    if (!editingUser) return;
    try {
      await updateMutation.mutateAsync({ userId: editingUser.id, payload });
      toast.success("User updated successfully");
      setEditingUser(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to update user";
      toast.error(message);
    }
  }

  async function onDelete() {
    if (!deletingUser) return;
    try {
      await deleteMutation.mutateAsync(deletingUser.id);
      toast.success("User deleted successfully");
      setDeletingUser(null);
    } catch (error) {
      const message = error instanceof apiError ? error.message : "Failed to delete user";
      toast.error(message);
    }
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white">
        <p className="text-sm text-zinc-500">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-zinc-600">Manage platform access and user roles.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Total Users</p>
          <p className="mt-3 text-4xl font-semibold">{totalUsers}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Hotel Managers (this page)</p>
          <p className="mt-3 text-4xl font-semibold text-blue-600">{totalManagers}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">Super Admins (this page)</p>
          <p className="mt-3 text-4xl font-semibold text-purple-600">{totalAdmins}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
          <LoadingSpinner className="h-8 w-8 text-zinc-600" />
        </div>
      ) : users.length ? (
        <div className="space-y-3">
          {isFetching ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <LoadingSpinner className="h-4 w-4" /> Syncing latest data...
            </div>
          ) : null}
          <UsersTable
            users={users}
            onView={setViewingUser}
            onEdit={setEditingUser}
            onDelete={setDeletingUser}
          />
          <div className="flex justify-end">
            <PremiumPagination
              page={page}
              totalPages={data?.meta.totalPages ?? 1}
              onPageChange={setPage}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-zinc-600">No users found.</p>
        </div>
      )}

      <UserDetailsModal
        open={Boolean(viewingUser)}
        user={viewingUser}
        onClose={() => setViewingUser(null)}
      />

      <UserFormModal
        open={Boolean(editingUser)}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSubmit={onUpdate}
        isLoading={updateMutation.isPending}
      />

      <ConfirmationModal
        open={Boolean(deletingUser)}
        title="Delete User"
        description={`Are you sure you want to delete "${deletingUser?.name}"? This action cannot be undone.`}
        onClose={() => setDeletingUser(null)}
        onConfirm={onDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
