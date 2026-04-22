const REVIEWS = [
  {
    name: "Raza M.",
    rating: 5 as const,
    text: "Ordered cake pops for my daughter's birthday and they were absolutely perfect. Beautiful, delicious, and everyone kept asking where they were from.",
  },
  {
    name: "Fatima A.",
    rating: 5 as const,
    text: "So happy I found a halal bakery this close to home. The rice krispie treats were a huge hit at our Eid gathering. Will be ordering every year!",
  },
  {
    name: "Priya S.",
    rating: 5 as const,
    text: "Ayesha made the most stunning dessert table for my baby shower. She was so easy to work with and the treats tasted incredible.",
  },
  {
    name: "Maria G.",
    rating: 5 as const,
    text: "The chocolate strawberries were gorgeous — looked like they came from a high-end shop. Ordered for my anniversary and my husband was so impressed.",
  },
  {
    name: "Zainab K.",
    rating: 5 as const,
    text: "Honestly some of the best cake pops I've ever had. The custom colors matched our theme perfectly and the quality was next level.",
  },
  {
    name: "Nadia R.",
    rating: 5 as const,
    text: "Fast response, easy ordering process, and the final product was even better than I expected. Highly recommend for any event.",
  },
  {
    name: "Jasmine T.",
    rating: 5 as const,
    text: "I got mango dessert cups for a work event and my coworkers would not stop talking about them. Already planning my next order!",
  },
  {
    name: "Omar B.",
    rating: 5 as const,
    text: "Great experience from start to finish. Ayesha was communicative, the treats arrived fresh, and the presentation was beautiful.",
  },
] as const;

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="text-accent text-sm"
      aria-label={`${rating} out of 5 stars`}
    >
      <span aria-hidden="true">
        {"★".repeat(rating)}
      </span>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h2
          id="customer-reviews-heading"
          className="font-serif text-2xl tracking-tight text-text sm:text-3xl"
        >
          What our customers say
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text/80 sm:text-base">
          Real reviews from real customers across Schaumburg and the Chicago
          suburbs.
        </p>

        <div className="relative mt-8 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
          <div
            className="scrollbar-hide flex gap-4 overflow-x-auto pb-2"
            role="region"
            aria-labelledby="customer-reviews-heading"
          >
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="flex min-w-[280px] max-w-[280px] shrink-0 flex-col gap-3 rounded-3xl border border-black/5 bg-surface p-5 shadow-sm"
              >
                <StarRow rating={review.rating} />
                <p className="flex-1 text-sm leading-6 text-text/80">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-auto text-sm font-semibold text-text">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
