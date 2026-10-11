/**
 * Pakistan's towel export markets — NATIONAL trade statistics.
 *
 * These figures describe Pakistan's exports as a country. They are not
 * WeaveSources' sales, customers or shipments, and must never be presented
 * as such.
 *
 * Source: UN Comtrade Database (comtradeplus.un.org), reporter Pakistan,
 * trade flow Export, HS 2017 code 630260 — toilet linen and kitchen linen, of
 * terry towelling or similar terry fabrics, of cotton. Calendar year 2023,
 * values in current US dollars (FOB as reported). Retrieved October 2026.
 *
 * To update: query the same reporter / flow / code for a newer year and
 * replace `year`, `world` and `markets`.
 */

export const tradeSource = {
  name: "UN Comtrade Database",
  url: "https://comtradeplus.un.org/",
  reporter: "Pakistan",
  flow: "Exports",
  hs: "630260",
  hsLabel: "Toilet and kitchen linen, of cotton terry towelling",
  year: 2023,
  retrieved: "October 2026",
};

/** US$ millions */
export const worldTotal = 1005.6;

export const markets: { country: string; code: string; value: number; focus?: boolean }[] = [
  { country: "United States", code: "US", value: 337.0, focus: true },
  { country: "United Kingdom", code: "GB", value: 102.4 },
  { country: "Netherlands", code: "NL", value: 86.0 },
  { country: "Italy", code: "IT", value: 66.2 },
  { country: "Spain", code: "ES", value: 53.6 },
  { country: "France", code: "FR", value: 48.8 },
  { country: "Germany", code: "DE", value: 44.1 },
];

export const share = (v: number) => (v / worldTotal) * 100;
