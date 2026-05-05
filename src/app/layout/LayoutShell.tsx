"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const DASHBOARD_PREFIXES = ["/guest", "/hotel-manager", "/super-admin"];

function isDashboardPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return DASHBOARD_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideGlobalLayout = isDashboardPath(pathname);

  return (
    <>
      {!hideGlobalLayout && <Navbar />}
      <main className={hideGlobalLayout ? "flex-1" : "flex-1 pt-16"}>{children}</main>
      {!hideGlobalLayout && <Footer />}
    </>
  );
}
