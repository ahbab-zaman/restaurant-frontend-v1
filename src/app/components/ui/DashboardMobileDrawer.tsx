"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BedDouble,
  Building,
  CalendarCheck,
  LayoutDashboard,
  Ticket,
  Users,
  X,
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

interface DashboardMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function DashboardMobileDrawer({
  open,
  onClose,
}: DashboardMobileDrawerProps) {
  const pathname = usePathname();
  const user = useAuthUser();
  const role = user?.role ? mapAuthRoleToNavRole(user.role) : getRoleFromPath(pathname);
  const items = navConfig[role];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) onClose();
  }, [pathname]);

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-dvh w-[86%] max-w-80 border-r border-zinc-200 bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Dashboard Menu</p>
            <p className="text-xs text-zinc-500">Quick navigation</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:text-zinc-900"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
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
      </aside>
    </>
  );
}
