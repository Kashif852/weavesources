import type { Metadata } from "next";
import { visibleCategories, visibleProducts, productsIn, categoryOf, productImage, availabilityLabel, type Product } from "@/content/products";
import { orderSteps, qcCheckpoints, roles } from "@/content/process";
import { credentials } from "@/content/partners";
import { site } from "@/content/site";
import { pack, packagingFormats, privateLabel, usLabelling, artworkChecklist, inquiryFields, inWriting } from "@/content/buyer-pack";
import { printBase, Photo, Logo, qaScript } from "@/components/print";

/**
 * A4 buyer catalog. Rendered to docs/buyer-pack/*.pdf by
 * scripts/make-buyer-pack.sh. Products: src/content/products.ts.
 * Narrative: src/content/buyer-pack.ts. Company facts: src/content/site.ts.
 */
export const metadata: Metadata = {
  title: "Buyer catalog (print layout)",
  robots: { index: false, follow: false },
};

const css = `
@page { size: A4; margin: 0; }
${printBase}
.pk { font-size: 9.2pt; }
.sheet { width: 210mm; height: 297mm; padding: 17mm 17mm 16mm; }
.pk .k { font-size: 6.8pt; }
.h1 { font-size: 40pt; line-height: 1; font-weight: 500; letter-spacing: -.04em; }
.h2 { font-size: 22pt; line-height: 1.06; font-weight: 500; letter-spacing: -.03em; }
.h3 { font-size: 11.5pt; line-height: 1.2; font-weight: 500; letter-spacing: -.015em; }
.lead { font-size: 10.5pt; color: #3d3a35; }
.foot { position: absolute; left: 17mm; right: 17mm; bottom: 9mm; display: flex; justify-content: space-between; font-family: "IBM Plex Mono", monospace; font-size: 6.2pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; }
.green .foot { color: rgb(245 242 236 / .6); }
table.spec { width: 100%; border-collapse: collapse; }
table.spec th, table.spec td { text-align: left; vertical-align: top; padding: 2mm 0; border-top: .25mm solid rgb(29 28 26 / .12); }
table.spec th { width: 38mm; font-family: "IBM Plex Mono", monospace; font-size: 6.4pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; font-weight: 400; padding-right: 3mm; padding-top: 2.4mm; }
table.spec td.st { width: 36mm; text-align: right; font-family: "IBM Plex Mono", monospace; font-size: 6pt; letter-spacing: .06em; text-transform: uppercase; color: #a14a2a; padding-top: 2.4mm; }
table.spec td.st.ok { color: #1e3f2c; }
table.range { width: 100%; border-collapse: collapse; font-size: 8.3pt; }
table.range th, table.range td { text-align: left; vertical-align: top; padding: 1.7mm 2mm 1.7mm 0; border-top: .25mm solid rgb(29 28 26 / .12); }
table.range thead th { font-family: "IBM Plex Mono", monospace; font-size: 6pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; font-weight: 400; border-top: 0; }
table.range tr.cat td { font-weight: 500; padding-top: 3.2mm; border-top: .35mm solid #1d1c1a; }
.chips { font-size: 7.3pt; }
.chips .chip { padding: .5mm 2mm; margin: 0 1mm 1.1mm 0; }
.box { background: #ece6db; border-radius: 3mm; padding: 5mm; }
.white .box { background: #f5f2ec; }
.ln { border-bottom: .25mm solid rgb(29 28 26 / .25); height: 7mm; }
`;

function Foot({ n, label }: { n: number; label: string }) {
  return (
    <div className="foot">
      <span>WeaveSources · {label}</span>
      <span>{site.domain} · {String(n).padStart(2, "0")}</span>
    </div>
  );
}

const CONFIRM = "Confirmed at quotation";

function rows(p: Product) {
  const c = p.confirmed;
  const t = p.typical;
  const row = (k: string, verified: string | null, typical: string) => ({ k, v: verified ?? typical, ok: !!verified });
  return [
    row("Material", c.material, t.material),
    row("GSM / weight", c.gsm, t.gsm),
    row("Common sizes", c.dimensions, t.sizes.join("  ·  ")),
    row("Construction", c.construction, t.construction),
    row("Colours", c.colours, t.colours),
    { k: "Minimum order", v: c.moq ?? site.terms.moq ?? "Depends on product, colour and branding", ok: !!(c.moq ?? site.terms.moq) },
    { k: "Sample", v: site.terms.samplePolicy ?? "Available. Cost and timing confirmed in writing before anything is made", ok: true },
  ];
}

const contactLines = () => {
  const c = site.contact;
  return (
    <>
      {c.email && <p style={{ fontWeight: 500 }}>{c.email}</p>}
      {c.lines.map((l) => <p key={l.digits}>{l.region} · {l.display}{l.whatsapp ? " · WhatsApp" : ""}</p>)}
      <p>{site.domain}</p>
    </>
  );
};

export default function Page() {
  let n = 1;
  const active = visibleProducts.filter((p) => categoryOf(p).availability === "active");
  const enquiry = visibleProducts.filter((p) => categoryOf(p).availability === "enquiry");
    const people = site.team;

  return (
    <div className="pk">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── 1 · Cover ─────────────────────────────────────── */}
      <section className="sheet" style={{ padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }} data-bleed>
          <Photo src="/images/category-bath-hand-towels.jpg" h="297mm" radius="0" pos="50% 70%" label={null} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgb(245 242 236 / .97) 0%, rgb(245 242 236 / .9) 34%, rgb(245 242 236 / 0) 56%)" }} />
        </div>
        <div style={{ position: "relative", padding: "18mm 18mm 0" }}>
          <Logo h="13mm" />
          <p className="k" style={{ marginTop: "26mm" }}>{pack.edition} · For U.S. importers, wholesalers & private-label brands</p>
          <h1 className="h1" style={{ marginTop: "5mm", maxWidth: "160mm" }}>{pack.catalogTitle}</h1>
          <p className="lead" style={{ marginTop: "6mm", fontSize: "12pt", maxWidth: "142mm" }}>
            Bath, hand, face and hotel towels from independent manufacturers in Pakistan — specified, sampled and checked to your requirements.
          </p>
        </div>
        <div style={{ position: "absolute", left: "18mm", right: "18mm", bottom: "15mm", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div style={{ background: "rgb(245 242 236 / .94)", borderRadius: "3mm", padding: "4.5mm 5.5mm", fontSize: "9pt", lineHeight: 1.55 }}>{contactLines()}</div>
          <span className="tag" style={{ position: "static" }}>Illustrative image</span>
        </div>
      </section>

      {/* ── 2 · Who we are ────────────────────────────────── */}
      <section className="sheet white">
        <p className="k">Before you read</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>A sourcing partner, not a factory. Here is what that means for your order.</h2>
        <p className="lead" style={{ marginTop: "6mm", maxWidth: "168mm" }}>
          WeaveSources works on the buyer’s side. We match your product to suitable independent manufacturers in Pakistan, write the specification with you, coordinate a sample for your approval, follow production against it, and plan packing and export. You are told which manufacturer makes your order.
        </p>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5mm" }}>
          {roles.map((r) => (
            <div key={r.key} style={{ background: r.key === "us" ? "#1e3f2c" : "#f5f2ec", color: r.key === "us" ? "#f5f2ec" : "#1d1c1a", borderRadius: "3mm", padding: "4.5mm 5mm" }}>
              <p className="k" style={{ color: r.key === "us" ? "#c9b59c" : undefined }}>{r.sub}</p>
              <p className="h3" style={{ marginTop: "1.2mm" }}>{r.label}</p>
              <ul style={{ marginTop: "2mm", fontSize: "8.6pt" }}>{r.does.map((x) => <li key={x}>— {x}</li>)}</ul>
            </div>
          ))}
        </div>

        <p className="k" style={{ marginTop: "10mm" }}>How to read the specifications in this catalog</p>
        <div style={{ marginTop: "3mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5mm" }}>
          {[
            ["#6f6a62", "Commonly specified", "Industry reference values to help you write a brief. They are not a WeaveSources offer or a guaranteed capability."],
            ["#a14a2a", CONFIRM, "Set for your order with the manufacturing partner and confirmed to you in writing, before any sample is made."],
            ["#1d1c1a", "Illustrative image", "Product styling, not photographs of a specific partner’s production. Your sample is the reference."],
          ].map(([c, t, d]) => (
            <div key={t} className="rule" style={{ paddingTop: "3mm" }}>
              <p className="h3" style={{ fontSize: "10pt" }}><span className="dot" style={{ background: c }} />{t}</p>
              <p className="muted" style={{ marginTop: "1.5mm", fontSize: "8.4pt" }}>{d}</p>
            </div>
          ))}
        </div>

        <div className="rule" style={{ marginTop: "10mm", paddingTop: "5mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
          <div>
            <p className="k">The people you deal with</p>
            {people.map((m) => (
              <div key={m.name} style={{ marginTop: "3mm", display: "grid", gridTemplateColumns: "14mm 1fr", gap: "3.5mm", alignItems: "center" }}>
                {m.photo ? <Photo src={m.photo} h="14mm" radius="50%" label={null} pos="50% 25%" /> : <span />}
                <div><p style={{ fontWeight: 500 }}>{m.name}</p><p className="muted" style={{ fontSize: "8.4pt" }}>{m.role} · {m.location}</p></div>
              </div>
            ))}
          </div>
          <div>
            <p className="k">Offices</p>
            {site.offices.map((o) => <p key={o.name} style={{ marginTop: "3mm" }}><b style={{ fontWeight: 500 }}>{o.name}</b><br /><span className="muted">{o.lines.join(", ")}</span></p>)}
            <p className="muted" style={{ marginTop: "3mm", fontSize: "8.4pt" }}>{site.contact.hours}.</p>
          </div>
        </div>
        <Foot n={++n} label="About" />
      </section>

      {/* ── 3 · Range at a glance ─────────────────────────── */}
      <section className="sheet">
        <p className="k">The range at a glance</p>
        <h2 className="h2" style={{ marginTop: "4mm" }}>{visibleProducts.length} products in {visibleCategories.length} categories.</h2>
        <p className="muted" style={{ marginTop: "3mm", maxWidth: "165mm" }}>
          Quote the reference on your inquiry. Products in the current sourcing range have a detail page in this catalog; products sourced on enquiry are confirmed with a suitable manufacturer per order, before anything is quoted.
        </p>
        <table className="range" style={{ marginTop: "6mm" }}>
          <thead><tr><th style={{ width: "21mm" }}>Ref.</th><th style={{ width: "44mm" }}>Product</th><th>Typical use</th><th style={{ width: "40mm" }}>Common sizes</th></tr></thead>
          <tbody>
            {visibleCategories.map((cat) => [
              <tr key={cat.slug} className="cat">
                <td colSpan={3}>{cat.name}</td>
                <td style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "6pt", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 400, color: cat.availability === "active" ? "#1e3f2c" : "#a14a2a" }}>
                  <span className="dot" style={{ background: cat.availability === "active" ? "#1e3f2c" : "#a14a2a" }} />{availabilityLabel[cat.availability]}
                </td>
              </tr>,
              ...productsIn(cat.slug).map((p) => (
                <tr key={p.slug}>
                  <td style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "7.2pt" }}>{p.sku}</td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td className="muted">{p.useCase}</td>
                  <td className="muted">{p.typical.sizes.slice(0, 2).join(" · ")}</td>
                </tr>
              )),
            ])}
          </tbody>
        </table>
        <Foot n={++n} label="Range" />
      </section>

      {/* ── Product pages: current sourcing range ─────────── */}
      {active.map((p, i) => {
        const cat = categoryOf(p);
        const first = i === 0 || categoryOf(active[i - 1]).slug !== cat.slug;
        return (
          <section key={p.slug} className={`sheet${i % 2 ? " white" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="k">{cat.name}</p>
              <p className="k">Ref. {p.sku}</p>
            </div>
            <div style={{ marginTop: "5mm", display: "grid", gridTemplateColumns: "84mm 1fr", gap: "8mm" }}>
              <Photo src={productImage(p)} h="96mm" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h2 className="h2" style={{ fontSize: "24pt" }}>{p.name}</h2>
                <p style={{ marginTop: "2mm", fontSize: "11pt" }} className="muted">{p.short}</p>
                <p style={{ marginTop: "4.5mm", color: "#3d3a35" }}>{p.intro}</p>
                {first && <p className="muted" style={{ marginTop: "3mm", fontSize: "8.4pt" }}>{cat.intro}</p>}
                <div style={{ marginTop: "auto" }}>
                  <p className="k">Best for</p>
                  <p style={{ marginTop: "1mm" }}>{p.useCase}</p>
                  <p className="k" style={{ marginTop: "3.5mm" }}>Typically bought by</p>
                  <p style={{ marginTop: "1mm" }}>{p.buyers.join(" · ")}</p>
                </div>
              </div>
            </div>

            <table className="spec" style={{ marginTop: "6mm" }}>
              <tbody>
                {rows(p).map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>{r.v}</td>
                    <td className={`st${r.ok ? " ok" : ""}`}>{r.ok ? (r.k === "Sample" ? "Available" : "Confirmed") : r.k === "Minimum order" ? CONFIRM : "Commonly specified"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "5mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
              <div>
                <p className="k">Customisation & branding</p>
                <ul style={{ marginTop: "1.5mm", fontSize: "8.4pt" }}>{p.typical.customisation.map((x) => <li key={x}>— {x}</li>)}</ul>
              </div>
              <div>
                <p className="k">Packaging</p>
                <ul style={{ marginTop: "1.5mm", fontSize: "8.4pt" }}>{p.typical.packaging.map((x) => <li key={x}>— {x}</li>)}</ul>
              </div>
            </div>

            <div className="box" style={{ marginTop: "4mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm", fontSize: "8.4pt" }}>
              <div>
                <p className="k">Buyer note</p>
                <p style={{ marginTop: "1.5mm" }}>{p.typical.notes}</p>
              </div>
              <div>
                <p className="k">To quote, send</p>
                <p style={{ marginTop: "1.5mm" }}>Ref. {p.sku}, size, target GSM, colour, branding, packaging, quantity and destination.</p>
              </div>
            </div>
            <Foot n={++n} label={p.name} />
          </section>
        );
      })}

      {/* ── Sourced on enquiry ────────────────────────────── */}
      <section className="sheet white">
        <p className="k">Also sourced on enquiry</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>Beach, kitchen and robe programmes, confirmed per order.</h2>
        <p className="muted" style={{ marginTop: "3mm", maxWidth: "168mm" }}>
          We source these on request. Before quoting, we confirm a manufacturing partner that makes your specification. We don’t assume availability, and we tell you if we can’t find a suitable partner.
        </p>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "7mm", rowGap: "6mm" }}>
          {enquiry.map((p) => (
            <div key={p.slug} style={{ display: "grid", gridTemplateColumns: "34mm 1fr", gap: "4mm" }}>
              <Photo src={productImage(p)} h="44mm" radius="2.5mm" label={null} />
              <div>
                <p className="k" style={{ fontSize: "6pt" }}>{p.sku} · {categoryOf(p).name}</p>
                <p className="h3" style={{ marginTop: "1mm" }}>{p.name}</p>
                <p className="muted" style={{ marginTop: "1mm", fontSize: "8.2pt" }}>{p.short}</p>
                <p style={{ marginTop: "1.6mm", fontSize: "7.8pt" }}>{p.typical.material}</p>
                <p style={{ marginTop: ".6mm", fontSize: "7.8pt" }} className="muted">{p.typical.sizes.slice(0, 2).join(" · ")}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "6mm", fontSize: "7.6pt" }}>Images are illustrative. Materials and sizes shown are commonly specified reference points, not a WeaveSources offer.</p>
        <Foot n={++n} label="On enquiry" />
      </section>

      {/* ── Private label ─────────────────────────────────── */}
      <section className="sheet">
        <p className="k">Private label & customisation</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>Your brand, built into the specification — not added at the end.</h2>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "1fr 70mm", gap: "8mm" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "6mm", rowGap: "4.5mm", alignContent: "start" }}>
            {privateLabel.map((x) => (
              <div key={x.t} className="rule" style={{ paddingTop: "2.5mm" }}>
                <p className="h3" style={{ fontSize: "10.2pt" }}>{x.t}</p>
                <p className="muted" style={{ marginTop: "1mm", fontSize: "8.5pt" }}>{x.d}</p>
              </div>
            ))}
          </div>
          <Photo src="/images/product-coordinated-towel-sets.jpg" h="88mm" />
        </div>
        <p className="muted" style={{ marginTop: "4mm", fontSize: "8.2pt" }}>Every option is offered only where the manufacturing partner for your order supports it, and is confirmed on your sample before production.</p>

        <p className="k" style={{ marginTop: "9mm" }}>Three ways to start a private-label product</p>
        <div style={{ marginTop: "3mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4mm" }}>
          {[
            ["01", "Match a towel you sell now", "Send it to us. We record its weight, size, construction and finish as the starting specification."],
            ["02", "Improve on a reference", "Send a competitor’s product or a photo, and tell us what to change: weight, feel, colour, price point."],
            ["03", "Start from a brief", `Use the specification builder at ${site.domain}/specification, or answer our questions by email.`],
          ].map(([k, t, d]) => (
            <div key={k} className="box">
              <p className="k" style={{ color: "#a14a2a" }}>{k}</p>
              <p className="h3" style={{ marginTop: "1.5mm", fontSize: "10.2pt" }}>{t}</p>
              <p className="muted" style={{ marginTop: "1.5mm", fontSize: "8.3pt" }}>{d}</p>
            </div>
          ))}
        </div>
        <Foot n={++n} label="Private label" />
      </section>

      {/* ── Labels & packaging ───────────────────────────── */}
      <section className="sheet white">
        <p className="k">Labels, packaging & artwork</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>Shelf-ready details, agreed before the sample.</h2>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "70mm 1fr", gap: "8mm" }}>
          <Photo src="/images/folded-stack.jpg" h="86mm" />
          <div>
            <p className="k">Packaging formats</p>
            <ul style={{ marginTop: "2mm" }}>{packagingFormats.map((x) => <li key={x} className="rule" style={{ padding: "1.7mm 0" }}>{x}</li>)}</ul>
          </div>
        </div>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
          <div>
            <p className="k">U.S. labelling points we cover with you</p>
            <ul style={{ marginTop: "2mm" }}>{usLabelling.map((x) => <li key={x} className="rule" style={{ padding: "2mm 0" }}>{x}</li>)}</ul>
            <p className="muted" style={{ marginTop: "2mm", fontSize: "7.6pt" }}>General guidance to help plan your labels. Responsibility for your product’s compliance stays with the importer of record.</p>
          </div>
          <div>
            <p className="k">What to send for artwork</p>
            <ul style={{ marginTop: "2mm" }}>{artworkChecklist.map((x) => <li key={x} className="rule" style={{ padding: "2mm 0" }}>— {x}</li>)}</ul>
          </div>
        </div>
        <Foot n={++n} label="Labels & packaging" />
      </section>

      {/* ── Samples & quotations ─────────────────────────── */}
      <section className="sheet">
        <p className="k">Samples & quotations</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>Hold the towel before you commit to an order.</h2>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "1fr 76mm", gap: "8mm" }}>
          <div>
            <p className="lead">Every new product starts with a physical sample made to your written specification. Wash it, weigh it, measure it and use it. Ask for changes, or stop there.</p>
            <ol style={{ marginTop: "5mm" }}>
              {[
                ["Request", "Send the reference, or your brief, and a delivery address."],
                ["Confirm", "We confirm sample cost, timing and courier in writing before anything is made."],
                ["Evaluate", "Test it your way. We record your feedback in the specification."],
                ["Approve", "The approved sample becomes the production reference and is kept on file."],
              ].map(([t, d], i) => (
                <li key={t} className="rule" style={{ padding: "2.6mm 0", display: "grid", gridTemplateColumns: "9mm 1fr" }}>
                  <span className="k" style={{ color: "#a14a2a" }}>0{i + 1}</span>
                  <span><b style={{ fontWeight: 500 }}>{t}.</b> <span className="muted">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <Photo src="/images/sample-pair.jpg" h="82mm" />
        </div>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
          <div className="box">
            <p className="k">Your quotation is based on</p>
            <p style={{ marginTop: "2mm", fontSize: "8.6pt" }}>Fibre and yarn, weight, size, construction, colour, branding, packaging, quantity per size and colour, and destination. We quote only once a suitable manufacturing partner has confirmed the specification.</p>
          </div>
          <div className="box">
            <p className="k">It states, in writing</p>
            <ul style={{ marginTop: "2mm", fontSize: "8.6pt" }}>
              {["Price per piece for the specified quantity", "Minimum order for that specification", "Sample cost and timing", "Production timing from approval", "Incoterms and payment terms"].map((x) => <li key={x}>— {x}</li>)}
            </ul>
          </div>
        </div>
        <Foot n={++n} label="Samples & quotations" />
      </section>

      {/* ── Quality ──────────────────────────────────────── */}
      <section className="sheet white">
        <p className="k">Quality assurance</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>Checked against your approved sample — not a general standard.</h2>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "1fr 66mm", gap: "8mm" }}>
          <div>
            <p className="k">What is checked before shipment</p>
            <ul style={{ marginTop: "2mm" }}>
              {qcCheckpoints.map((q) => <li key={q.k} className="rule" style={{ padding: "1.8mm 0", display: "grid", gridTemplateColumns: "26mm 1fr" }}><b style={{ fontWeight: 500 }}>{q.k}</b><span className="muted">{q.d}</span></li>)}
            </ul>
          </div>
          <Photo src="/images/detail-terry.jpg" h="78mm" />
        </div>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4mm" }}>
          {[
            ["Before production", "The check plan — what is checked, when and by whom — is agreed in writing with you."],
            ["During production", "The manufacturing partner performs in-line checks; we follow up and record results."],
            ["Before shipment", "A check against your specification and sample. Third-party inspection when you arrange or request one."],
          ].map(([t, d]) => (
            <div key={t} className="box"><p className="h3" style={{ fontSize: "10pt" }}>{t}</p><p className="muted" style={{ marginTop: "1.5mm", fontSize: "8.3pt" }}>{d}</p></div>
          ))}
        </div>
        <div className="rule" style={{ marginTop: "8mm", paddingTop: "4mm" }}>
          <p className="k">Certifications</p>
          <p style={{ marginTop: "2mm", fontSize: "8.6pt", maxWidth: "170mm" }}>
            {credentials.length
              ? `Verified partner credentials: ${credentials.map((x) => `${x.name} (held by ${x.holder}, scope: ${x.scope})`).join("; ")}.`
              : "Certificates are held by manufacturing partners for specific facilities and scopes — not by WeaveSources. None are published in this edition. Tell us the standard you need and we will only propose partners who can evidence it, with the certificate for you to verify with the issuer."}
          </p>
        </div>
        <Foot n={++n} label="Quality" />
      </section>

      {/* ── How to order ─────────────────────────────────── */}
      <section className="sheet">
        <p className="k">How to order</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "165mm" }}>From first message to shipment, each step visible to you.</h2>
        <ol style={{ marginTop: "6mm", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "8mm" }}>
          {orderSteps.map((s) => (
            <li key={s.n} className="rule" style={{ padding: "2.6mm 0", display: "grid", gridTemplateColumns: "9mm 1fr" }}>
              <span className="k" style={{ color: "#a14a2a" }}>{s.n}</span>
              <span><b style={{ fontWeight: 500 }}>{s.t}</b><br /><span className="muted" style={{ fontSize: "8.4pt" }}>{s.d}</span></span>
            </li>
          ))}
        </ol>
        <div className="box" style={{ marginTop: "7mm", background: "#fffdf9" }}>
          <p className="k">Your inquiry — the details that get you an accurate quote</p>
          <div style={{ marginTop: "2mm", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "8mm" }}>
            {inquiryFields.map((f) => (
              <div key={f.k} className="ln" style={{ display: "grid", gridTemplateColumns: "23mm 1fr", alignItems: "end", paddingBottom: "1mm", fontSize: "8.2pt" }}>
                <b style={{ fontWeight: 500 }}>{f.k}</b><span className="muted">{f.v}</span>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: "3mm", fontSize: "8pt" }}>Rough answers are fine. Missing details are what the specification stage is for.</p>
        </div>
        <div style={{ marginTop: "6mm" }}>
          <p className="k">What you receive in writing</p>
          <div className="chips" style={{ marginTop: "2mm" }}>{inWriting.map((x) => <span key={x} className="chip">{x}</span>)}</div>
        </div>
        <Foot n={++n} label="How to order" />
      </section>

      {/* ── Back cover / contact ─────────────────────────── */}
      <section className="sheet green">
        <Logo dark h="13mm" />
        <p className="k" style={{ marginTop: "40mm" }}>Next step</p>
        <h2 className="h1" style={{ marginTop: "5mm", fontSize: "34pt", maxWidth: "160mm" }}>Send us your requirements. We’ll reply within one business day.</h2>
        <p style={{ marginTop: "6mm", fontSize: "11pt", maxWidth: "150mm" }} className="muted">Tell us the product, quantity and destination. We’ll come back with questions, a specification and a path to a sample.</p>
        <div style={{ marginTop: "14mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10mm", fontSize: "10.5pt", lineHeight: 1.6 }}>
          <div>
            <p className="k">Contact</p>
            <div style={{ marginTop: "2mm" }}>{contactLines()}</div>
            <p style={{ marginTop: "2mm" }}>{site.domain}/contact</p>
          </div>
          <div>
            <p className="k">Offices</p>
            {site.offices.map((o) => <p key={o.name} style={{ marginTop: "2mm" }}><b style={{ fontWeight: 500 }}>{o.name}</b><br /><span className="muted" style={{ fontSize: "9.5pt" }}>{o.lines.join(", ")}</span></p>)}
          </div>
        </div>
        <p className="muted rule" style={{ position: "absolute", left: "17mm", right: "17mm", bottom: "18mm", paddingTop: "4mm", fontSize: "7.6pt" }}>
          WeaveSources is a sourcing company; products are made by independent manufacturing partners in Pakistan. Images are illustrative. Specifications, minimum order quantities, sample terms, prices, lead times and compliance documents are confirmed in writing for each order. {pack.edition}.
        </p>
        <Foot n={++n} label="Contact" />
      </section>

      <script dangerouslySetInnerHTML={{ __html: qaScript }} />
    </div>
  );
}
