import { SITE } from "@/data/config";

interface Props {
  tabs?: "timeline" | "posts";
  width?: number;
  height?: number;
  className?: string;
}

export function FacebookPagePlugin({ tabs = "timeline", width = 500, height = 620, className = "" }: Props) {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    SITE.facebookUrl,
  )}&tabs=${tabs}&width=${width}&height=${height}&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <div className={`panel-dark overflow-hidden rounded-sm ${className}`}>
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: "none", overflow: "hidden", width: "100%", maxWidth: `${width}px` }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={`Página de Facebook de ${SITE.brand}`}
        loading="lazy"
      />
      <div className="flex items-center justify-between gap-3 border-t border-gold/30 px-4 py-3">
        <span className="text-[10px] font-bold tracking-[0.25em] text-white/70 uppercase">
          {SITE.brand} en Facebook
        </span>
        <a
          href={SITE.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold tracking-widest text-gold uppercase transition hover:text-white"
        >
          Abrir página →
        </a>
      </div>
    </div>
  );
}
