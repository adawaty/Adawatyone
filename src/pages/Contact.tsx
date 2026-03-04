/*
Cairo Circuit Futurism — Contact
- Local-only form (no backend). On submit: toast.
*/

import SiteLayout from "@/components/SiteLayout";
import SeoHead from "@/components/SeoHead";
import { site, services } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [service, setService] = useState<string | undefined>(undefined);

  return (
    <SiteLayout
      title="Contact"
      subtitle="Tell us what you want to launch or improve. We’ll reply with a clear next step and a DFY scope proposal."
    >
      <SeoHead
        title={`Contact | ${site.name}`}
        description="Request a DFY scope for Brand → Build → Demand. Get a clear next step and a sprint plan."
        path="/contact"
        type="website"
      />
      <section className="pt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="glass rounded-2xl p-7 lg:col-span-2">
            <form
              className="grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message received (demo)", {
                  description:
                    "This is a static site. Connect a real form endpoint when you deploy.",
                });
                (e.currentTarget as HTMLFormElement).reset();
                setService(undefined);
              }}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required autoComplete="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+20 …"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">Interested in</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger id="service" className="bg-white/3 border-white/10">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="service" value={service ?? ""} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="What are you launching or improving (brand, website, content, AI workflows)?"
                  className="min-h-32 bg-white/3 border-white/10"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg">
                  Send message
                </Button>
                <div className="text-xs text-muted-foreground">
                  Prefer email? Contact: <a className="underline hover:text-foreground" href="mailto:alazzeh.ml@gmail.com">alazzeh.ml@gmail.com</a>
                </div>
              </div>
            </form>
          </Card>

          <Card className="glass rounded-2xl p-7">
            <div className="text-lg font-semibold">Direct lines</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Add your official business contacts here (phone/WhatsApp/address).
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">Email</div>
                <a className="mt-1 block text-sm text-muted-foreground underline hover:text-foreground" href="mailto:alazzeh.ml@gmail.com">
                  alazzeh.ml@gmail.com
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">Phone</div>
                <div className="mt-1 text-sm text-muted-foreground">+20 10 0000 0000 (replace)</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <div className="text-sm font-semibold">Working hours</div>
                <div className="mt-1 text-sm text-muted-foreground">Sun–Thu, 9:00–18:00</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}
