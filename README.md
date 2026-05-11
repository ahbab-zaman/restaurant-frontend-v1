# LumosStay — Frontend

> A premium hotel booking web application built with **Next.js 16 App Router**, **React 19**, and **TanStack Query**. Supports public hotel discovery, user account management, multi-step checkout with Stripe, and role-based dashboards for Hotel Managers and Super Admins.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Routing Architecture](#routing-architecture)
- [State Management](#state-management)
- [Authentication](#authentication)
- [Payments](#payments)
- [SEO Strategy](#seo-strategy)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## Overview

LumosStay is a full-featured hotel reservation platform. The frontend handles:

- **Public discovery** — Hero landing page, hotel browsing, room detail modals, guest reviews
- **Authenticated flows** — Booking checkout, reservation history, profile management
- **Hotel Manager portal** — Manage owned hotels, rooms, and bookings
- **Super Admin portal** — Platform-wide oversight of all hotels, rooms, bookings, and users
- **Informational pages** — About, Contact, Help, Privacy, Terms, Cancellation, Cookies, Accessibility

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Component Library | [shadcn/ui](https://ui.shadcn.com) + [Base UI](https://base-ui.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| Server State | [TanStack Query v5](https://tanstack.com/query) |
| Global State | [Redux Toolkit](https://redux-toolkit.js.org) + [Redux Persist](https://github.com/rt2zz/redux-persist) |
| Auth | [Better Auth](https://www.better-auth.com) (client-side SDK) |
| Payments | [Stripe.js](https://stripe.com/docs/js) + [React Stripe.js](https://github.com/stripe/react-stripe-js) |
| Notifications | [React Hot Toast](https://react-hot-toast.com) |
| Fonts | Google Fonts — Montserrat, Geist Mono |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, providers, metadata
│   ├── page.tsx                    # Home page (/)
│   │
│   ├── (auth)/
│   │   ├── login/                  # /login — Sign-in form
│   │   └── register/               # /register — Registration form
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Shared dashboard shell (sidebar + nav)
│   │   ├── hotel-manager/          # /hotel-manager — Hotel Manager portal
│   │   │   ├── page.tsx            # Dashboard overview
│   │   │   ├── bookings/           # Booking management
│   │   │   ├── hotels/             # Hotel management
│   │   │   └── rooms/              # Room management
│   │   └── super-admin/            # /super-admin — Super Admin portal
│   │       ├── page.tsx            # Platform overview
│   │       ├── bookings/           # Cross-property bookings
│   │       ├── hotels/             # All hotels
│   │       ├── rooms/              # All rooms
│   │       └── users/              # User & role management
│   │
│   ├── (info)/                     # Informational pages (shared layout)
│   │   ├── about/
│   │   ├── accessibility/
│   │   ├── cancellation/
│   │   ├── contact/
│   │   ├── cookies/
│   │   ├── help/
│   │   ├── privacy/
│   │   └── terms/
│   │
│   ├── account/                    # /account — Authenticated user portal
│   │   ├── settings/               # Profile overview
│   │   ├── edit/                   # Edit name & email
│   │   └── bookings/               # Booking history
│   │
│   ├── booking/
│   │   └── success/                # /booking/success — Post-payment confirmation
│   │
│   ├── checkout/
│   │   └── start/                  # /checkout/start — Booking checkout flow
│   │
│   ├── hotels/
│   │   ├── page.tsx                # /hotels — Hotel listing & search
│   │   └── HotelDetail/[id]/       # /hotels/HotelDetail/:id — Hotel detail
│   │
│   ├── components/                 # Shared and feature-specific components
│   │   ├── home/                   # HeroSection, BookingWidget, TrustBar, etc.
│   │   ├── hotel/                  # HotelDetails, RoomCard, RoomDetailModal
│   │   ├── checkout/               # BookingCheckoutStarter
│   │   ├── layout/                 # LayoutShell, Navbar, Footer, Sidebar
│   │   └── ui/                     # Tables, Modals, Dashboards (reusable)
│   │
│   ├── hooks/                      # Custom React hooks
│   ├── data/                       # Static data / constants
│   └── layout/                     # LayoutShell component
│
├── lib/                            # API query hooks (TanStack Query)
│   ├── auth/
│   ├── bookings/
│   ├── dashboard/
│   ├── hotels/
│   ├── payments/
│   ├── reviews/
│   └── rooms/
│
├── providers/                      # AppProviders (QueryClient, Redux, Auth)
├── types/                          # Global TypeScript types
└── components/
    └── ui/                         # shadcn/ui base components
```

---

## Features

### Public Pages
- **Home** — Hero banner, search/booking widget, trust statistics, guest reviews, "Why Choose Us" section
- **Hotel Listing** (`/hotels`) — Search, filter, and browse all hotels with live data
- **Hotel Detail** (`/hotels/HotelDetail/:id`) — Full hotel profile, room cards with truncated descriptions, full-detail modal, amenities, and book-now CTA
- **Informational** — About, Help, Terms, Privacy, Cancellation, Cookies, Accessibility, Contact

### Authenticated User Pages
- **Account Overview** (`/account/settings`) — Profile snapshot and quick links
- **Edit Profile** (`/account/edit`) — Update name and email
- **My Bookings** (`/account/bookings`) — Tabular booking history with detail modal

### Checkout Flow
- **Start Checkout** (`/checkout/start?roomId=…`) — Multi-field form with room summary, guest count, date picker, and Stripe Elements
- **Booking Success** (`/booking/success?bookingId=…`) — Real-time booking status with cache invalidation

### Hotel Manager Dashboard
- **Overview** — Revenue, guest counts, check-ins/outs, managed properties (last 6-month bar chart)
- **Hotels** — Full CRUD for owned hotel properties
- **Rooms** — Room creation with pricing, capacity, and availability
- **Bookings** — Read-only live booking pipeline for owned properties

### Super Admin Dashboard
- **Overview** — Platform-wide revenue, occupancy rate, growth trends, recent bookings panel
- **Hotels** — Admin-level hotel CRUD across all properties
- **Rooms** — Platform-wide room management
- **Bookings** — Full booking management with status updates
- **Users** — List, view, edit roles, and delete any platform user

---

## Routing Architecture

The app uses **Next.js App Router** with route groups for layout isolation:

| Route Group | Purpose |
|---|---|
| `(auth)` | Login / Register pages (no shared nav/footer) |
| `(dashboard)` | Hotel Manager & Super Admin portals with sidebar layout |
| `(info)` | Legal and informational pages with simple content layout |
| `account/` | Authenticated user portal with account sidebar |

**Client vs Server Components:**
- Pages requiring user interaction (`"use client"`) export metadata via a co-located `layout.tsx`
- Server-rendered pages export `metadata` directly from `page.tsx`
- Dashboard client pages use `layout.tsx` with `robots: noindex` to block search engine crawling

---

## State Management

| Layer | Tool | Purpose |
|---|---|---|
| Server / async state | TanStack Query v5 | API calls, caching, cache invalidation |
| Global client state | Redux Toolkit + Persist | Auth user slice, persisted session |
| Local UI state | `useState` / `useReducer` | Modal open/close, form state |

**Query invalidation pattern:** After mutations (create/update/delete), the app calls `queryClient.invalidateQueries()` with the affected query keys to ensure instant UI updates without full page reloads.

---

## Authentication

Authentication is handled by **Better Auth** with cookie-based session management:

- `useAuthUser()` — Returns the current authenticated user from the Redux store
- `useLoginMutation()` / `useRegisterMutation()` / `useLogoutMutation()` — TanStack Query mutations wrapping the Better Auth client SDK
- Route protection is enforced via the **dashboard layout** which checks user role (`HOTEL_MANAGER` or `SUPER_ADMIN`)
- Unauthenticated users are redirected to `/login?redirect=<original-path>`

---

## Payments

Payments are processed via **Stripe**:

1. Frontend creates a booking and initiates a Stripe Payment Intent via the backend API
2. **Stripe Elements** (`@stripe/react-stripe-js`) renders the secure card input in the checkout form
3. On successful payment, Stripe sends a webhook event to the backend to confirm the booking
4. The `/booking/success` page polls the booking status and invalidates room/hotel availability caches

---

## SEO Strategy

| Page Type | Metadata Method | robots |
|---|---|---|
| Home, Hotels, Info pages | `export const metadata` in `page.tsx` | `index, follow` |
| Auth pages (client components) | `layout.tsx` in route folder | `index, follow` |
| Hotel detail (dynamic, client) | `layout.tsx` in `[id]` folder | `index, follow` |
| All dashboard pages | `layout.tsx` or `page.tsx` | `noindex, nofollow` |
| Account, Checkout, Booking | `layout.tsx` in route folder | `noindex, nofollow` |

**Root layout** (`app/layout.tsx`) provides:
- `title.template` → `"%s | LumosStay"` for consistent titles
- Full **Open Graph** metadata (og:title, og:description, og:image)
- **Twitter Card** metadata (`summary_large_image`)
- `keywords`, `authors`, `creator`, `metadataBase`

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- Backend server running (see `/restaurant-backend/README.md`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js development server with HMR |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
