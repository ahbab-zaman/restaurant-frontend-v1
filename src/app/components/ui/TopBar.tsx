"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthUser, useLogoutMutation } from "@/lib/auth/auth.query";
import { useRouter } from "next/navigation";
import logo from "../../../../public/reception.png";

interface TopBarProps {
  onOpenMobileMenu?: () => void;
}

const TopBar = ({ onOpenMobileMenu }: TopBarProps) => {
  const user = useAuthUser();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const displayName = user?.name || "User";

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200/80 bg-white/85 px-4 sm:px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:text-zinc-900 lg:hidden"
          aria-label="Open dashboard menu"
        >
          <Menu size={18} />
        </button>

        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl  transition-transform duration-200 group-hover:scale-105">
            <Image src={logo} alt="LumosStay" className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-none text-zinc-900 sm:text-xl">LumosStay</p>          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-1.5 transition-all duration-200 hover:border-zinc-300 hover:shadow-sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-zinc-900 text-xs font-semibold text-white">
                  {displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-zinc-700 sm:block">{displayName}</span>
              <ChevronDown size={14} className="hidden text-zinc-400 sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-xl border-zinc-200 p-1.5">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold text-zinc-900">{displayName}</p>
              <p className="truncate text-xs text-zinc-500">{user?.email || "user@lumosstay.com"}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/settings" className="cursor-pointer rounded-md">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer rounded-md text-red-500 focus:bg-red-50 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logoutMutation.isPending ? "Signing out..." : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
