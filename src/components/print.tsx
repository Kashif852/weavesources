/* eslint-disable @next/next/no-img-element -- plain <img> keeps printed PDFs free of lazy-loading and srcset surprises */

/**
 * Shared pieces for the buyer-pack print layouts (/print/catalog and
 * /print/presentation). These pages are rendered to PDF by
 * scripts/make-buyer-pack.sh; they are not linked from the site.
 */

export const printBase = `
html, body { background: #fff !important; }
header, footer, .no-print, [href="#main"] { display: none !important; }
main { padding: 0 !important; }
.pk { -webkit-print-color-adjust: exact; print-color-adjust: exact; color: #1d1c1a; line-height: 1.45; font-feature-settings: "ss01", "cv11"; }
.pk * { box-sizing: border-box; }
.pk p, .pk h1, .pk h2, .pk h3, .pk ul, .pk ol { margin: 0; }
.pk ul, .pk ol { list-style: none; padding: 0; }
.sheet { position: relative; overflow: hidden; background: #f5f2ec; break-after: page; page-break-after: always; }
.sheet:last-of-type { break-after: auto; page-break-after: auto; }
.sheet.white { background: #fffdf9; }
.sheet.green { background: #1e3f2c; color: #f5f2ec; }
@media screen { .pk { background: #4a4a4a; padding: 24px 0; } .sheet { margin: 0 auto 24px; box-shadow: 0 10px 40px rgb(0 0 0 / .4); } }
.k { font-family: "IBM Plex Mono", monospace; letter-spacing: .12em; text-transform: uppercase; color: #6f6a62; }
.green .k { color: #c9b59c; }
.muted { color: #6f6a62; }
.green .muted { color: rgb(245 242 236 / .72); }
.rule { border-top: .3mm solid rgb(29 28 26 / .14); }
.green .rule { border-color: rgb(245 242 236 / .2); }
.ph { position: relative; overflow: hidden; background: #ece6db; }
.ph > img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tag { position: absolute; left: 2.5mm; bottom: 2.5mm; background: rgb(29 28 26 / .62); color: #f5f2ec; font-family: "IBM Plex Mono", monospace; font-size: 5.5pt; letter-spacing: .1em; text-transform: uppercase; padding: .8mm 2mm; border-radius: 10mm; }
.chip { display: inline-block; border: .25mm solid rgb(29 28 26 / .2); border-radius: 10mm; padding: .7mm 2.4mm; margin: 0 1.2mm 1.4mm 0; }
.green .chip { border-color: rgb(245 242 236 / .3); }
.dot { display: inline-block; width: 1.8mm; height: 1.8mm; border-radius: 50%; margin-right: 1.6mm; vertical-align: .2mm; }
`;

/** An image box that crops without distortion, with an honest label. */
export function Photo({ src, h, w = "100%", pos = "center", label = "Illustrative image", radius = "3mm", style }: { src: string; h: string; w?: string; pos?: string; label?: string | null; radius?: string; style?: React.CSSProperties }) {
  return (
    <div className="ph" style={{ height: h, width: w, borderRadius: radius, ...style }}>
      <img src={src} alt="" style={{ objectPosition: pos }} />
      {label && <span className="tag">{label}</span>}
    </div>
  );
}

export function Logo({ dark = false, h = "11mm" }: { dark?: boolean; h?: string }) {
  return <img src={dark ? "/brand/weavesources-lockup-on-dark.png" : "/brand/weavesources-lockup.png"} alt="WeaveSources" style={{ height: h, width: "auto", display: "block", alignSelf: "flex-start", objectFit: "contain" }} />;
}

/**
 * Layout self-check. Opened with ?check, the page lists every element that
 * spills outside its sheet or is clipped by a fixed-size box, in
 * <pre id="qa">. scripts/make-buyer-pack.sh reads it and fails on problems.
 */
export const qaScript = `
(function () {
  if (!/[?&]check/.test(location.search)) return;
  function run() {
    var out = [];
    document.querySelectorAll('.sheet').forEach(function (s, i) {
      var r = s.getBoundingClientRect();
      s.querySelectorAll('*').forEach(function (el) {
        if (el.closest('.ph') || el.dataset.bleed !== undefined) return;
        var b = el.getBoundingClientRect();
        if (!b.width || !b.height) return;
        var name = (el.textContent || el.tagName).trim().slice(0, 50);
        if (b.bottom > r.bottom + 0.5 || b.right > r.right + 0.5 || b.left < r.left - 0.5 || b.top < r.top - 0.5)
          out.push({ sheet: i + 1, issue: 'outside sheet', el: name });
        var cs = getComputedStyle(el);
        if (cs.overflow !== 'visible' && el.children.length && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) && el !== s)
          out.push({ sheet: i + 1, issue: 'clipped', el: name });
      });
      if (s.scrollHeight > s.clientHeight + 1) out.push({ sheet: i + 1, issue: 'sheet content taller than page', el: '' });
    });
    var imgs = Array.prototype.filter.call(document.images, function (im) { return !im.complete || !im.naturalWidth; }).map(function (im) { return im.src; });
    var pre = document.createElement('pre');
    pre.id = 'qa';
    pre.textContent = JSON.stringify({ sheets: document.querySelectorAll('.sheet').length, problems: out, brokenImages: imgs });
    document.body.appendChild(pre);
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(run, 300); });
})();
`;
