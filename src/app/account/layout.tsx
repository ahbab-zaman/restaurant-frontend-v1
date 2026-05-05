"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import {
  useAuthUser,
  useLogoutMutation,
  useMeQuery,
} from "@/lib/auth/auth.query";
import { hasSessionFlag } from "@/lib/auth/session";

const navItems = [
  { href: "/account/settings", label: "Account Settings", icon: Settings, exact: true },
  { href: "/account/edit", label: "Edit Profile", icon: User },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();
  const logoutMutation = useLogoutMutation();
  const meQuery = useMeQuery(true);

  useEffect(() => {
    if (meQuery.isError && !hasSessionFlag()) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [meQuery.isError, pathname, router]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  if (meQuery.isLoading) {
    return (
      <div className="pt-16 min-h-dvh bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-black/20 p-6 text-sm text-gray-500 dark:text-gray-400">
            Loading your account...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-dvh flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {user.name} | {user.email}
          </p>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-64 shrink-0 sticky top-6 h-fit">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm dark:shadow-black/20 border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-[#383736] text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                  <User size={22} className="text-white" />
                </div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-300 text-xs mt-0.5 truncate">
                  {user.email}
                </p>
              </div>

              <nav className="py-2">
                {navItems.map(({ href, label, icon: Icon, exact }) => {
                  const active = exact
                    ? pathname === href
                    : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={clsx(
                        "flex items-center gap-3 px-5 py-3 text-sm transition-colors",
                        active
                          ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold border-r-2 border-gray-900 dark:border-gray-100"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                      )}
                    >
                      <Icon
                        size={16}
                        className={
                          active
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      />
                      <span className="flex-1">{label}</span>
                      <ChevronRight
                        size={14}
                        className={clsx(
                          "transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </Link>
                  );
                })}
                <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
