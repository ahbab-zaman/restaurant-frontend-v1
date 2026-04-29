"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Hotel,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

interface UserDropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ── Constants ──────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const userDropdownItems: UserDropdownItem[] = [
  { label: "My Profile", href: "/profile", icon: <User size={14} /> },
  { label: "My Bookings", href: "/bookings", icon: <BookOpen size={14} /> },
  { label: "Wishlist", href: "/wishlist", icon: <Heart size={14} /> },
  { label: "Settings", href: "/settings", icon: <Settings size={14} /> },
];

// ── Mock auth state (replace with your real auth hook) ────────────────
const MOCK_USER = {
  isLoggedIn: false, // toggle to true to preview logged-in state
  name: "Aryan Karim",
  email: "aryan@example.com",
  avatar: "",
};

// ── Logo ──────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group select-none">
      <motion.div
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-btn"
      >
        <Hotel size={18} className="text-brand-text" />
      </motion.div>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground leading-none">
        Lumos<span className="text-brand-btn">Stay</span>
      </span>
    </Link>
  );
}

// ── Nav Link Item ─────────────────────────────────────────────────────
function NavItem({ href, label, onClick }: NavLink & { onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium tracking-wide transition-colors duration-200",
        "text-foreground/70 hover:text-foreground",
        isActive && "text-foreground",
      )}
    >
      {label}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-brand-btn rounded-full"
        initial={{ width: isActive ? "100%" : "0%" }}
        animate={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      />
    </Link>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────
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
      className={cn(
        "relative w-10 h-5 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-btn",
        isDark ? "bg-brand-btn" : "bg-foreground/15",
      )}
    >
      <motion.span
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-white shadow-sm"
      >
        {isDark ? (
          <Moon size={9} className="text-brand-btn" />
        ) : (
          <Sun size={9} className="text-amber-500" />
        )}
      </motion.span>
    </motion.button>
  );
}

// ── Search Button ─────────────────────────────────────────────────────
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

// ── User Dropdown ─────────────────────────────────────────────────────
function UserDropdown({ user }: { user: typeof MOCK_USER }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-1 py-0.5 rounded-full hover:bg-foreground/6 transition-colors focus-visible:ring-2 focus-visible:ring-brand-btn outline-none"
        >
          <Avatar className="w-8 h-8 ring-2 ring-brand-btn/30">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-brand-btn text-brand-text text-xs font-semibold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium text-foreground/80 max-w-[90px] truncate">
            {user.name.split(" ")[0]}
          </span>
          <ChevronDown
            size={13}
            className="text-foreground/50 hidden md:block"
          />
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-52 rounded-xl shadow-xl border border-border/60 bg-nav-bg p-1.5"
      >
        <DropdownMenuLabel className="px-2 py-1.5">
          <p className="text-sm font-semibold text-foreground truncate">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userDropdownItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-foreground/75 hover:text-foreground cursor-pointer"
            >
              <span className="text-foreground/50">{item.icon}</span>
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer">
          <LogOut size={14} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Auth Buttons ──────────────────────────────────────────────────────
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
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          size="sm"
          className="text-sm font-medium bg-brand-btn text-brand-text hover:bg-brand-600 rounded-lg px-4 shadow-sm"
          asChild
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </motion.div>
    </div>
  );
}

// ── Mobile Sidebar ────────────────────────────────────────────────────
function MobileSidebar({
  isLoggedIn,
  isDark,
  toggleTheme,
}: {
  isLoggedIn: boolean;
  isDark: boolean;
  toggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.9 }}
          aria-label="Open menu"
          className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/6 transition-colors"
        >
          <Menu size={20} />
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[280px] sm:w-[320px] bg-nav-bg border-r border-border/60 p-0"
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-border/40">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-foreground/50 hover:text-foreground hover:bg-foreground/6"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
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

        {/* Divider */}
        <div className="mx-4 border-t border-border/40" />

        {/* Bottom: theme + auth */}
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
                <Link href="/login">Log In</Link>
              </Button>
              <Button
                className="w-full rounded-xl bg-brand-btn text-brand-text hover:bg-brand-600"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────
export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = MOCK_USER;

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16 transition-shadow duration-300 bg-nav-bg",
        scrolled
          ? "shadow-[0_2px_24px_rgba(71,55,41,0.08)] backdrop-blur-md"
          : "shadow-none",
      )}
    >
      {/* Inner layout */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT — Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* MIDDLE — Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </nav>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <SearchButton />

          {/* Theme toggle — hidden on mobile (available in sidebar) */}
          <span className="hidden sm:block">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </span>

          {/* Divider */}
          <div className="hidden sm:block w-px h-5 bg-border mx-1" />

          {/* Auth */}
          <div className="hidden md:flex">
            {user.isLoggedIn ? <UserDropdown user={user} /> : <AuthButtons />}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <MobileSidebar
              isLoggedIn={user.isLoggedIn}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-border/60" />
    </motion.header>
  );
}
