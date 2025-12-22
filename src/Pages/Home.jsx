export default function Home() {
  return (
    <section className="bg-img min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight drop-shadow-lg">
          Your Gateway to Unforgettable Events
        </h1>

        <p className="mt-6 text-base md:text-lg text-white max-w-xl drop-shadow-md">
          Explore concerts, sports, shows, and cultural events.
          Book your tickets online and get instant confirmation by email.
        </p>

        {/* CTA */}
        <div className="mt-8 flex gap-4">
          <a
            href="#events"
            className="bg-[#73301c] hover:bg-[#853016] text-white px-8 py-3 rounded-md font-semibold transition shadow-lg"
          >
            Browse Events
          </a>

          <a
            href="#contact"
            className="bg-white/90 text-[#73301c] px-8 py-3 rounded-md font-semibold hover:bg-white transition shadow-lg"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}
