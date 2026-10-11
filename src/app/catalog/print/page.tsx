/* eslint-disable @next/next/no-img-element -- plain <img> keeps the printed PDF free of lazy-loading and srcset surprises */
import type { Metadata } from "next";
import { visibleCategories, visibleProducts, productsIn, categoryOf, productImage, specRows, availabilityLabel, availabilityNote, CONFIRM } from "@/content/products";
import { orderSteps, qcCheckpoints, roles } from "@/content/process";
import { credentials, capabilities } from "@/content/partners";
import { markets, share, tradeSource } from "@/content/markets";
import { site } from "@/content/site";

/**
 * A4 print layout for the downloadable catalog. Not linked from the site;
 * scripts/make-catalog.sh prints it to public/catalog/*.pdf with headless
 * Chrome. Edit products in src/content/products.ts, then regenerate.
 */
export const metadata: Metadata = {
  title: "Product catalog (print layout)",
  robots: { index: false, follow: false },
  alternates: { canonical: "/catalog" },
};

const css = `
@page { size: A4; margin: 0; }
html, body { background: #fff !important; }
header, footer, .no-print, [href="#main"] { display: none !important; }
main { padding: 0 !important; }
.cat { -webkit-print-color-adjust: exact; print-color-adjust: exact; color: #1d1c1a; font-size: 9.5pt; line-height: 1.45; }
.sheet { width: 210mm; height: 297mm; padding: 16mm 16mm 14mm; position: relative; overflow: hidden; background: #f5f2ec; break-after: page; page-break-after: always; box-sizing: border-box; }
.sheet:last-child { break-after: auto; page-break-after: auto; }
.sheet.white { background: #fffdf9; }
@media screen { .cat { background: #555; padding: 24px 0; } .sheet { margin: 0 auto 24px; box-shadow: 0 10px 40px rgb(0 0 0 / .4); } }
.k { font-family: "IBM Plex Mono", monospace; font-size: 7pt; letter-spacing: .12em; text-transform: uppercase; color: #6f6a62; }
.h1 { font-size: 34pt; line-height: 1; font-weight: 500; letter-spacing: -.04em; }
.h2 { font-size: 21pt; line-height: 1.05; font-weight: 500; letter-spacing: -.03em; }
.h3 { font-size: 12.5pt; font-weight: 500; letter-spacing: -.015em; }
.muted { color: #6f6a62; }
.foot { position: absolute; left: 16mm; right: 16mm; bottom: 9mm; display: flex; justify-content: space-between; font-family: "IBM Plex Mono", monospace; font-size: 6.5pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; }
.rule { border-top: .3mm solid rgb(29 28 26 / .14); }
.img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tag { position: absolute; left: 3mm; top: 3mm; background: rgb(29 28 26 / .7); color: #f5f2ec; font-family: "IBM Plex Mono", monospace; font-size: 6pt; letter-spacing: .1em; text-transform: uppercase; padding: 1mm 2mm; border-radius: 10mm; }
table.spec { width: 100%; border-collapse: collapse; }
table.spec th, table.spec td { text-align: left; vertical-align: top; padding: 2.1mm 0; border-top: .25mm solid rgb(29 28 26 / .12); }
table.spec th { width: 44mm; font-family: "IBM Plex Mono", monospace; font-size: 6.8pt; letter-spacing: .08em; text-transform: uppercase; color: #6f6a62; font-weight: 400; padding-right: 4mm; }
table.spec td .t { display: block; color: #6f6a62; font-size: 8pt; margin-top: .6mm; }
.chip { display: inline-block; border: .25mm solid rgb(29 28 26 / .18); border-radius: 10mm; padding: .8mm 2.4mm; margin: 0 1.2mm 1.4mm 0; font-size: 8pt; }
`;

function Foot({ n, label }: { n: number; label: string }) {
  return (
    <div className="foot">
      <span>WeaveSources · {label}</span>
      <span>{site.domain} · {String(n).padStart(2, "0")}</span>
    </div>
  );
}

export default function Page() {
  let n = 1;
  const products = visibleProducts;
  const c = site.contact;
  return (
    <div className="cat">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* 1 · Cover */}
      <section className="sheet" style={{ padding: 0 }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img className="img" src="/images/category-hotel-hospitality-towels.jpg" alt="" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgb(245 242 236 / .96) 0%, rgb(245 242 236 / .9) 38%, rgb(245 242 236 / 0) 62%)" }} />
        </div>
        <div style={{ position: "relative", padding: "18mm 18mm 0" }}>
          <img src="/brand/weavesources-lockup.png" alt="WeaveSources" style={{ height: "15mm", width: "auto" }} />
          <p className="k" style={{ marginTop: "22mm" }}>Product catalog · {site.catalog.edition}</p>
          <h1 className="h1" style={{ marginTop: "5mm", fontSize: "40pt", maxWidth: "150mm" }}>Pakistani towels, sourced to your specification.</h1>
          <p style={{ marginTop: "7mm", fontSize: "12pt", maxWidth: "140mm", color: "#3d3a35" }}>
            Bath, hotel, spa, beach and kitchen towels and terry bathrobes from independent manufacturers in Pakistan — specified, sampled and checked for importers, hospitality suppliers and private-label brands.
          </p>
        </div>
        <div style={{ position: "absolute", left: "18mm", right: "18mm", bottom: "14mm", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
          <div style={{ background: "rgb(245 242 236 / .92)", borderRadius: "3mm", padding: "4mm 5mm", fontSize: "9pt" }}>
            <p style={{ fontWeight: 500 }}>{site.domain}</p>
            {c.email && <p>{c.email}</p>}
            {c.lines.map((l) => <p key={l.digits}>{l.region} · {l.display}</p>)}
          </div>
          <p className="tag" style={{ position: "static" }}>Images are illustrative</p>
        </div>
      </section>

      {/* 2 · Sourcing model */}
      <section className="sheet white">
        <p className="k">01 · About WeaveSources</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "160mm" }}>Your sourcing partner for Pakistani towels.</h2>
        <p style={{ marginTop: "6mm", fontSize: "11pt", maxWidth: "165mm", color: "#3d3a35" }}>{site.description}</p>
        <p style={{ marginTop: "4mm", maxWidth: "165mm", color: "#3d3a35" }}>
          We do not own factories. We work on the buyer&apos;s side of the order: matching your product to suitable independent manufacturers, writing a specification with tolerances, coordinating a sample for your approval, checking production against it, and planning packing and export. You are told which partner makes your order.
        </p>
        <div style={{ marginTop: "10mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4mm" }}>
          {roles.map((r) => (
            <div key={r.key} style={{ background: r.key === "us" ? "#1d1c1a" : "#ece6db", color: r.key === "us" ? "#f5f2ec" : "#1d1c1a", borderRadius: "3mm", padding: "5mm" }}>
              <p className="k" style={{ color: r.key === "us" ? "rgb(245 242 236 / .6)" : undefined }}>{r.sub}</p>
              <p className="h3" style={{ marginTop: "1.5mm" }}>{r.label}</p>
              <ul style={{ marginTop: "2.5mm" }}>{r.does.map((x) => <li key={x}>— {x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "10mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
          <div>
            <p className="k">Offices</p>
            {site.offices.map((o) => <p key={o.name} style={{ marginTop: "2mm" }}><b style={{ fontWeight: 500 }}>{o.name}</b> — {o.lines.join(", ")}</p>)}
          </div>
          <div>
            <p className="k">About this catalog</p>
            <p style={{ marginTop: "2mm" }} className="muted">Images are illustrative styling and editorial illustrations, not photographs of specific partner facilities or production lots. No prices, stock levels, minimums or certifications are stated unless confirmed; such values are agreed during quotation.</p>
          </div>
        </div>
        <Foot n={++n} label="Sourcing model" />
      </section>

      {/* 3 · Process */}
      <section className="sheet">
        <p className="k">02 · How an order works</p>
        <h2 className="h2" style={{ marginTop: "4mm" }}>Eight steps, each one visible to you.</h2>
        <ol style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "8mm" }}>
          {orderSteps.map((s) => (
            <li key={s.n} className="rule" style={{ padding: "3.5mm 0", display: "grid", gridTemplateColumns: "9mm 1fr" }}>
              <span className="k" style={{ color: "#a14a2a" }}>{s.n}</span>
              <span><b className="h3" style={{ fontSize: "10.5pt" }}>{s.t}</b><br /><span className="muted">{s.d}</span></span>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm" }}>
          <div>
            <p className="k">Checked against your approved sample</p>
            <ul style={{ marginTop: "2mm" }}>
              {qcCheckpoints.map((q) => <li key={q.k} className="rule" style={{ padding: "1.6mm 0" }}><b style={{ fontWeight: 500 }}>{q.k}</b> <span className="muted">— {q.d}</span></li>)}
            </ul>
          </div>
          <div>
            <div style={{ position: "relative", height: "62mm", borderRadius: "3mm", overflow: "hidden" }}>
              <img className="img" src="/images/mfg-quality-inspection.jpg" alt="" />
              <span className="tag">Illustration</span>
            </div>
            <p className="muted" style={{ marginTop: "3mm", fontSize: "8.5pt" }}>
              The check plan — what is checked, when and by whom — is agreed in writing before production. Laboratory tests and third-party inspections are not included by default; where needed, the method and lab are agreed with you.
            </p>
          </div>
        </div>
        <Foot n={++n} label="Process & quality" />
      </section>

      {/* 4 · Categories */}
      <section className="sheet white">
        <p className="k">03 · Product categories</p>
        <h2 className="h2" style={{ marginTop: "4mm" }}>{visibleProducts.length} products in {visibleCategories.length} categories.</h2>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6mm" }}>
          {visibleCategories.map((cat) => (
            <div key={cat.slug} style={{ display: "grid", gridTemplateColumns: "30mm 1fr", gap: "4mm" }}>
              <div style={{ height: "38mm", borderRadius: "2.5mm", overflow: "hidden" }}><img className="img" src={`/images/${cat.image}`} alt="" /></div>
              <div>
                <p className="k" style={{ color: cat.availability === "active" ? "#1e3f2c" : undefined }}>{availabilityLabel[cat.availability]}</p>
                <p className="h3" style={{ marginTop: "1mm" }}>{cat.name}</p>
                <p className="muted" style={{ marginTop: "1mm", fontSize: "8.5pt" }}>{cat.short}</p>
                <p style={{ marginTop: "1.5mm", fontSize: "8.5pt" }}>{productsIn(cat.slug).map((p) => p.name).join(" · ")}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rule" style={{ marginTop: "9mm", paddingTop: "4mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8mm", fontSize: "8.5pt" }}>
          <p><b style={{ fontWeight: 500 }}>{availabilityLabel.active}.</b> <span className="muted">{availabilityNote.active}</span></p>
          <p><b style={{ fontWeight: 500 }}>{availabilityLabel.enquiry}.</b> <span className="muted">{availabilityNote.enquiry.replace(/^Sourced on enquiry: /, "")}</span></p>
        </div>
        <Foot n={++n} label="Categories" />
      </section>

      {/* Product pages */}
      {products.map((p) => {
        const cat = categoryOf(p);
        return (
          <section key={p.slug} className="sheet">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="k">{cat.name}</p>
              <p className="k">Ref. {p.sku} · {availabilityLabel[cat.availability]}</p>
            </div>
            <div style={{ marginTop: "5mm", display: "grid", gridTemplateColumns: "78mm 1fr", gap: "8mm" }}>
              <div style={{ position: "relative", height: "96mm", borderRadius: "3mm", overflow: "hidden" }}>
                <img className="img" src={productImage(p)} alt="" />
                <span className="tag">Illustrative styling</span>
              </div>
              <div>
                <h2 className="h2">{p.name}</h2>
                <p style={{ marginTop: "2mm", fontSize: "11pt" }} className="muted">{p.short}</p>
                <p style={{ marginTop: "4mm", color: "#3d3a35" }}>{p.intro}</p>
                <p className="k" style={{ marginTop: "5mm" }}>Use</p>
                <p style={{ marginTop: "1mm" }}>{p.useCase}</p>
                <p className="k" style={{ marginTop: "4mm" }}>Often specified by</p>
                <p style={{ marginTop: "1mm" }}>{p.buyers.join(" · ")}</p>
              </div>
            </div>
            <table className="spec" style={{ marginTop: "7mm" }}>
              <tbody>
                {specRows(p, site.terms).map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td>
                      {r.v ?? r.always ?? CONFIRM}
                      {r.typical && !r.v && <span className="t">Commonly specified: {r.typical}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted" style={{ marginTop: "4mm", fontSize: "7.5pt" }}>
              “Commonly specified” values are industry reference points, not a WeaveSources offer. {p.typical.notes}
            </p>
            <Foot n={++n} label={p.name} />
          </section>
        );
      })}

      {/* Customisation, packaging & export */}
      <section className="sheet white">
        <p className="k">04 · Customisation & private label</p>
        <h2 className="h2" style={{ marginTop: "4mm" }}>Your brand on it. Every option confirmed on the sample.</h2>
        <div style={{ marginTop: "7mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5mm" }}>
          {[
            ["Logos", "Embroidered, woven or jacquard — depending on product and volume."],
            ["Labels", "Brand, care, size and country-of-origin labels; swing tags; barcodes."],
            ["Colour", "Dyed to your reference or Pantone; yarn-dyed stripes for beach and kitchen."],
            ["Construction", "Border style, pile, size, hem and set composition."],
            ["Packaging", "Bulk carton, bundled, poly-bagged, retail-ready or gift-boxed."],
            ["Artwork", "Packaging and label artwork approved before production."],
          ].map(([k, v]) => (
            <div key={k} className="rule" style={{ paddingTop: "3mm" }}>
              <p className="h3" style={{ fontSize: "10.5pt" }}>{k}</p>
              <p className="muted" style={{ marginTop: "1mm" }}>{v}</p>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: "4mm", fontSize: "8.5pt" }}>Options are offered only where the manufacturing partner for your order supports them.</p>

        <p className="k" style={{ marginTop: "11mm" }}>05 · Packaging & export coordination</p>
        <div style={{ marginTop: "4mm", display: "grid", gridTemplateColumns: "1fr 76mm", gap: "8mm" }}>
          <div>
            <p style={{ color: "#3d3a35" }}>Goods are packed and marked as specified, then handed to your forwarder or ours on the Incoterms agreed per order. Each shipment comes with the documents its destination requires — typically a commercial invoice, packing list and transport document, plus a certificate of origin and the pre-shipment check report where required.</p>
            <p className="k" style={{ marginTop: "6mm" }}>Pakistan’s cotton terry towel exports, {tradeSource.year}</p>
            <ul style={{ marginTop: "2mm" }}>
              {markets.slice(0, 5).map((m) => (
                <li key={m.code} style={{ display: "grid", gridTemplateColumns: "30mm 1fr 26mm", alignItems: "center", gap: "2mm", padding: "1mm 0" }}>
                  <span style={{ fontWeight: m.focus ? 500 : 400 }}>{m.country}</span>
                  <span style={{ height: "3mm", width: `${(m.value / markets[0].value) * 100}%`, background: m.focus ? "#1e3f2c" : "#b9af9f", borderRadius: "0 1mm 1mm 0" }} />
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "7.5pt" }}>US${m.value.toFixed(0)}M · {share(m.value).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ marginTop: "2mm", fontSize: "7pt" }}>Source: {tradeSource.name}, reporter {tradeSource.reporter}, exports, HS {tradeSource.hs}, {tradeSource.year}. National statistics — not WeaveSources’ sales or customers.</p>
          </div>
          <div style={{ position: "relative", height: "92mm", borderRadius: "3mm", overflow: "hidden" }}>
            <img className="img" src="/images/mfg-packing-and-export.jpg" alt="" />
            <span className="tag">Illustration</span>
          </div>
        </div>
        <Foot n={++n} label="Customisation & export" />
      </section>

      {/* Partners & credentials */}
      <section className="sheet">
        <p className="k">06 · Manufacturing partners & credentials</p>
        <h2 className="h2" style={{ marginTop: "4mm" }}>Independent manufacturers. Their credentials, not ours.</h2>
        <p style={{ marginTop: "5mm", maxWidth: "165mm", color: "#3d3a35" }}>
          Products are made by independent manufacturing companies in Pakistan. We tell you which partner makes your order before production. Certificates are held by those companies for specific facilities and scopes; a supplier’s certificate does not certify WeaveSources or every product it makes.
        </p>
        <div style={{ marginTop: "7mm", background: "#fffdf9", borderRadius: "3mm", padding: "6mm" }}>
          <p className="k">Verified partner credentials</p>
          {credentials.length ? (
            <ul style={{ marginTop: "3mm" }}>
              {credentials.map((x) => (
                <li key={x.id} className="rule" style={{ padding: "2.5mm 0" }}>
                  <b style={{ fontWeight: 500 }}>{x.name}</b> — held by {x.holder}; issued by {x.issuer}{x.reference ? `, ref. ${x.reference}` : ""}. Scope: {x.scope}. Facility: {x.facility}. Valid {x.validFrom ?? "—"} to {x.validUntil ?? "—"}. Verify: {x.verification}.
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: "3mm" }}>No partner certificates are published in this edition. Relevant partner documentation can be discussed and provided for the specific products and facilities in your order. Tell us the standard you need and we will only propose partners who can evidence it.</p>
          )}
        </div>
        <p className="k" style={{ marginTop: "9mm" }}>Processes coordinated through the partner network</p>
        <table className="spec" style={{ marginTop: "2mm" }}>
          <tbody>
            {capabilities.map((x) => (
              <tr key={x.key}>
                <th scope="row">{x.name}</th>
                <td>{x.detail}<span className="t">{x.verified ? "Verified at an active partner" : "Confirmed per order before quotation"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Foot n={++n} label="Partners & credentials" />
      </section>

      {/* Contact */}
      <section className="sheet white">
        <p className="k">07 · Request a quote or sample</p>
        <h2 className="h2" style={{ marginTop: "4mm", maxWidth: "160mm" }}>Tell us the product, quantity and destination.</h2>
        <div style={{ marginTop: "8mm", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10mm" }}>
          <div>
            <p className="k">Include in your inquiry</p>
            <ul style={{ marginTop: "2mm" }}>
              {["Product and catalog reference (e.g. WS-HT-01)", "Use — hotel, retail, spa, gym, kitchen…", "Target size, weight (GSM) and colour, or a towel to match", "Branding and packaging", "Estimated quantity or annual requirement", "Destination country and port", "Any compliance documents or test standards you need"].map((x) => (
                <li key={x} className="rule" style={{ padding: "2mm 0" }}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="k">Contact</p>
            <div style={{ marginTop: "2mm", fontSize: "11pt", lineHeight: 1.6 }}>
              <p style={{ fontWeight: 500 }}>{site.url.replace("https://", "")}/contact</p>
              {c.email && <p>{c.email}</p>}
              {c.lines.map((l) => <p key={l.digits}>{l.region}: {l.display}{l.whatsapp ? " (phone & WhatsApp)" : ""}</p>)}
            </div>
            <p className="muted" style={{ marginTop: "3mm" }}>{c.hours}.</p>
            <p className="k" style={{ marginTop: "7mm" }}>Offices</p>
            {site.offices.map((o) => <p key={o.name} style={{ marginTop: "1.5mm" }}>{o.name}: {o.lines.join(", ")}</p>)}
          </div>
        </div>
        <div className="rule" style={{ marginTop: "12mm", paddingTop: "4mm" }}>
          <p className="muted" style={{ fontSize: "8pt" }}>
            WeaveSources is a sourcing company. Products are manufactured by independent manufacturing partners. Images in this catalog are illustrative. Specifications, minimum order quantities, sample terms, prices and compliance documentation are confirmed in writing for each order. {site.catalog.edition}.
          </p>
        </div>
        <Foot n={++n} label="Contact" />
      </section>
    </div>
  );
}
