"use client";

import { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import TopBar from "../components/ui/TopBar";
import DashboardMobileDrawer from "../components/ui/DashboardMobileDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
