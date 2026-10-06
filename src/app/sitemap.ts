import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { articles } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/products", "/specification", "/sample", "/brief", "/how-we-work", "/quality", "/private-label", "/buyer-confidence", "/about", "/industries", "/resources", "/contact", "/legal/privacy", "/legal/terms", "/legal/trade"];
  return [
    ...base.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, priority: 0.7 })),
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}`, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${site.url}/resources/${a.slug}`, priority: 0.6 })),
  ];
}
