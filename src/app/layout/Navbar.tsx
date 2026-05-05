"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  BookOpen,
  Heart,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuthUser, useLogoutMutation } from "@/lib/auth/auth.query";
import logo from "../../../public/reception.png";

interface NavLink {
  label: string;
  href: string;
}

interface UserDropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const userDropdownItems: UserDropdownItem[] = [
  { label: "My Dashboard", href: "/account/dashboard", icon: LayoutDashboard },
  { label: "My Account", href: "/account/settings", icon: Settings },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1.5 group select-none">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-btn"
      >
        <Image src={logo} alt="LumosStay Logo" className="w-6 h-w-6" />
      </motion.div>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground leading-none">
        Lumos<span className="text-brand-btn">Stay</span>
      </span>
    </Link>
  );
}

function NavItem({ href, label, onClick }: NavLink & { onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium tracking-wide transition-colors duration-200 px-3 py-1.5 rounded-lg",
        "text-foreground/70 hover:text-foreground",
        isActive && "text-foreground",
      )}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-lg bg-foreground/8"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

function ThemeToggle({
  isDark,
  toggle,
}: {
  isDark: boolean;
  toggle: () => void;
}) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.1 }}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-foreground/6 transition-colors duration-150"
    >
      {isDark ? (
        <Moon size={18} className="text-brand-btn" />
      ) : (
        <Sun size={18} className="text-amber-500" />
      )}
    </motion.button>
  );
}

function SearchButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Search"
      className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-foreground/6 transition-colors duration-150"
    >
      <Search size={18} />
    </motion.button>
  );
}

function UserDropdown({
  user,
  onLogout,
}: {
  user: {
    name?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    email?: string | null;
    avatar?: string | null;
  };
  onLogout: () => void | Promise<void>;
}) {
  const displayName =
    user?.name?.trim() ||
    [user?.firstname, user?.lastname].filter(Boolean).join(" ").trim() ||
    "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-1 py-0.5 rounded-full hover:bg-foreground/6 transition-colors focus-visible:ring-2 focus-visible:ring-brand-btn outline-none"
        >
          <Avatar className="w-8 h-8 ring-2 ring-brand-btn/30">
            <AvatarImage src={user.avatar ?? ""} alt={displayName} />
            <AvatarFallback className="bg-brand-btn text-brand-text text-xs font-semibold">
              {displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium text-foreground/80 max-w-22.5 truncate">
            {displayName.split(" ")[0]}
          </span>
          <ChevronDown
            size={13}
            className="text-foreground/50 hidden md:block"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-52 rounded-xl shadow-xl border border-border/60 bg-white p-1.5"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <p className="text-sm font-semibold text-foreground truncate">
            {displayName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user.email ?? ""}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userDropdownItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-foreground/75 hover:text-foreground cursor-pointer"
              >
                <span className="text-foreground/50">
                  <Icon size={14} />
                </span>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/6 rounded-lg px-4"
          asChild
        >
          <Link href="/login">Log In</Link>
        </Button>
      </motion.div>
    </div>
  );
}

function MobileSidebar({
  isLoggedIn,
  isDark,
  toggleTheme,
  onLogout,
}: {
  isLoggedIn: boolean;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/6 transition-colors"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="overlay"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
            />

            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed left-0 top-0 z-50 h-dvh w-full sm:w-[320px] bg-white dark:bg-gray-900 border-r border-border/60 p-0 backdrop-blur-md"
            >
              <div className="flex items-center justify-between px-5 py-5 border-b border-border/40">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/6"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col px-4 py-4 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mx-4 border-t border-border/40" />

              <div className="px-4 py-4 space-y-3">
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-foreground/4">
                  <span className="text-sm text-foreground/70 font-medium">
                    {isDark ? "Dark Mode" : "Light Mode"}
                  </span>
                  <ThemeToggle isDark={isDark} toggle={toggleTheme} />
                </div>

                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    onClick={onLogout}
                    className="w-full justify-start gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                  >
                    <LogOut size={15} /> Sign Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2 pt-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-border/60 text-foreground/70"
                      asChild
                    >
                      <Link href="/login" onClick={() => setOpen(false)}>
                        Log In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const user = useAuthUser();
  const logoutMutation = useLogoutMutation();
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace("/login");
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16 transition-shadow duration-300 bg-white dark:bg-gray-900",
        scrolled
          ? "shadow-[0_2px_24px_rgba(71,55,41,0.08)] backdrop-blur-md"
          : "shadow-none",
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="md:hidden">
            {isLoggedIn && user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : null}
          </div>

          <SearchButton />

          <span className="hidden sm:block">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </span>

          <div className="hidden sm:block w-px h-5 bg-border mx-1" />

          <div className="hidden md:flex">
            {isLoggedIn && user ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>

          <div className="md:hidden">
            <MobileSidebar
              isLoggedIn={isLoggedIn}
              isDark={isDark}
              toggleTheme={toggleTheme}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-border/60" />
    </motion.header>
  );
}
