"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminUser, AdminUpdateUserPayload } from "@/types/user";
import { UserRole } from "@/types/auth";
import AppModal from "@/app/components/ui/common/AppModal";
import LoadingSpinner from "@/app/components/ui/common/LoadingSpinner";

type UserFormModalProps = {
  open: boolean;
  user: AdminUser | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (payload: AdminUpdateUserPayload) => Promise<void>;
};

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "GUEST", label: "Guest" },
  { value: "HOTEL_ADMIN", label: "Hotel Manager" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
];

export default function UserFormModal({
  open,
  user,
  isLoading,
  onClose,
  onSubmit,
}: UserFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("GUEST");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setRole(user?.role ?? "GUEST");
    setError(null);
  }, [open, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() && !email.trim()) {
      setError("At least one field is required.");
      return;
    }

    setError(null);

    const payload: AdminUpdateUserPayload = {};
    if (name.trim() !== (user?.name ?? "")) payload.name = name.trim();
    if (email.trim() !== (user?.email ?? "")) payload.email = email.trim().toLowerCase();
    if (role !== user?.role) payload.role = role;

    if (!payload.name && !payload.email && !payload.role) {
      setError("No changes detected.");
      return;
    }

    await onSubmit(payload);
  }

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Edit User"
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" form="user-edit-form" disabled={isLoading}>
            {isLoading ? <LoadingSpinner className="mr-1 h-4 w-4" /> : null}
            Save Changes
          </Button>
        </div>
      }
    >
      <form id="user-edit-form" className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900" htmlFor="user-edit-name">
            Name
          </label>
          <Input
            id="user-edit-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="text-gray-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900" htmlFor="user-edit-email">
            Email
          </label>
          <Input
            id="user-edit-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="text-gray-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900" htmlFor="user-edit-role">
            Role
          </label>
          <select
            id="user-edit-role"
            className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </AppModal>
  );
}
