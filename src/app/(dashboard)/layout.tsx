"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/ui/navigation/Sidebar";
import TopBar from "../components/ui/navigation/TopBar";
import DashboardMobileDrawer from "../components/ui/navigation/DashboardMobileDrawer";
import { useAuthUser, useMeQuery } from "@/lib/auth/auth.query";
import { hasSessionFlag } from "@/lib/auth/session";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();
  const meQuery = useMeQuery(true);

  useEffect(() => {
    if (meQuery.isError && !hasSessionFlag()) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [meQuery.isError, pathname, router]);

  if (meQuery.isLoading) {
    return (
      <div className="h-dvh overflow-hidden bg-[#f4f4f2] text-zinc-900 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#f4f4f2] text-zinc-900">
      <DashboardMobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex h-full">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar onOpenMobileMenu={() => setMobileOpen(true)} />
          <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
