"use client";

import { AdminUser } from "@/types/user";
import AppModal from "./AppModal";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  HOTEL_ADMIN: "Hotel Manager",
  GUEST: "Guest",
};

const ROLE_STYLES: Record<string, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700 border-purple-200",
  HOTEL_ADMIN: "bg-blue-50 text-blue-700 border-blue-200",
  GUEST: "bg-zinc-50 text-zinc-600 border-zinc-200",
};

type UserDetailsModalProps = {
  open: boolean;
  user: AdminUser | null;
  onClose: () => void;
};

export default function UserDetailsModal({ open, user, onClose }: UserDetailsModalProps) {
  return (
    <AppModal open={open} title={user?.name ?? "User Details"} onClose={onClose}>
      {user ? (
        <div className="space-y-4">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl font-semibold text-zinc-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-zinc-900">{user.name}</p>
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[user.role] ?? ROLE_STYLES.GUEST}`}
              >
                {ROLE_LABELS[user.role] ?? user.role}
              </span>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-600">User ID</span>
              <span className="font-mono text-xs text-zinc-500">{user.id}</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="font-medium text-zinc-600">Email</span>
              <span className="text-zinc-800">{user.email}</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="font-medium text-zinc-600">Role</span>
              <span className="text-zinc-800">{ROLE_LABELS[user.role] ?? user.role}</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="font-medium text-zinc-600">Joined</span>
              <span className="text-zinc-800">{new Date(user.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="font-medium text-zinc-600">Last Updated</span>
              <span className="text-zinc-800">{new Date(user.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : null}
    </AppModal>
  );
}
