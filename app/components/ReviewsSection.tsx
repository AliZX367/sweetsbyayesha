import Image from "next/image";
import Link from "next/link";

const REVIEWS = [
  {
    name: "Raza M.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=72&h=72&q=80",
    text: "Ordered cake pops for my daughter's birthday and they were absolutely perfect. Beautiful, delicious, and everyone kept asking where they were from.",
  },
  {
    name: "Fatima A.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=72&h=72&q=80",
    text: "So happy I found a halal bakery this close to home. The rice krispie treats were a huge hit at our Eid gathering. Will be ordering every year!",
  },
  {
    name: "Priya S.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=72&h=72&q=80",
    text: "Ayesha made the most stunning dessert table for my baby shower. She was so easy to work with and the treats tasted incredible.",
  },
  {
    name: "Maria G.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=72&h=72&q=80",
    text: "The chocolate strawberries were gorgeous — looked like they came from a high-end shop. Ordered for my anniversary and my husband was so impressed.",
  },
  {
    name: "Zainab K.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1544005313-94d028ca8860?auto=format&fit=crop&w=72&h=72&q=80",
    text: "Honestly some of the best cake pops I've ever had. The custom colors matched our theme perfectly and the quality was next level.",
  },
  {
    name: "Nadia R.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=72&h=72&q=80",
    text: "Fast response, easy ordering process, and the final product was even better than I expected. Highly recommend for any event.",
  },
  {
    name: "Jasmine T.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=72&h=72&q=80",
    text: "I got mango dessert cups for a work event and my coworkers would not stop talking about them. Already planning my next order!",
  },
  {
    name: "Omar B.",
    rating: 5 as const,
    avatarSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=72&h=72&q=80",
    text: "Great experience from start to finish. Ayesha was communicative, the treats arrived fresh, and the presentation was beautiful.",
  },
] as const;

const MARQUEE_REVIEWS = [...REVIEWS, ...REVIEWS] as const;

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className="shrink-0 text-amber-400"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z"
      />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

function ReviewAvatar({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={`Avatar for ${name}`}
      width={36}
      height={36}
      className="h-9 w-9 shrink-0 rounded-full border border-black/10 object-cover"
      sizes="36px"
    />
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-surface/40">
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

        <div className="review-marquee-outer scrollbar-hide relative mt-8 overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-12 before:bg-linear-to-r before:from-background before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-12 after:bg-linear-to-l after:from-background after:to-transparent after:content-['']">
          <div
            className="review-marquee-track"
            role="region"
            aria-labelledby="customer-reviews-heading"
          >
            {MARQUEE_REVIEWS.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="flex min-w-[280px] max-w-[280px] shrink-0 flex-col gap-3 rounded-2xl border border-black/10 bg-background p-5 shadow-sm"
              >
                <StarRow rating={review.rating} />
                <p className="flex-1 text-sm leading-6 text-text/80">
                  {review.text}
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-black/5 pt-3">
                  <ReviewAvatar src={review.avatarSrc} name={review.name} />
                  <p className="text-sm font-semibold text-text">
                    {review.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/reviews"
            className="text-sm font-semibold text-text underline underline-offset-2 transition hover:text-primary"
          >
            See all reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}
