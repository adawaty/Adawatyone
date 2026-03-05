import * as React from "react";
import { Html, Head, Body, Container, Heading, Text, Hr } from "@react-email/components";

export function LeadSubmissionEmail(props: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service_interest?: string | null;
  goal?: string | null;
  page_url?: string | null;
  lang?: string | null;
  created_at?: string | null;
}) {
  const p = props;
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#0b1220", color: "#e6eefb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ maxWidth: 640, margin: "0 auto", padding: "24px" }}>
          <Heading style={{ margin: 0, fontSize: 22 }}>
            New lead — {p.name}
          </Heading>
          <Text style={{ marginTop: 8, opacity: 0.85 }}>Adawaty funnel submission</Text>
          <Hr style={{ borderColor: "#1f2b44", margin: "16px 0" }} />

          <Text>
            <strong>Name:</strong> {p.name}
            <br />
            <strong>Email:</strong> {p.email}
            <br />
            <strong>Phone:</strong> {p.phone || "-"}
            <br />
            <strong>Company:</strong> {p.company || "-"}
            <br />
            <strong>Service:</strong> {p.service_interest || "-"}
            <br />
            <strong>Goal:</strong> {p.goal || "-"}
            <br />
            <strong>Page:</strong> {p.page_url || "-"}
            <br />
            <strong>Lang:</strong> {p.lang || "-"}
            <br />
            <strong>Created:</strong> {p.created_at || "-"}
          </Text>

          <Hr style={{ borderColor: "#1f2b44", margin: "16px 0" }} />
          <Text style={{ fontSize: 12, opacity: 0.7 }}>
            You’re receiving this because the lead funnel sent a notification.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default LeadSubmissionEmail;
