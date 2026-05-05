export const navConfig = {
  super_admin: [
    { label: "Dashboard", path: "/super-admin", icon: "LayoutDashboard" },
    { label: "Hotels", path: "/super-admin/hotels", icon: "Building" },
    { label: "Bookings", path: "/super-admin/bookings", icon: "CalendarCheck" },
    { label: "Rooms", path: "/super-admin/rooms", icon: "BedDouble" },
    { label: "Users", path: "/super-admin/users", icon: "Users" },
  ],
  hotel_manager: [
    { label: "Dashboard", path: "/hotel-manager", icon: "LayoutDashboard" },
    { label: "Hotels", path: "/hotel-manager/hotels", icon: "Building" },
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
    { label: "Reviews", path: "/guest/reviews", icon: "Star" },
  ],
} as const;

export type Role = keyof typeof navConfig;
