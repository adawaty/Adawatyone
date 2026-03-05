import { render } from "@react-email/render";
import { Resend } from "resend";
import LeadSubmissionEmail from "../emails/LeadSubmissionEmail";

export async function sendLeadEmail(payload: {
  to: string;
  subject: string;
  lead: {
    name: string;
    email: string;
    phone?: string | null;
    company?: string | null;
    service_interest?: string | null;
    goal?: string | null;
    page_url?: string | null;
    lang?: string | null;
    created_at?: string | null;
  };
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "Adawaty <no-reply@adawaty.one>";

  if (!apiKey) {
    // Keep request successful even if email isn't configured.
    return { ok: false, error: "missing_RESEND_API_KEY" } as const;
  }

  const resend = new Resend(apiKey);

  const html = await render(
    LeadSubmissionEmail({
      ...payload.lead,
    })
  );

  const r = await resend.emails.send({
    from,
    to: payload.to,
    subject: payload.subject,
    html,
  });

  return { ok: true, id: (r as any)?.data?.id ?? null } as const;
}
