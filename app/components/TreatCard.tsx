import Image from "next/image";

export type TreatCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  sizes?: string;
  aspectClassName?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function TreatCard({
  title,
  description,
  imageSrc,
  imageAlt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspectClassName = "aspect-[2/3]",
  imageClassName,
  priority = false,
}: TreatCardProps) {
  return (
    <article className="group min-w-0 w-full overflow-hidden rounded-3xl border border-black/5 bg-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={[
          "relative isolate w-full max-w-full overflow-hidden bg-surface",
          aspectClassName,
        ].join(" ")}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={[
            "rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]",
            imageClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-serif text-lg leading-snug text-text">{title}</h3>
        <p className="text-sm leading-6 text-text/80">{description}</p>
      </div>
    </article>
  );
}

