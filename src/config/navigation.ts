export const navConfig = {
  super_admin: [
    { label: "Dashboard", path: "/super-admin", icon: "LayoutDashboard" },
    { label: "Hotels", path: "/super-admin/hotels", icon: "Building" },
    { label: "Users", path: "/super-admin/users", icon: "Users" },
  ],
  hotel_manager: [
    { label: "Dashboard", path: "/hotel-manager", icon: "LayoutDashboard" },
    {
      label: "Bookings",
      path: "/hotel-manager/bookings",
      icon: "CalendarCheck",
    },
    { label: "Rooms", path: "/hotel-manager/rooms", icon: "BedDouble" },
  ],
  guest: [
    { label: "Dashboard", path: "/guest", icon: "LayoutDashboard" },
    { label: "Reservations", path: "/guest/reservations", icon: "Ticket" },
  ],
} as const;

export type Role = keyof typeof navConfig;
