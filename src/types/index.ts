// ── Brand & Design ──────────────────────────────────────────────
export type BrandTier =
  | "fine-dining"
  | "upscale-casual"
  | "bistro"
  | "modern-contemporary";

// ── Rooms ───────────────────────────────────────────────────────
export type RoomAvailability = "available" | "limited" | "unavailable";

export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: { min: number; max: number };
  amenities: string[];
  availability: RoomAvailability;
  imageAlt?: string;
}

// ── Time Slots ───────────────────────────────────────────────────
export type SlotStatus = "available" | "limited" | "unavailable";
export type MealPeriod = "lunch" | "dinner";

export interface TimeSlot {
  time: string;
  status: SlotStatus;
  period: MealPeriod;
}

// ── Occasions ────────────────────────────────────────────────────
export type OccasionType =
  | "birthday"
  | "anniversary"
  | "business"
  | "date"
  | "celebration"
  | "other";

export interface Occasion {
  id: OccasionType;
  label: string;
  description: string;
}

// ── Reservation Flow ─────────────────────────────────────────────
export type ReservationStep = 1 | 2 | 3 | 4 | 5;

export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  occasion: OccasionType | null;
}

export interface ReservationState {
  step: ReservationStep;
  date: Date | null;
  partySize: number;
  roomId: string | null;
  timeSlot: string | null;
  guest: GuestDetails;
  confirmationCode: string | null;
}

// ── Navigation ───────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ── Trust & Stats ─────────────────────────────────────────────────
export interface TrustStat {
  value: string;
  label: string;
}

// ── What To Expect ────────────────────────────────────────────────
export interface ExpectItem {
  id: string;
  title: string;
  description: string;
  icon: "clock" | "dress" | "parking" | "star";
}

// ── Step Info ─────────────────────────────────────────────────────
export interface FlowStep {
  number: string;
  name: string;
  description: string;
}
