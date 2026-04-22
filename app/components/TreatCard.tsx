import Image from "next/image";
import Link from "next/link";

export type TreatCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  sizes?: string;
  aspectClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  pricing?: string;
  flippable?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TreatCard({
  title,
  description,
  imageSrc,
  imageAlt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspectClassName = "aspect-[2/3]",
  imageClassName,
  priority = false,
  pricing,
  flippable = false,
}: TreatCardProps) {
  const imageBlock = (
    <div
      className={cx(
        "relative isolate w-full max-w-full overflow-hidden bg-surface",
        aspectClassName
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes={sizes}
        className={cx(
          "rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]",
          imageClassName
        )}
      />
    </div>
  );

  const textBlock = (
    <div className="space-y-2 p-5">
      <h3 className="font-serif text-lg leading-snug text-text">{title}</h3>
      <p className="text-sm leading-6 text-text/80">{description}</p>
    </div>
  );

  if (!flippable) {
    return (
      <article className="group min-w-0 w-full overflow-hidden rounded-3xl border border-black/5 bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        {imageBlock}
        {textBlock}
      </article>
    );
  }

  return (
    <article
      className={cx(
        "group min-w-0 w-full overflow-hidden rounded-3xl border border-black/5 bg-background shadow-sm transition",
        "perspective-distant cursor-pointer h-[420px]"
      )}
    >
      <div className="relative h-full w-full transform-3d transition-transform duration-500 ease-in-out [@media(hover:hover)]:group-hover:transform-[rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl backface-hidden">
          {imageBlock}
          {textBlock}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border border-black/5 bg-surface p-6 text-center backface-hidden transform-[rotateY(180deg)]">
          <h3 className="font-serif text-lg text-text">{title}</h3>
          <p className="text-sm leading-6 text-text/80">{description}</p>
          {pricing ? (
            <div className="text-lg font-semibold text-primary">{pricing}</div>
          ) : null}
          <Link
            href="/order"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Order Now
          </Link>
        </div>
      </div>
    </article>
  );
}
