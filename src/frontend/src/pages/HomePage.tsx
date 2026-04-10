import { Link } from "@tanstack/react-router";
import { ArrowRight, Database, Filter, Magnet, Mail } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { BuildIcon, LaunchIcon, MapIcon } from "../components/HowItWorksIcons";
import { ROICalculator } from "../components/ROICalculator";
import { useInView } from "../hooks/useInView";

const HEADSHOT_URL = "/assets/images/headshot.png";

const masterStack = [
  "OpenAI",
  "Zapier",
  "Make",
  "GoHighLevel",
  "HubSpot",
  "Google Workspace",
  "Typeform",
  "Airtable",
  "Slack",
  "Notion",
];

const services = [
  {
    icon: Magnet,
    title: "Lead Generation Automation",
    desc: "I build multi-step lead capture flows that qualify, tag, and route prospects automatically. No manual follow-up. No missed opportunities.",
    caseStudyHref: "/case-studies#after-hours-shop-assistant",
  },
  {
    icon: Mail,
    title: "Email Marketing Systems",
    desc: "I architect behavioral email sequences that respond to what your customers actually do. Open rates go up. Unsubscribes go down.",
    caseStudyHref: "/case-studies#autonomous-sales-system",
  },
  {
    icon: Database,
    title: "CRM Architecture",
    desc: "I design and build custom CRM pipelines that give you a single source of truth for every client relationship.",
    caseStudyHref: "/case-studies#nexus-crm",
  },
  {
    icon: Filter,
    title: "Sales Funnel Automation",
    desc: "I map and automate your entire sales funnel — from first touch to closed deal — using conditional logic and behavioral triggers.",
    caseStudyHref: "/case-studies#executive-intelligence-pipeline",
  },
];

// ── Merged #process section data
const processSteps = [
  {
    phase: "Phase 01",
    title: "Leverage",
    icon: "map" as const,
    desc: "I start by mapping every manual task that's stealing your time. We identify the highest-ROI automations first.",
    result: "✓ Zero-effort workflow mapping",
  },
  {
    phase: "Phase 02",
    title: "Build",
    icon: "build" as const,
    desc: "I build the system — flows, triggers, logic. You see every step before I deploy.",
    result: "✓ Custom system live in days",
  },
  {
    phase: "Phase 03",
    title: "Profit",
    icon: "launch" as const,
    desc: "You get time back. Your team focuses on growth. The system runs 24/7 without you.",
    result: "✓ Revenue on autopilot",
  },
];

const iconMap = {
  map: MapIcon,
  build: BuildIcon,
  launch: LaunchIcon,
};

const showroomItems = [
  {
    slug: "after-hours-shop-assistant",
    title: "After-Hours Shop Assistant",
    tags: ["Lead Gen", "AI", "Zapier"],
    desc: "A 5-step Zapier automation that responds to after-hours DMs within 4 minutes using AI — eliminating missed leads.",
    metric: "100%",
    metricLabel: "After-Hours Coverage",
  },
  {
    slug: "executive-intelligence-pipeline",
    title: "Executive Intelligence Pipeline",
    tags: ["Reporting", "AI", "Dashboard"],
    desc: "An automated Monday morning brief that pulls live data from Stripe, HubSpot, and GA — synthesized by AI and delivered to Slack.",
    metric: "100%",
    metricLabel: "Automated Intelligence",
  },
  {
    slug: "autonomous-sales-system",
    title: "Autonomous Sales System",
    tags: ["Sales", "Inventory", "E-commerce"],
    desc: "A central inventory hub in Airtable that syncs all sales channels in 60 seconds — eliminating overselling and manual reconciliation.",
    metric: "0 hrs",
    metricLabel: "Manual Stock Updates",
  },
  {
    slug: "nexus-crm",
    title: "Nexus CRM",
    tags: ["CRM", "AI-Architecture", "Scalability"],
    desc: "A custom centralized CRM with automated client portal, relational DB, and smart CSV engine — cutting admin overhead by 40%.",
    metric: "40%",
    metricLabel: "Admin Overhead Reduced",
  },
];

const aboutTools = [
  "Zapier",
  "Make",
  "GoHighLevel",
  "Google Workspace",
  "HubSpot",
  "Typeform",
  "OpenAI",
];

const marqueeItems = [
  ...masterStack.map((t, i) => ({ id: `a-${i}`, name: t })),
  ...masterStack.map((t, i) => ({ id: `b-${i}`, name: t })),
];

function FadeSection({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TriggerSection({
  children,
  delay = 0,
  onEnter,
}: {
  children: React.ReactNode;
  delay?: number;
  onEnter?: () => void;
}) {
  const { ref, inView } = useInView();
  const firedRef = useRef(false);

  if (inView && !firedRef.current) {
    firedRef.current = true;
    onEnter?.();
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function HeadshotImage({ size = "md" }: { size?: "md" | "lg" }) {
  const [errored, setErrored] = useState(false);
  const wClass =
    size === "lg" ? "w-full max-w-xs sm:max-w-sm" : "w-64 h-80 sm:w-72 sm:h-96";

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div
          className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
          style={{ background: "rgba(0,255,255,0.4)" }}
        />
        <div
          className={`relative rounded-2xl overflow-hidden ${wClass}`}
          style={{
            border: "2px solid rgba(0,255,255,0.35)",
            boxShadow:
              "0 0 20px rgba(0,255,255,0.15), 0 24px 48px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            aspectRatio: size === "lg" ? "3/4" : undefined,
          }}
        >
          {!errored ? (
            <img
              src={HEADSHOT_URL}
              alt="Mark Darren Bereber"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setErrored(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-center p-6 text-sm"
              style={{
                background: "rgba(0,0,0,0.6)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Mark Darren Bereber
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Book Audit form (inline on homepage)
function BookAuditForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [task, setTask] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !task) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    setSending(false);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: "rgba(0,255,255,0.06)",
          border: "1px solid rgba(0,255,255,0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            background: "rgba(0,255,255,0.1)",
            border: "1px solid rgba(0,255,255,0.3)",
          }}
        >
          <ArrowRight size={20} style={{ color: "#00FFFF" }} />
        </div>
        <h4 className="font-bold text-lg mb-2 text-white">Request Sent!</h4>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          I'll review your details and reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      data-ocid="book_audit.panel"
    >
      <div>
        <label
          htmlFor="book-name"
          className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Your Name
        </label>
        <input
          id="book-name"
          type="text"
          placeholder="e.g. Maria Santos"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          data-ocid="book_audit.input"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 placeholder:text-white/25 text-white"
          style={{
            background: "rgba(0,255,255,0.04)",
            border: "1px solid rgba(0,255,255,0.18)",
          }}
        />
      </div>
      <div>
        <label
          htmlFor="book-email"
          className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Email Address
        </label>
        <input
          id="book-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-ocid="book_audit.input"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 placeholder:text-white/25 text-white"
          style={{
            background: "rgba(0,255,255,0.04)",
            border: "1px solid rgba(0,255,255,0.18)",
          }}
        />
      </div>
      <div>
        <label
          htmlFor="book-task"
          className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          What's the #1 manual task killing your team's week?
        </label>
        <textarea
          id="book-task"
          placeholder="e.g. Manually copying orders into our CRM every morning, responding to the same FAQ emails..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          rows={3}
          data-ocid="book_audit.textarea"
          className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-cyan-400/50 placeholder:text-white/25 text-white resize-none"
          style={{
            background: "rgba(0,255,255,0.04)",
            border: "1px solid rgba(0,255,255,0.18)",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{
          border: "1px solid rgba(0,255,255,0.4)",
          background: "rgba(0,255,255,0.1)",
          color: "#00FFFF",
          boxShadow: "0 0 20px rgba(0,255,255,0.15)",
          backdropFilter: "blur(8px)",
        }}
        data-ocid="book_audit.submit_button"
      >
        {sending ? (
          "Sending..."
        ) : (
          <>
            Book Your Free Audit <ArrowRight size={15} />
          </>
        )}
      </button>
      <p
        className="text-xs text-center"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        No spam. No sales pitch. Just a focused audit and a roadmap you can act
        on.
      </p>
    </form>
  );
}

export function HomePage() {
  // About section signature animation
  const aboutRef = useRef<HTMLElement>(null);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSigned(false);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setSigned(true));
          });
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-20">
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "transparent" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 80%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(0,255,255,0.25)",
              color: "#00FFFF",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#00FFFF" }}
            />
            Available for projects&nbsp;&middot;&nbsp;Philippines-based
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl mb-6"
            style={{
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.5))",
            }}
          >
            <span
              className="block"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #A0A0A0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Buy Back Your
            </span>
            <span
              className="time-highlight"
              style={{
                WebkitTextFillColor: "#e0ffff",
                color: "#e0ffff",
                display: "inline-block",
              }}
            >
              Time.
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-12"
            style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}
          >
            I build automation systems for small businesses and e-commerce
            brands in the Philippines — so you can stop doing the work your
            software should be doing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
              style={{
                border: "1px solid rgba(0,255,255,0.5)",
                background: "rgba(0,255,255,0.08)",
                color: "#00FFFF",
                boxShadow:
                  "0 0 20px rgba(0,255,255,0.2), 0 8px 32px rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              data-ocid="hero.primary_button"
            >
              Book a Free Automation Audit
              <ArrowRight size={16} />
            </a>
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:bg-white/10"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.04)",
              }}
              data-ocid="hero.secondary_button"
            >
              See My Work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Master Tech Stack Marquee ── */}
      <section
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          borderTop: "1px solid rgba(0,255,255,0.08)",
          borderBottom: "1px solid rgba(0,255,255,0.08)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div className="py-6 overflow-hidden">
          <p
            className="text-center text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Powering Automations With
          </p>
          <div className="relative" style={{ opacity: 0.5 }}>
            <div className="flex gap-3 animate-marquee whitespace-nowrap">
              {marqueeItems.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium flex-shrink-0"
                  style={{
                    background: "rgba(0,255,255,0.05)",
                    border: "1px solid rgba(0,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services / What I Do ── */}
      <section
        id="services"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3 text-white"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
              >
                What I Do
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Four core automation systems that reclaim your time and scale
                your business.
              </p>
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <FadeSection key={svc.title} delay={i * 80}>
                <div
                  className="glass-service-card rounded-2xl p-6 h-full flex flex-col gap-4"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(0,255,255,0.05) 0%, rgba(0,255,255,0.02) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(0,255,255,0.12)",
                    borderTop: "1px solid rgba(0,255,255,0.2)",
                    boxShadow:
                      "0 1px 0 0 rgba(0,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,255,255,0.1)",
                      border: "1px solid rgba(0,255,255,0.25)",
                    }}
                  >
                    <svc.icon size={22} style={{ color: "#00FFFF" }} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1.5 text-white">
                      {svc.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {svc.desc}
                    </p>
                  </div>

                  <div
                    className="h-px w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,255,255,0.5), transparent)",
                    }}
                  />

                  <a
                    href={svc.caseStudyHref}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{ color: "rgba(0,242,234,0.65)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#00F2EA";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(0,242,234,0.65)";
                    }}
                    data-ocid={`services.case_study_link.${i + 1}`}
                  >
                    View Case Study →
                  </a>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process: 3 Steps to Reclaim Your Growth ── */}
      <section
        id="process"
        className="py-36 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-24">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(0,255,255,0.6)" }}
              >
                The Process
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl"
                style={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  background:
                    "linear-gradient(135deg, #00F2EA 0%, #ffffff 55%, #c8f7f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                3 Steps to Reclaim Your Growth.
              </h2>
              <p
                className="text-base mt-6 max-w-xl mx-auto"
                style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
              >
                From audit to autopilot — a precise, repeatable system that
                converts your time into compounding revenue.
              </p>
            </div>
          </FadeSection>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "4rem" }}
          >
            {processSteps.map((step, i) => {
              const IconComponent = iconMap[step.icon];
              const isLaunch = step.icon === "launch";

              return isLaunch ? (
                <TriggerSection
                  key={step.phase}
                  delay={i * 150}
                  onEnter={() => {
                    setTimeout(() => {
                      const el = document.getElementById("launch-icon-trigger");
                      if (el) {
                        el.setAttribute("data-burst", "false");
                        void el.offsetWidth;
                        el.setAttribute("data-burst", "true");
                      }
                    }, 300);
                  }}
                >
                  <ProcessCard
                    step={step}
                    IconComponent={IconComponent}
                    launchTriggerId="launch-icon-trigger"
                  />
                </TriggerSection>
              ) : (
                <FadeSection key={step.phase} delay={i * 150}>
                  <ProcessCard step={step} IconComponent={IconComponent} />
                </FadeSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section
        id="roi"
        style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <FadeSection>
          <ROICalculator />
        </FadeSection>
      </section>

      {/* ── Showroom ── */}
      <section
        id="showroom"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3 text-white"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
              >
                The Showroom &mdash; Real Systems, Real Results
              </h2>
              <p
                className="text-base"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Mock client projects showcasing automation systems built
                end-to-end.
              </p>
            </div>
          </FadeSection>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showroomItems.map((cs, i) => (
              <FadeSection key={cs.slug} delay={i * 100}>
                <div
                  className="rounded-2xl p-6 h-full flex flex-col"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,255,255,0.12)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  data-ocid={`showroom.item.${i + 1}`}
                >
                  <div className="flex gap-2 flex-wrap mb-3">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          background: "rgba(0,255,255,0.08)",
                          color: "#00FFFF",
                          border: "1px solid rgba(0,255,255,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {cs.title}
                  </h3>
                  <p
                    className="text-sm mb-5 flex-1 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {cs.desc}
                  </p>
                  <div
                    className="rounded-xl p-4 mb-5"
                    style={{
                      background: "rgba(0,255,255,0.06)",
                      border: "1px solid rgba(0,255,255,0.15)",
                    }}
                  >
                    <div
                      className="text-2xl font-extrabold tracking-tight"
                      style={{ color: "#00F2EA" }}
                    >
                      {cs.metric}
                    </div>
                    <div
                      className="text-xs font-medium mt-0.5"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {cs.metricLabel}
                    </div>
                  </div>
                  <a
                    href={`/case-studies#${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2"
                    style={{ color: "rgba(0,242,234,0.8)" }}
                    data-ocid={`showroom.item.${i + 1}`}
                  >
                    View Case Study <ArrowRight size={14} />
                  </a>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About — Unified Profile Module ── */}
      <section
        ref={aboutRef}
        id="about"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(0, 242, 234, 0.02)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .about-right-col { padding-left: 2rem; }
          }
        `}</style>

        <div className="max-w-5xl mx-auto" style={{ position: "relative" }}>
          {/* Circuitry ghost SVG overlay */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
              overflow: "visible",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="pulseGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              id="circuitPath"
              d="M 285 110 C 320 75, 365 58, 420 52"
              stroke="rgba(0,242,234,0.1)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="320" cy="87" r="3" fill="rgba(0,242,234,0.15)" />
            <circle cx="368" cy="60" r="3" fill="rgba(0,242,234,0.15)" />
            <circle cx="404" cy="53" r="2.5" fill="rgba(0,242,234,0.12)" />
            <circle
              r="4"
              fill="#00F2EA"
              filter="url(#pulseGlow)"
              opacity="0.85"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                calcMode="linear"
              >
                <mpath href="#circuitPath" />
              </animateMotion>
            </circle>
          </svg>

          <FadeSection>
            <div
              className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16 items-center"
              style={{ position: "relative", zIndex: 1 }}
            >
              {/* Left — headshot */}
              <HeadshotImage />

              {/* Right — content */}
              <div className="about-right-col">
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-5 text-white"
                  style={{
                    lineHeight: 1.15,
                    textShadow: "0 1px 12px rgba(0,0,0,0.8)",
                  }}
                >
                  Mathematics Major.
                  <br />
                  <span style={{ color: "#00F2EA" }}>
                    Automation Architect.
                  </span>
                </h2>

                <p
                  className="text-base"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.8,
                    marginBottom: "2rem",
                  }}
                >
                  I&rsquo;m Mark Darren Bereber, a Marketing Automation
                  Specialist based in the Philippines. My background in
                  Mathematics Education gave me something most marketers
                  don&rsquo;t have &mdash; a systematic, logical approach to
                  problem-solving.
                </p>

                {/* Conviction highlight box — 16px border-radius */}
                <div
                  className="px-5 py-4 mb-8"
                  style={{
                    background: "rgba(0, 242, 234, 0.04)",
                    border: "1px solid rgba(0, 242, 234, 0.2)",
                    borderRadius: "16px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="text-sm italic"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.75,
                    }}
                  >
                    &ldquo;I build logical systems that handle the boring stuff,
                    so you can focus on scaling. Time is the only resource you
                    can&rsquo;t buy back &mdash; and every automation I design
                    is built to reclaim it.&rdquo;
                  </p>
                </div>

                {/* MDB Monogram */}
                <div className="mb-6">
                  <svg
                    viewBox="0 0 140 55"
                    width="119"
                    height="47"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="MDB monogram"
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(0, 242, 234, 0.3))",
                      opacity: signed ? 0.9 : 0,
                      transition: signed ? "opacity 1.5s ease-out" : "none",
                    }}
                  >
                    <defs>
                      <linearGradient id="mdbGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#00F2EA" />
                      </linearGradient>
                    </defs>
                    <text
                      x="0"
                      y="44"
                      fontFamily="'Playfair Display', Georgia, serif"
                      fontStyle="italic"
                      fontWeight="300"
                      fontSize="44"
                      fill="url(#mdbGrad)"
                      letterSpacing="3"
                    >
                      MDB
                    </text>
                  </svg>

                  <p
                    className="mt-2"
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "5px",
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 500,
                    }}
                  >
                    Mark Darren Bereber&nbsp;|&nbsp;Marketing Automation
                    Specialist
                  </p>
                </div>

                {/* Tool Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {aboutTools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontSize: "12px",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        background: "transparent",
                        border: "1px solid rgba(0,242,234,0.8)",
                        color: "#00F2EA",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Book an Audit (#book) ── */}
      <section
        id="book"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderTop: "1px solid rgba(0,255,255,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <div className="text-center mb-12">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
              >
                Book a Free Automation Audit
              </h2>
              <p
                className="text-base"
                style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}
              >
                I&rsquo;ll personally review your workflow and hand you a custom
                Automation Roadmap &mdash; at zero cost.
              </p>
            </div>
          </FadeSection>

          <FadeSection delay={100}>
            <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
              {/* Left — headshot + status (60% on desktop) */}
              <div className="w-full md:w-[40%] flex flex-col items-center gap-6">
                <HeadshotImage size="lg" />

                {/* Live status */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl w-full max-w-xs"
                  style={{
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                  data-ocid="book_audit.panel"
                >
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
                    <p
                      className="text-xs font-bold"
                      style={{ color: "#22c55e" }}
                    >
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
              </div>

              {/* Right — form (60%) */}
              <div className="w-full md:w-[60%]">
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
                  <BookAuditForm />
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}

// ── ProcessCard sub-component
function ProcessCard({
  step,
  IconComponent,
  launchTriggerId,
}: {
  step: (typeof processSteps)[number];
  IconComponent: React.ComponentType;
  launchTriggerId?: string;
}) {
  return (
    <div
      className="rounded-3xl p-10 flex flex-col items-center text-center h-full"
      style={{
        background:
          "linear-gradient(145deg, rgba(0,255,255,0.07) 0%, rgba(0,0,0,0.25) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow:
          "0 4px 48px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,255,255,0.06) inset",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div
        className="relative mb-8 flex items-center justify-center"
        id={launchTriggerId}
        data-burst={launchTriggerId ? "true" : undefined}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 90,
            height: 90,
            background:
              "radial-gradient(circle, rgba(0,200,180,0.3) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(0,255,255,0.1)",
            border: "1px solid rgba(0,255,255,0.3)",
            boxShadow:
              "0 0 24px rgba(0,255,255,0.25), 0 0 8px rgba(0,255,255,0.15)",
          }}
        >
          <IconComponent />
        </div>
      </div>

      <div
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "rgba(0,255,255,0.55)" }}
      >
        {step.phase}
      </div>

      <h3
        className="text-2xl font-extrabold mb-4 text-white"
        style={{ letterSpacing: "-0.015em" }}
      >
        {step.title}
      </h3>

      <p
        className="text-sm mb-6 flex-1"
        style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}
      >
        {step.desc}
      </p>

      <div
        className="w-full rounded-xl px-5 py-3 mt-auto"
        style={{
          background: "rgba(0,255,255,0.05)",
          border: "1px solid rgba(0,255,255,0.15)",
        }}
      >
        <span className="text-sm font-semibold" style={{ color: "#00F2EA" }}>
          {step.result}
        </span>
      </div>
    </div>
  );
}
