import type { Metadata, Viewport } from "next";
import "@fontsource-variable/instrument-sans/wght.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MobileBar, Reveal } from "@/components/Chrome";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WeaveSources — Towel sourcing for hotels, spas and private-label brands",
    template: "%s · WeaveSources",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "WeaveSources",
    title: "WeaveSources — Know exactly what you're ordering.",
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company.legalName ?? site.name,
    url: site.url,
    description: site.description,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    contactPoint: site.contact.lines.map((l) => ({ "@type": "ContactPoint", telephone: `+${l.digits}`, contactType: "sales", areaServed: l.region })),
    address: {
      "@type": "PostalAddress",
      streetAddress: "1200 12th Ave S, Suite 803",
      addressLocality: "Seattle",
      addressRegion: "WA",
      postalCode: "98144",
      addressCountry: "US",
    },
    founder: site.team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role })),
  };
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
