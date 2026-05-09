"use client";

import { motion } from "framer-motion";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminUser } from "@/types/user";

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

type UsersTableProps = {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
};

export default function UsersTable({ users, onView, onEdit, onDelete }: UsersTableProps) {
  return (
    <motion.div
      className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Table>
        <TableHeader className="bg-zinc-50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="transition-colors hover:bg-zinc-50">
              <TableCell className="font-medium text-zinc-900">{user.name}</TableCell>
              <TableCell className="text-zinc-600">{user.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${ROLE_STYLES[user.role] ?? ROLE_STYLES.GUEST}`}
                >
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
              </TableCell>
              <TableCell className="text-zinc-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-zinc-600">
                {new Date(user.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onView(user)}
                    aria-label={`View ${user.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(user)}
                    aria-label={`Edit ${user.name}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(user)}
                    aria-label={`Delete ${user.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
