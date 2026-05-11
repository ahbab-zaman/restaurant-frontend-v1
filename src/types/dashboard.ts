import { BookingStatus } from "./booking";
import { UserRole } from "./auth";

export interface DashboardMonthlyStat {
  month: string;
  revenue: number;
  guests: number;
}

export interface DashboardRecentBooking {
  id: string;
  guestName: string;
  guestEmail: string;
  hotelName: string;
  roomNumber: string;
  status: BookingStatus;
  totalPrice: number;
  guestCount: number;
  checkIn: string;
  checkOut: string;
  createdAt: string;
}

export interface DashboardOverview {
  role: UserRole;
  totals: {
    totalGuests: number;
    totalRevenue: number;
    totalBookings: number;
    totalRooms: number;
    totalHotels: number;
    occupancyRate: number;
    activeBookings: number;
    todayCheckIns: number;
    todayCheckOuts: number;
  };
  trends: {
    monthlyRevenue: number;
    currentMonthRevenue: number;
    previousMonthRevenue: number;
    revenueGrowthPercentage: number;
  };
  monthlyStats: DashboardMonthlyStat[];
  period: {
    chartFrom: string;
    chartTo: string;
    currentMonthFrom: string;
  };
  recentBookings: DashboardRecentBooking[];
}
