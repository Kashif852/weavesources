/**
 * Receives sample requests and sourcing briefs.
 * Forwards them as JSON to FORM_WEBHOOK_URL (Zapier, Make, Formspree, Slack, CRM…).
 * If no webhook is configured, it reports `not_configured` so the form can offer
 * an email / copy fallback instead of pretending the brief was received.
 */
const MAX_FIELD = 4000;

export async function POST(req: Request) {
  let body: { kind?: string; values?: Record<string, unknown>; company_website?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, drop silently.
  if (body.company_website) return Response.json({ ok: true });

  const kind = body.kind === "sample" ? "sample" : body.kind === "brief" ? "brief" : null;
  if (!kind || !body.values || typeof body.values !== "object") {
    return Response.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const values: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.values)) {
    if (typeof v === "string" && v.trim()) values[k.slice(0, 40)] = v.trim().slice(0, MAX_FIELD);
  }
  const email = values.email ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, reason: "invalid_email" }, { status: 422 });
  }

  const hook = process.env.FORM_WEBHOOK_URL;
  if (!hook) {
    console.warn(`[submit] FORM_WEBHOOK_URL not set — ${kind} from ${email} was NOT delivered.`);
    return Response.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "weavesources.com",
        kind,
        receivedAt: new Date().toISOString(),
        ...values,
      }),
    });
    if (!res.ok) throw new Error(`Webhook ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[submit] delivery failed", err);
    return Response.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  }
}
