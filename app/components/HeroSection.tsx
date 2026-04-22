import Image from "next/image";
import Link from "next/link";

export type HeroSectionProps = {
  eyebrow?: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function HeroSection({
  eyebrow,
  heading,
  subtext,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/85 via-background/50 to-background/10" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          {eyebrow ? (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-text shadow-sm ring-1 ring-black/5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {eyebrow}
            </div>
          ) : null}
          <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-text sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 text-base leading-7 text-text/80 sm:text-lg">
            {subtext}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-background/80 px-6 py-3 text-sm font-semibold text-text shadow-sm transition hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Browse Treats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

