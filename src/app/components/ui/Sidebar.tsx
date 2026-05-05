"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  Building,
  CalendarCheck,
  LayoutDashboard,
  Star,
  Ticket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navConfig, type Role } from "@/config/navigation";
import { useAuthUser } from "@/lib/auth/auth.query";
import { type UserRole } from "@/types/auth";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Building,
  Users,
  CalendarCheck,
  BedDouble,
  Ticket,
  Star,
};

function getRoleFromPath(pathname: string): Role {
  if (pathname.startsWith("/super-admin")) return "super_admin";
  if (pathname.startsWith("/hotel-manager")) return "hotel_manager";
  return "guest";
}

function mapAuthRoleToNavRole(role?: UserRole): Role {
  if (role === "SUPER_ADMIN") return "super_admin";
  if (role === "HOTEL_ADMIN") return "hotel_manager";
  return "guest";
}

function roleLabel(role: Role) {
  if (role === "super_admin") return "Super Admin";
  if (role === "hotel_manager") return "Hotel Manager";
  return "Guest";
}

const Sidebar = () => {
  const pathname = usePathname();
  const user = useAuthUser();
  const role = user?.role ? mapAuthRoleToNavRole(user.role) : getRoleFromPath(pathname);
  const items = navConfig[role];
  const displayName = user?.name || "Dashboard User";
  const email = user?.email || "user@lumosstay.com";

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-zinc-200/80 bg-white/95 backdrop-blur">
      <div className="border-b border-zinc-200/80 p-6">
        <p className="text-xs font-medium tracking-[0.18em] text-zinc-500">NAVIGATION</p>
      </div>

      <nav className="space-y-1.5 p-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-200",
                  isActive
                    ? "border-white/20 bg-white/10"
                    : "border-zinc-200 bg-white group-hover:border-zinc-300",
                )}
              >
                <Icon size={16} />
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-200/80 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
            {displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">{displayName}</p>
            <p className="truncate text-xs text-zinc-500">{roleLabel(role)} - {email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
