'use client';

export default function Events() {

  return (
    <div className="min-h-screen bg-cream">
      {/* Video Section - Full Width */}
      <section className="relative w-full h-[75vh] min-h-[600px] pt-20">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/2.mp4" type="video/mp4" />
        </video>

        {/* Hero Title - Positioned at bottom of video */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-10">
          <div className="text-center px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-secondary animate-fadeInUp drop-shadow-lg">
              Discover a special place for your events
            </h1>
          </div>
        </div>
      </section>

    </div>
  );
}