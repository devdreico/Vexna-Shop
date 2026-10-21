import { eyebrow } from "@/lib/ui";

interface Props {
  eyebrowText: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrowText, title, description, children }: Props) {
  return (
    <section data-reveal className="bg-matte relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <p className={eyebrow}>{eyebrowText}</p>
        <h1 className="mt-3 text-4xl text-gold-deep sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
