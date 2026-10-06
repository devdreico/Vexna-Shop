import type { MetadataRoute } from "next";
import { SITE } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrito", "/checkout", "/gracias"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
