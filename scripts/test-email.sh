#!/usr/bin/env bash
# Sends one real test submission through EmailJS, exactly as the form does.
#
# EmailJS's send endpoint is plain HTTP, so this needs no browser. It reads the
# same NEXT_PUBLIC_* values the form reads, from .env.local.
#
#   ./scripts/test-email.sh
#
# A 200 means EmailJS accepted it and the mail is on its way to whatever inbox
# the template delivers to. Anything else prints the API's own error text,
# which names the cause (bad template id, origin not on the allow-list, …).
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env.local ] || { echo "No .env.local — create it first (see .env.example)." >&2; exit 1; }
set -a; . ./.env.local; set +a

: "${NEXT_PUBLIC_EMAILJS_SERVICE_ID:?missing in .env.local}"
: "${NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:?missing in .env.local}"
: "${NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:?missing in .env.local}"

echo "==> Sending a test sample request through EmailJS"

# origin matters: EmailJS checks it against the dashboard allow-list.
ORIGIN="${1:-http://localhost:3000}"

body=$(cat <<JSON
{
  "service_id": "$NEXT_PUBLIC_EMAILJS_SERVICE_ID",
  "template_id": "$NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
  "user_id": "$NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
  "template_params": {
    "from_name": "Test Buyer",
    "from_email": "test@example.com",
    "from_number": "+1 555 0100",
    "subject": "TEST — Sample request (ignore)",
    "to_name": "WeaveSources",
    "message": "This is an automated test of the WeaveSources form integration.\n\nName: Test Buyer\nCompany: Test Co\nProduct: Hotel bath towels\nGSM: 550\nSize: 70 x 140 cm\nQuantity: 500 - 2,000 pcs"
  }
}
JSON
)

code=$(curl -s -o /tmp/emailjs_out.txt -w '%{http_code}' \
  -X POST https://api.emailjs.com/api/v1.0/email/send \
  -H 'Content-Type: application/json' \
  -H "origin: $ORIGIN" \
  -d "$body")

echo "HTTP $code"
if [ "$code" = "200" ]; then
  echo "==> Accepted. Check the inbox the template delivers to."
else
  echo "==> Rejected. EmailJS said:" >&2
  cat /tmp/emailjs_out.txt >&2; echo >&2
  echo "Common causes: wrong template id, or '$ORIGIN' not in EmailJS → Account → Security → allow-list." >&2
  exit 1
fi
