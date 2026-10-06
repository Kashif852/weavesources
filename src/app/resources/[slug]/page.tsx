import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/resources";
import { Button, Arrow } from "@/components/ui";
import { site } from "@/content/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.summary, alternates: { canonical: `/resources/${a.slug}` }, openGraph: { type: "article", title: a.title, description: a.summary } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, publisher: { "@type": "Organization", name: site.name } };
  return (
    <>
      <article className="wrap pt-32 pb-20 md:pt-44">
        <nav className="label mb-8" aria-label="Breadcrumb"><Link href="/resources" className="link-u">Buyer resources</Link> <span className="mx-2">/</span> {a.category}</nav>
        <div className="grid gap-12 lg:grid-cols-12">
          <header className="lg:col-span-8">
            <h1 className="h2 !text-[clamp(2.4rem,5vw,4.4rem)]">{a.title}</h1>
            <p className="lede mt-6">{a.summary}</p>
            <p className="label mt-6">{a.minutes} min read</p>
          </header>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="prose-ws min-w-0 lg:col-span-7">
            {a.body.map((b, i) => {
              if (b.type === "p") return <p key={i}>{b.text}</p>;
              if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "list") return <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul>;
              if (b.type === "note") return <div key={i} className="my-8 rounded-2xl bg-clay-soft/70 p-6 text-[16.5px] leading-relaxed text-clay-deep">{b.text}</div>;
              return (
                <div key={i} className="my-8 overflow-x-auto rounded-2xl border border-ink/10">
                  <table className="w-full min-w-[480px] text-left text-[15px]">
                    <thead className="bg-linen"><tr>{b.head.map((h, k) => <th key={k} className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{h}</th>)}</tr></thead>
                    <tbody>{b.rows.map((r, k) => <tr key={k} className="border-t border-ink/10">{r.map((c, j) => <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium" : "text-graphite"}`}>{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              );
            })}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-28 rounded-[22px] bg-linen p-7">
              <p className="label">Put it into practice</p>
              <p className="mt-4 text-[20px] font-medium leading-snug tracking-[-0.02em]">Turn what you&apos;ve read into a specification.</p>
              <div className="mt-6 grid gap-3">
                <Button href="/specification" variant="primary">Build a specification</Button>
                <Button href="/sample" variant="ghost">Request a sample</Button>
              </div>
            </div>
          </aside>
        </div>
      </article>
      <section className="wrap pb-24">
        <p className="eyebrow mb-6">Keep reading</p>
        <div className="grid gap-px overflow-hidden rounded-[22px] bg-ink/10 sm:grid-cols-3">
          {more.map((m) => (
            <Link key={m.slug} href={`/resources/${m.slug}`} className="group flex min-h-[180px] flex-col bg-paper p-7 hover:bg-linen">
              <p className="label">{m.category}</p>
              <p className="mt-4 text-[20px] font-medium tracking-[-0.02em]">{m.title}</p>
              <span className="mt-auto pt-4"><Arrow /></span>
            </Link>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
