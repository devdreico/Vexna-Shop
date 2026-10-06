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
  )}&tabs=${tabs}&width=${width}&height=${height}&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;

  return (
    <div className={`overflow-hidden rounded-sm border border-gold/40 bg-ink-800 ${className}`}>
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
    </div>
  );
}
