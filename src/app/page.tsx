import BookingWidget from "./components/home/BookingWidget";
import CountdownTimer from "./components/home/CountdownTimer";
import GuestReviews from "./components/home/GuestReviews";
import HeroSection from "./components/home/HeroSection";
import TrustBar from "./components/home/TrustBar";
import WhyChooseUs from "./components/home/WhyChooseUs";

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
        <section className="px-4 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <TrustBar />
          </div>
          <div className="mx-auto max-w-6xl">
            <CountdownTimer />
          </div>
          {/* <div className="mx-auto max-w-6xl">
            <SpecialDeals />
          </div> */}
          <div className="mx-auto max-w-6xl">
            <WhyChooseUs />
          </div>
          <div className="mx-auto max-w-6xl">
            <GuestReviews />
          </div>
        </section>
      </main>
    </div>
  );
}
