import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wall of Love",
  description:
    "Real reviews from customers of The Sweets by Ayesha — see what people are saying about our halal treats near Schaumburg, IL.",
  robots: { index: true, follow: true },
};

const REVIEWS = [
  {
    name: "Raza M.",
    text: "Ordered cake pops for my daughter's birthday and they were absolutely perfect. Beautiful, delicious, and everyone kept asking where they were from.",
  },
  {
    name: "Fatima A.",
    text: "So happy I found a halal bakery this close to home. The rice krispie treats were a huge hit at our Eid gathering. Will be ordering every year!",
  },
  {
    name: "Priya S.",
    text: "Ayesha made the most stunning dessert table for my baby shower. She was so easy to work with and the treats tasted incredible.",
  },
  {
    name: "Maria G.",
    text: "The chocolate strawberries were gorgeous — looked like they came from a high-end shop. Ordered for my anniversary and my husband was so impressed.",
  },
  {
    name: "Zainab K.",
    text: "Honestly some of the best cake pops I've ever had. The custom colors matched our theme perfectly and the quality was next level.",
  },
  {
    name: "Nadia R.",
    text: "Fast response, easy ordering process, and the final product was even better than I expected. Highly recommend for any event.",
  },
  {
    name: "Jasmine T.",
    text: "I got mango dessert cups for a work event and my coworkers would not stop talking about them. Already planning my next order!",
  },
  {
    name: "Omar B.",
    text: "Great experience from start to finish. Ayesha was communicative, the treats arrived fresh, and the presentation was beautiful.",
  },
  {
    name: "Sana M.",
    text: "We ordered for our daughter's Quinceanera and Ayesha nailed every detail. The treats matched the colors perfectly and tasted amazing.",
  },
  {
    name: "Layla H.",
    text: "Absolutely love supporting a local halal business. The quality is unreal and Ayesha is so kind and responsive. Five stars every time.",
  },
  {
    name: "Tariq J.",
    text: "Had Ayesha make a custom dessert box as a gift. The recipient cried — it was that beautiful. Will be ordering again soon.",
  },
  {
    name: "Sofia R.",
    text: "Found her through Instagram and I'm so glad I did. The cake pops were the highlight of our gender reveal. Everyone was taking photos!",
  },
] as const;

function StarRow() {
  return (
    <div
      className="text-base font-bold text-accent"
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-surface">
        <div className="site-container site-section">
          <h1 className="site-h1 text-text">Wall of Love</h1>
          <p className="site-lead mt-3 max-w-2xl">
            Real words from real customers. Every review below was submitted
            directly to us.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-semibold text-text sm:text-base">
              ★ 5.0 average rating
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-semibold text-text sm:text-base">
              50+ happy customers
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-background px-4 py-2 text-sm font-semibold text-text sm:text-base">
              Schaumburg &amp; Chicago suburbs
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="site-container site-section">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {REVIEWS.map((review) => (
              <article
                key={review.name}
                className="flex flex-col gap-3 rounded-3xl border border-black/5 bg-background p-6 shadow-sm"
              >
                <StarRow />
                <p className="site-body flex-1">
                  {review.text}
                </p>
                <p className="mt-auto text-sm font-semibold text-text sm:text-base">
                  {review.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container site-section">
          <h2 className="site-h2 text-text">Had a sweet experience?</h2>
          <p className="site-lead mt-3 max-w-2xl">
            We&apos;d love to hear from you. Send us your feedback and we may
            feature it here.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://www.instagram.com/thesweetsbyayesha"
              target="_blank"
              rel="noopener noreferrer"
              className="site-button inline-flex items-center justify-center rounded-full border border-black/10 bg-background px-5 py-3 text-text shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Follow on Instagram
            </a>
            <Link
              href="/order"
              className="site-button inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Send us a message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
