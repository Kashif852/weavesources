import type { Metadata } from "next";
import { visibleCategories, productsIn, availabilityLabel } from "@/content/products";
import { qcCheckpoints, roles } from "@/content/process";
import { markets, worldTotal, share, tradeSource } from "@/content/markets";
import { site } from "@/content/site";
import { pack, buyerProblems, approach, privateLabel, howItWorks, lowRisk, inWriting, whatWeDont, inquiryFields } from "@/content/buyer-pack";
import { printBase, Photo, Logo, qaScript } from "@/components/print";

/**
 * 16:9 buyer presentation (13.33 × 7.5 in). Rendered to docs/buyer-pack/*.pdf
 * by scripts/make-buyer-pack.sh. Narrative: src/content/buyer-pack.ts.
 */
export const metadata: Metadata = {
  title: "Buyer presentation (print layout)",
  robots: { index: false, follow: false },
};

const css = `
@page { size: 338.67mm 190.5mm; margin: 0; }
${printBase}
.pk { font-size: 12.5pt; }
.sheet { width: 338.67mm; height: 190.5mm; padding: 17mm 22mm 18mm; }
.pk .k { font-size: 8.4pt; }
.t1 { font-size: 46pt; line-height: 1; font-weight: 500; letter-spacing: -.04em; }
.t2 { font-size: 30pt; line-height: 1.08; font-weight: 500; letter-spacing: -.03em; max-width: 250mm; }
.t3 { font-size: 15pt; line-height: 1.2; font-weight: 500; letter-spacing: -.015em; }
.sm { font-size: 11.2pt; }
.xs { font-size: 9.6pt; }
.card { background: #fffdf9; border-radius: 3.5mm; padding: 6mm; }
.white .card { background: #f5f2ec; }
.green .card { background: rgb(245 242 236 / .08); }
.sfoot { position: absolute; left: 22mm; right: 22mm; bottom: 8mm; display: flex; justify-content: space-between; align-items: center; font-family: "IBM Plex Mono", monospace; font-size: 6.6pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; }
.green .sfoot { color: rgb(245 242 236 / .55); }
.num { font-family: "IBM Plex Mono", monospace; color: #a14a2a; }
.green .num { color: #c9b59c; }
`;

function Foot({ n, label }: { n: number; label: string }) {
  return (
    <div className="sfoot">
      <span>WeaveSources · {label}</span>
      <span>{String(n).padStart(2, "0")} / 10</span>
    </div>
  );
}

function Head({ k, t }: { k: string; t: string }) {
  return (
    <>
      <p className="k">{k}</p>
      <h2 className="t2" style={{ marginTop: "3.5mm" }}>{t}</h2>
    </>
  );
}

export default function Page() {
  const c = site.contact;
  const us = markets.find((m) => m.code === "US")!;
  return (
    <div className="pk">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* 1 · Cover */}
      <section className="sheet" style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 140mm" }}>
        <div style={{ padding: "17mm 18mm 15mm 22mm", display: "flex", flexDirection: "column" }}>
          <Logo h="12mm" />
          <div style={{ marginTop: "auto" }}>
            <p className="k">Buyer presentation · {pack.edition}</p>
            <h1 className="t1" style={{ marginTop: "5mm" }}>WeaveSources —<br />{pack.presentationTitle}</h1>
            <p style={{ marginTop: "6mm", fontSize: "13pt", color: "#3d3a35", maxWidth: "150mm" }}>
              Towels from independent manufacturers in Pakistan — specified, sampled and checked for U.S. importers, wholesalers, hotel suppliers and private-label brands.
            </p>
          </div>
          <div className="xs muted" style={{ marginTop: "10mm", display: "flex", flexWrap: "wrap", columnGap: "8mm", whiteSpace: "nowrap" }}>
            {c.email && <span>{c.email}</span>}
            {c.lines.map((l) => <span key={l.digits}>{l.region} {l.display}</span>)}
            <span>{site.domain}</span>
          </div>
        </div>
        <Photo src="/images/category-hotel-hospitality-towels.jpg" h="190.5mm" radius="0" pos="50% 60%" />
      </section>

      {/* 2 · The buyer's problem */}
      <section className="sheet white">
        <Head k="The buyer’s problem" t="Sourcing towels overseas usually goes wrong in the same four places." />
        <div style={{ marginTop: "11mm", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5mm" }}>
          {buyerProblems.map((p) => (
            <div key={p.k} className="card" style={{ display: "flex", flexDirection: "column", minHeight: "100mm" }}>
              <p className="num xs">{p.k}</p>
              <p className="t3" style={{ marginTop: "3mm" }}>“{p.problem}”</p>
              <p className="muted sm" style={{ marginTop: "3mm" }}>{p.detail}</p>
              <div className="rule" style={{ marginTop: "auto", paddingTop: "3mm" }}>
                <p className="k" style={{ fontSize: "6.4pt", color: "#1e3f2c" }}>How we handle it</p>
                <p className="sm" style={{ marginTop: "1.2mm" }}>{p.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <Foot n={2} label="The problem" />
      </section>

      {/* 3 · Our approach */}
      <section className="sheet">
        <Head k="Our approach" t="Make every requirement explicit, and keep every step visible." />
        <div style={{ marginTop: "9mm", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5mm" }}>
          {approach.map((a, i) => (
            <div key={a.t} className="rule" style={{ paddingTop: "4mm" }}>
              <p className="num xs">0{i + 1}</p>
              <p className="t3" style={{ marginTop: "2mm" }}>{a.t}</p>
              <p className="muted sm" style={{ marginTop: "2mm" }}>{a.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "9mm", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3mm" }}>
          {roles.map((r) => (
            <div key={r.key} style={{ borderRadius: "3mm", padding: "3.5mm 4.5mm", background: r.key === "us" ? "#1e3f2c" : "#ece6db", color: r.key === "us" ? "#f5f2ec" : "#1d1c1a" }}>
              <p className="k" style={{ fontSize: "6.4pt", color: r.key === "us" ? "#c9b59c" : undefined }}>{r.sub}</p>
              <p style={{ fontWeight: 500, marginTop: ".8mm" }}>{r.label}</p>
              <p className="xs" style={{ marginTop: ".8mm", opacity: .8 }}>{r.does.slice(0, 2).join(" · ")}</p>
            </div>
          ))}
        </div>
        <Foot n={3} label="Our approach" />
      </section>

      {/* 4 · Product range */}
      <section className="sheet white">
        <Head k="Product range" t="Towel programmes for retail, hospitality and private label." />
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4mm" }}>
          {visibleCategories.map((cat) => (
            <div key={cat.slug}>
              <Photo src={`/images/${cat.image}`} h="66mm" radius="3mm" label={null} />
              <p className="k" style={{ marginTop: "3mm", fontSize: "6pt", color: cat.availability === "active" ? "#1e3f2c" : "#a14a2a" }}>
                <span className="dot" style={{ background: cat.availability === "active" ? "#1e3f2c" : "#a14a2a" }} />{availabilityLabel[cat.availability]}
              </p>
              <p style={{ fontWeight: 500, marginTop: "1.5mm", fontSize: "12pt", lineHeight: 1.2 }}>{cat.name}</p>
              <p className="muted xs" style={{ marginTop: "1.5mm" }}>{productsIn(cat.slug).map((p) => p.name).join(" · ")}</p>
            </div>
          ))}
        </div>
        <p className="muted xs" style={{ position: "absolute", left: "22mm", bottom: "15mm" }}>Images are illustrative. “Sourced on enquiry” categories are confirmed with a suitable manufacturer per order before anything is quoted. Full specifications in the catalog.</p>
        <Foot n={4} label="Product range" />
      </section>

      {/* 5 · Private label */}
      <section className="sheet" style={{ display: "grid", gridTemplateColumns: "1fr 92mm", gap: "12mm" }}>
        <div>
          <Head k="Private label" t="Your brand, built into the specification." />
          <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "6mm", rowGap: "5mm" }}>
            {privateLabel.map((x) => (
              <div key={x.t} className="rule" style={{ paddingTop: "3mm" }}>
                <p className="t3" style={{ fontSize: "14pt" }}>{x.t}</p>
                <p className="muted sm" style={{ marginTop: "1.5mm" }}>{x.d}</p>
              </div>
            ))}
          </div>
          <p className="muted xs" style={{ marginTop: "6mm" }}>Logo files, colour references, label wording and packaging artwork are agreed before the sample. Every option is confirmed on the sample, where the manufacturing partner supports it.</p>
        </div>
        <Photo src="/images/product-coordinated-towel-sets.jpg" h="155mm" />
        <Foot n={5} label="Private label" />
      </section>

      {/* 6 · Quality assurance */}
      <section className="sheet white">
        <Head k="Quality assurance" t="The approved sample is the standard. Production is checked against it." />
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 108mm", gap: "10mm" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "6mm" }}>
            {qcCheckpoints.map((q) => (
              <div key={q.k} className="rule" style={{ padding: "2.4mm 0" }}>
                <p style={{ fontWeight: 500 }}>{q.k}</p>
                <p className="muted xs">{q.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: "3mm", alignContent: "start" }}>
            {[
              ["Sample evaluation", "You test the sample; changes go into the written specification."],
              ["Agreed check plan", "What is checked, when and by whom — in writing, before production."],
              ["Inspection options", "Pre-shipment check against your spec. Third-party inspection or lab tests when you arrange or request them."],
            ].map(([t, d]) => (
              <div key={t} className="card" style={{ padding: "4.5mm 5mm" }}>
                <p style={{ fontWeight: 500 }}>{t}</p>
                <p className="muted xs" style={{ marginTop: "1mm" }}>{d}</p>
              </div>
            ))}
            <p className="muted xs" style={{ marginTop: "1mm" }}>Certificates are held by manufacturing partners for specific facilities, not by WeaveSources. Tell us the standard you need and we propose only partners who can evidence it.</p>
          </div>
        </div>
        <Foot n={6} label="Quality" />
      </section>

      {/* 7 · How it works */}
      <section className="sheet">
        <Head k="How it works" t="Seven steps. Nothing moves to the next without your sign-off." />
        <ol style={{ marginTop: "18mm", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3mm" }}>
          {howItWorks.map((s, i) => (
            <li key={s.t} style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: "9mm", height: "9mm", borderRadius: "50%", background: i === 3 ? "#a14a2a" : "#1e3f2c", color: "#f5f2ec", display: "grid", placeItems: "center", fontFamily: "IBM Plex Mono, monospace", fontSize: "8pt", flexShrink: 0 }}>{i + 1}</span>
                {i < howItWorks.length - 1 && <span style={{ flex: 1, height: ".35mm", background: "rgb(29 28 26 / .2)", marginLeft: "2mm" }} />}
              </div>
              <p className="t3" style={{ marginTop: "6mm", fontSize: "14pt" }}>{s.t}</p>
              <p className="muted sm" style={{ marginTop: "2mm", paddingRight: "2mm" }}>{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="card" style={{ marginTop: "20mm", display: "flex", gap: "8mm", alignItems: "center" }}>
          <p className="k" style={{ flexShrink: 0 }}>Step 4 is the gate</p>
          <p className="sm">Production starts only after you approve a physical sample. That sample, with the written specification, is the reference for every check and every reorder.</p>
        </div>
        <Foot n={7} label="How it works" />
      </section>

      {/* 8 · Start with less risk */}
      <section className="sheet green">
        <Head k="Start with less risk" t="Start with a sample, not a container." />
        <div style={{ marginTop: "11mm", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4mm" }}>
          {lowRisk.map((s, i) => (
            <div key={s.t} className="card" style={{ display: "flex", flexDirection: "column", minHeight: "88mm" }}>
              <p className="num xs">0{i + 1}</p>
              <p className="t3" style={{ marginTop: "2.5mm", fontSize: "14pt" }}>{s.t}</p>
              <p className="muted sm" style={{ marginTop: "2mm" }}>{s.d}</p>
              <p className="xs rule" style={{ marginTop: "auto", paddingTop: "2.5mm", color: "#c9b59c" }}>{s.gate}</p>
            </div>
          ))}
        </div>
        <p className="muted xs" style={{ marginTop: "6mm" }}>Trial-order size depends on the product and the manufacturing partner’s minimum for your specification, and is confirmed in your quotation.</p>
        <Foot n={8} label="Less risk" />
      </section>

      {/* 9 · Why work with us */}
      <section className="sheet white">
        <Head k="Why work with us" t="Judge us on what you can check." />
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6mm" }}>
          <div className="card">
            <p className="k">People you can name</p>
            {site.team.map((m) => (
              <div key={m.name} style={{ marginTop: "4mm", display: "grid", gridTemplateColumns: "15mm 1fr", gap: "3.5mm", alignItems: "center" }}>
                {m.photo ? <Photo src={m.photo} h="15mm" radius="50%" label={null} pos="50% 25%" /> : <span />}
                <div><p style={{ fontWeight: 500, fontSize: "10pt" }}>{m.name}</p><p className="muted xs">{m.role}<br />{m.location}</p></div>
              </div>
            ))}
            <p className="muted xs rule" style={{ marginTop: "4mm", paddingTop: "3mm" }}>{site.offices.map((o) => `${o.name}: ${o.lines.join(", ")}`).join(" · ")}</p>
          </div>
          <div className="card">
            <p className="k">What you get in writing</p>
            <ul style={{ marginTop: "3mm" }}>{inWriting.map((x) => <li key={x} className="rule sm" style={{ padding: "1.9mm 0" }}>✓ {x}</li>)}</ul>
          </div>
          <div className="card">
            <p className="k">What we won’t tell you</p>
            <ul style={{ marginTop: "3mm" }}>{whatWeDont.map((x) => <li key={x} className="rule sm" style={{ padding: "1.9mm 0" }}>{x}</li>)}</ul>
          </div>
        </div>
        <div style={{ marginTop: "6mm", display: "grid", gridTemplateColumns: "60mm 1fr", gap: "6mm", alignItems: "center" }}>
          <p className="k" style={{ fontSize: "6.6pt" }}>Why Pakistan · {tradeSource.year}</p>
          <div>
            <div style={{ height: "3.4mm", background: "#ece6db", borderRadius: "2mm", overflow: "hidden" }}>
              <div style={{ width: `${share(us.value)}%`, height: "100%", background: "#1e3f2c" }} />
            </div>
            <p className="xs" style={{ marginTop: "1.6mm" }}>
              <b style={{ fontWeight: 500 }}>US${us.value.toFixed(0)}M</b> of Pakistan’s <b style={{ fontWeight: 500 }}>US${(worldTotal / 1000).toFixed(2)}bn</b> cotton terry towel exports went to the United States ({share(us.value).toFixed(0)}%). <span className="muted">{tradeSource.name}, HS {tradeSource.hs}. National statistics, not WeaveSources’ sales.</span>
            </p>
          </div>
        </div>
        <Foot n={9} label="Why us" />
      </section>

      {/* 10 · Next step */}
      <section className="sheet green" style={{ display: "grid", gridTemplateColumns: "1fr 128mm", gap: "14mm" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Logo dark h="11mm" />
          <p className="k" style={{ marginTop: "auto" }}>Next step</p>
          <h2 className="t1" style={{ marginTop: "4mm", fontSize: "36pt" }}>Share your requirements. Get a written specification and a quote.</h2>
          <div style={{ marginTop: "8mm", fontSize: "11.5pt", lineHeight: 1.6 }}>
            {c.email && <p style={{ fontWeight: 500 }}>{c.email}</p>}
            {c.lines.map((l) => <p key={l.digits}>{l.region} · {l.display}{l.whatsapp ? " · WhatsApp" : ""}</p>)}
            <p>{site.domain}/contact</p>
          </div>
          <p className="muted xs" style={{ marginTop: "3mm", marginBottom: "4mm" }}>{c.hours}.</p>
        </div>
        <div className="card" style={{ alignSelf: "center" }}>
          <p className="k">Send us, roughly</p>
          <ul style={{ marginTop: "2mm" }}>
            {inquiryFields.map((f) => (
              <li key={f.k} className="rule" style={{ padding: "1.8mm 0", display: "grid", gridTemplateColumns: "26mm 1fr" }}>
                <b style={{ fontWeight: 500 }} className="sm">{f.k}</b><span className="muted xs">{f.v}</span>
              </li>
            ))}
          </ul>
        </div>
        <Foot n={10} label="Next step" />
      </section>

      <script dangerouslySetInnerHTML={{ __html: qaScript }} />
    </div>
  );
}
