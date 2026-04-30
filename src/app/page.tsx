import BookingWidget from "./components/home/BookingWidget";
import HeroSection from "./components/home/HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F5F2] font-sans dark:bg-black">
      {/* HERO SECTION */}
      <HeroSection />

      {/* MAIN CONTENT */}
      <main className="w-full flex-1">
        {/* BOOKING WIDGET */}
        <section className="w-full px-4 sm:px-8 lg:px-16 -mt-16 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-20">
            <BookingWidget />
          </div>
        </section>

        {/* TRUST STATS */}
        <section className="mt-20 px-4 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-6xl">{/* <TrustStatsSection /> */}</div>
        </section>
      </main>
    </div>
  );
}
