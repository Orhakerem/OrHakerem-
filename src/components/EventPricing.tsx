import {
  cateringCategories,
  venueRentals,
} from '@/lib/event-pricing-data';

export default function EventPricing() {
  return (
    <section
      id="pricing"
      className="events-pricing-section py-8 md:py-20 mb-8 md:mb-20"
      data-animate="fade-up"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Primary block — Venue Rental */}
        <div className="text-center mb-12" data-animate="fade-up">
          <div className="inline-block mb-4">
            <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
              Event Pricing
            </span>
          </div>
          <h2
            className="font-head text-2xl md:text-5xl font-bold text-black mb-4 leading-tight"
            data-animate="text"
          >
            Venue Rental
          </h2>
          <p className="text-black/80 text-sm md:text-xl max-w-3xl mx-auto leading-relaxed">
            Book the space only, then add catering and services if needed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-8 md:mb-20">
          {venueRentals.map((rental) => (
            <article
              key={rental.id}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-secondary/30 hover:shadow-2xl transition-shadow"
              data-animate="scale"
            >
              <h3 className="font-head text-lg md:text-3xl font-bold text-black">
                {rental.label}
              </h3>
              <div className="my-6">
                <div className="flex items-baseline gap-1 flex-wrap">
                  <span className="font-head text-5xl md:text-6xl font-bold text-black">
                    {rental.price.toLocaleString('en-US')}
                  </span>
                  <span className="font-head text-3xl md:text-4xl font-bold text-black">
                    ₪
                  </span>
                </div>
                <span className="block text-black/70 text-sm mt-2">
                  {rental.priceSuffix}
                </span>
              </div>
              <ul className="space-y-2 text-black/80">
                {rental.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-tertiary" aria-hidden>
                      •
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Secondary block — Catering & Service Add-ons */}
        <div className="text-center mb-5 md:mb-10" data-animate="fade-up">
          <h3 className="font-head text-2xl md:text-4xl font-bold text-black mb-3">
            Catering &amp; Service Add-ons
          </h3>
          <p className="text-black/70 max-w-3xl mx-auto leading-relaxed">
            Optional packages and services can be added depending on your event
            size.
          </p>
        </div>

        {cateringCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-cream/60 rounded-2xl border border-secondary/20 p-6 md:p-8 mb-8"
            data-animate="fade-up"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h4 className="font-head text-2xl font-bold text-black">
                {cat.name}
              </h4>
              <span className="text-tertiary text-sm uppercase tracking-wider">
                {cat.tagline}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6">
              {cat.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-white rounded-xl p-5 border border-gray-100"
                >
                  <h5 className="font-semibold text-black mb-3">
                    {tier.guestRange}
                  </h5>
                  <ul className="text-sm text-black/80 divide-y divide-gray-100">
                    {tier.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex justify-between gap-4 py-2"
                      >
                        <span>{item.label}</span>
                        <span className="font-medium whitespace-nowrap">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-black/70 text-xs uppercase tracking-wider mb-2">
                Furniture extras
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.extras.map((extra) => (
                  <span
                    key={extra.label}
                    className="bg-secondary/15 text-black px-3 py-1 rounded-full text-sm"
                  >
                    {extra.label} — {extra.price}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
