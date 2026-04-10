import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !industry) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate brief submission delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
      toast.success(
        "Your audit request has been submitted! I'll be in touch soon.",
      );
      setName("");
      setEmail("");
      setIndustry("");
      setMessage("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: "transparent" }}>
      {/* Page header */}
      <div
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderBottom: "1px solid rgba(0,255,255,0.1)",
        }}
      >
        <h1
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          style={{
            letterSpacing: "-0.02em",
            textShadow: "0 1px 12px rgba(0,0,0,0.8)",
          }}
        >
          Book Your Free Audit
        </h1>
        <p
          className="text-lg max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          I&rsquo;ll personally review your workflow &mdash; and hand you a
          custom Automation Roadmap, free.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 60/40 split on desktop, stacked on mobile */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
          {/* LEFT — Headshot + Live Status (40%) */}
          <div className="w-full md:w-2/5 flex flex-col items-center md:items-start gap-6 md:sticky md:top-28">
            {/* Headshot */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                style={{ background: "rgba(0,255,255,0.4)" }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "2px solid rgba(0,255,255,0.25)",
                  boxShadow:
                    "0 0 20px rgba(0,255,255,0.1), 0 24px 48px rgba(0,0,0,0.5)",
                  width: "100%",
                  maxWidth: "340px",
                  aspectRatio: "3 / 4",
                }}
              >
                <img
                  src="/assets/images/headshot.png"
                  alt="Mark Darren Bereber"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const fb = t.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full absolute inset-0 items-center justify-center text-center p-6"
                  style={{
                    display: "none",
                    background: "rgba(0,0,0,0.6)",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                  }}
                >
                  Mark Darren Bereber
                </div>
              </div>
            </div>

            {/* Live Status indicator */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              data-ocid="contact.panel"
            >
              {/* Pulsing green dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                <div
                  className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ background: "rgba(34,197,94,0.5)" }}
                />
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "#22c55e" }}>
                  Active now
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Usually responds in 2 hours
                </p>
              </div>
            </div>

            {/* Short credibility copy */}
            <div className="text-left max-w-xs">
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}
              >
                I read every submission personally. Before we talk, I&rsquo;ll
                have already reviewed your workflow and prepared specific
                questions &mdash; so our call is sharp, focused, and worth every
                minute of your time.
              </p>
            </div>
          </div>

          {/* RIGHT — Booking form (60%) */}
          <div className="w-full md:w-3/5">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,255,255,0.12)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-white">
                Request Your Free Audit
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Fill this out &mdash; I&rsquo;ll review it and reach out to
                schedule your session.
              </p>

              {submitted ? (
                <div
                  className="rounded-xl p-8 text-center"
                  style={{
                    background: "rgba(0,255,255,0.06)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  data-ocid="contact.success_state"
                >
                  <CheckCircle
                    size={40}
                    className="mx-auto mb-3"
                    style={{ color: "#00FFFF" }}
                  />
                  <h4 className="font-bold text-lg mb-2 text-white">
                    Request Sent!
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    I&rsquo;ll review your workflow details and reach out within
                    24 hours to schedule your audit.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  data-ocid="contact.panel"
                >
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      Full Name{" "}
                      <span style={{ color: "rgba(239,68,68,0.8)" }}>*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      data-ocid="contact.input"
                      style={{
                        borderColor: "rgba(0,255,255,0.2)",
                        background: "rgba(0,255,255,0.04)",
                        color: "white",
                      }}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      Email Address{" "}
                      <span style={{ color: "rgba(239,68,68,0.8)" }}>*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-ocid="contact.input"
                      style={{
                        borderColor: "rgba(0,255,255,0.2)",
                        background: "rgba(0,255,255,0.04)",
                        color: "white",
                      }}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="contact-task"
                      className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      What&rsquo;s the #1 manual task killing your team&rsquo;s
                      week?{" "}
                      <span style={{ color: "rgba(239,68,68,0.8)" }}>*</span>
                    </Label>
                    <Textarea
                      id="contact-task"
                      placeholder="e.g. Manually copying orders into our CRM every morning, responding to the same FAQ emails, building weekly reports from multiple spreadsheets..."
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      required
                      rows={4}
                      data-ocid="contact.textarea"
                      style={{
                        borderColor: "rgba(0,255,255,0.2)",
                        background: "rgba(0,255,255,0.04)",
                        color: "white",
                        resize: "none",
                      }}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-semibold mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      Anything else you&rsquo;d like me to know?{" "}
                      <span
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontWeight: 400,
                        }}
                      >
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Your business type, team size, tools you're currently using..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      data-ocid="contact.textarea"
                      style={{
                        borderColor: "rgba(0,255,255,0.2)",
                        background: "rgba(0,255,255,0.04)",
                        color: "white",
                        resize: "none",
                      }}
                      className="placeholder:text-white/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 disabled:opacity-60"
                    style={{
                      border: "1px solid rgba(0,255,255,0.4)",
                      background: "rgba(0,255,255,0.08)",
                      color: "#00FFFF",
                      boxShadow: "0 0 20px rgba(0,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                    data-ocid="contact.submit_button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <ArrowRight size={16} />
                        Request My Free Audit
                      </>
                    )}
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    No spam. No sales pitch. Just a focused audit and a roadmap
                    you can act on immediately.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
