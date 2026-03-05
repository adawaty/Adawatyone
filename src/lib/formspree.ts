/*
Formspree helper (static site)
- Configure via VITE_FORMSPREE_FORM_ID
- If not configured, caller can treat as "disabled"
*/

export function getFormspreeEndpoint(): string | null {
  const id = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;
  if (!id) return null;
  return `https://formspree.io/f/${id}`;
}

type SubmitLeadArgs = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceLabel: string;
  pageUrl: string;
  timestampIso: string;
  lang: string;
  subject: string;
};

export async function submitLeadToFormspree(args: SubmitLeadArgs): Promise<{ ok: boolean; status: number }> {
  const endpoint = getFormspreeEndpoint();
  if (!endpoint) return { ok: false, status: 0 };

  const bodyLines = [
    `Name: ${args.name}`,
    `Email: ${args.email}`,
    `Phone: ${args.phone || "-"}`,
    `Company: ${args.company || "-"}`,
    `Service: ${args.serviceLabel}`,
    `Lang: ${args.lang}`,
    `Page: ${args.pageUrl}`,
    `Time: ${args.timestampIso}`,
  ];

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: args.subject,
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      service: args.serviceLabel,
      pageUrl: args.pageUrl,
      timestamp: args.timestampIso,
      lang: args.lang,
      message: bodyLines.join("\n"),
    }),
  });

  return { ok: res.ok, status: res.status };
}
