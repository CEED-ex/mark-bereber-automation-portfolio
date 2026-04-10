import {
  ArrowRight,
  BarChart2,
  Bell,
  BookOpen,
  Bot,
  Brain,
  CheckCircle,
  Database,
  FileText,
  Globe,
  MessageSquare,
  Monitor,
  Package,
  RefreshCw,
  Send,
  ShoppingCart,
  X,
  Zap,
  ZoomIn,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

interface CaseImage {
  url: string;
  caption: string;
}

interface FlowNode {
  label: string;
  icon: React.ElementType;
  sublabel?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  tags: string[];
  problem: string;
  solution: string;
  result: string;
  businessValue: string;
  images: CaseImage[];
  stats: { label: string; value: string }[];
  flowNodes: FlowNode[];
}

function gdThumb(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
}

const caseStudies: CaseStudy[] = [
  {
    id: "after-hours-shop-assistant",
    title: "After-Hours Shop Assistant",
    tags: ["E-Commerce", "Zapier", "AI"],
    problem:
      "A Cebu-based online clothing store was losing sales every night. Customers would message on Facebook and Instagram after 9 PM, get no response, and buy from a competitor by morning.",
    solution:
      "Built a 5-step Zapier automation that monitors social DMs, routes inquiries through an AI classifier, generates a personalized response draft, and notifies the owner with one-tap approval — all within 4 minutes of the original message.",
    result:
      "The store now responds to 100% of after-hours inquiries within 4 minutes. In the first 30 days: 3× increase in captured leads, 2 recovered sales per week on average, owner saves 4 hrs/week on manual DM management.",
    businessValue:
      "If your business goes quiet after 5 PM, you're leaving money on the table every single night. This system is a 24/7 sales assistant that never sleeps — and costs a fraction of a part-time hire.",
    stats: [
      { label: "Response Time Eliminated", value: "4 hrs" },
      { label: "After-Hours Coverage", value: "100%" },
      { label: "Lead Capture Rate", value: "3×" },
    ],
    flowNodes: [
      { label: "DM Received", icon: MessageSquare, sublabel: "FB / IG" },
      { label: "AI Classifier", icon: Bot, sublabel: "Priority Sort" },
      { label: "Response Drafted", icon: Send, sublabel: "Personalized" },
      { label: "Owner Notified", icon: Bell, sublabel: "One-tap Approve" },
      { label: "Lead Captured", icon: BookOpen, sublabel: "Google Sheets" },
    ],
    images: [
      {
        url: gdThumb("1Bl42OHqOqWNHQcsxJFsfubIJ_8MKembW"),
        caption: "Lead Intake Form",
      },
      {
        url: gdThumb("1o9y_ZxZsy-7imscFgNnMJ29Y_-9t5Wld"),
        caption: "Automation Tracker",
      },
      {
        url: gdThumb("1wVbv_4gF-1hil7qYQuGGwl0YTfBnZHBQ"),
        caption: "Zapier Workflow",
      },
      {
        url: gdThumb("1Dt98w07u6cxd0D8aGrD6sB-8oQ848396"),
        caption: "AI Email Draft",
      },
      {
        url: gdThumb("18UupMbSor8xLHPNkKrcifwf1Uxc8b2zw"),
        caption: "Owner Notification",
      },
    ],
  },
  {
    id: "executive-intelligence-pipeline",
    title: "Executive Intelligence Pipeline",
    tags: ["Reporting", "AI", "Zapier"],
    problem:
      "A Manila-based SaaS company's leadership team was spending 6 hours every Monday morning manually pulling reports from Stripe, HubSpot, and Google Analytics into a single executive brief. Data was always 48 hours stale by the time decisions were made.",
    solution:
      "Built an automated intelligence pipeline that runs every Monday at 7 AM: pulls live data from all three platforms via API, feeds it into an AI model that synthesizes key insights, and delivers a formatted executive brief directly to the leadership Slack channel.",
    result:
      "Leadership reclaimed 6 hrs/week. Data is never more than 1 hour stale. Decision velocity increased — the team now acts on insights the same morning they're generated.",
    businessValue:
      "If your leadership team is still manually compiling reports, you're paying executive salaries to do analyst work. This pipeline turns your entire data stack into a single, automated briefing — delivered before your first coffee.",
    stats: [
      { label: "Automated Intelligence", value: "100%" },
      { label: "Manual Reporting", value: "0 min" },
      { label: "Exec Visibility", value: "Real-Time" },
    ],
    flowNodes: [
      { label: "Monday 7AM Trigger", icon: Zap, sublabel: "Scheduled" },
      {
        label: "Pull API Data",
        icon: BarChart2,
        sublabel: "Stripe / HubSpot / GA",
      },
      { label: "AI Synthesizes", icon: Bot, sublabel: "Smart Insights" },
      { label: "Brief Generated", icon: FileText, sublabel: "Formatted" },
      { label: "Slack Delivered", icon: Send, sublabel: "Leadership Channel" },
    ],
    images: [
      {
        url: gdThumb("1eo60QEPRr4YaPn0i3CexBhaHembcckPq"),
        caption: "Status Logs",
      },
      {
        url: gdThumb("1ec1NrE_uTBMzbKmgZisqlDgK14m8qh5o"),
        caption: "AI Prompt Config",
      },
      {
        url: gdThumb("1uMCnFDs5yBd9h_5yJQNBh3aGHK70FOX2"),
        caption: "Zapier Workflow",
      },
      {
        url: gdThumb("13KH3cK3D-3GtEj4V9oTG31otEKVHya--"),
        caption: "Executive Notification",
      },
    ],
  },
  {
    id: "autonomous-sales-system",
    title: "Autonomous Sales System",
    tags: ["E-Commerce", "Inventory", "Sales"],
    problem:
      "A Davao-based electronics reseller was manually updating inventory across Shopify, Facebook Marketplace, and a local wholesale portal. Overselling incidents were damaging customer trust and the owner spent 3 hrs/day on stock reconciliation.",
    solution:
      "Built a central inventory hub in Airtable connected to all three platforms via API. When stock changes anywhere, the hub updates all channels within 60 seconds. Paired with an automated low-stock alert system and a cross-sell email sequence triggered by purchase behavior.",
    result:
      "Zero overselling incidents in 90 days. Owner reclaimed 3 hrs/day. Cross-sell sequence generates an average of ₱18,000/month in additional revenue.",
    businessValue:
      "Manual inventory management doesn't scale. Every hour you spend updating spreadsheets is an hour you're not spending on growth. This system makes your inventory self-managing — so you can focus on sourcing better products.",
    stats: [
      { label: "Sales Conversion", value: "2×" },
      { label: "Inventory Accuracy", value: "100%" },
      { label: "Manual Stock Updates", value: "0 hrs" },
    ],
    flowNodes: [
      { label: "Stock Change", icon: ShoppingCart, sublabel: "Any Channel" },
      { label: "Central Hub Updated", icon: Database, sublabel: "Airtable" },
      {
        label: "All Channels Synced",
        icon: RefreshCw,
        sublabel: "< 60 seconds",
      },
      { label: "Low-Stock Alert", icon: Bell, sublabel: "Auto-Trigger" },
      { label: "Cross-Sell Triggered", icon: Send, sublabel: "Email Sequence" },
    ],
    images: [
      {
        url: gdThumb("1w1aj_iwba7ytbT5qmUcs7I2iDuioYpCx"),
        caption: "Zapier Workflow",
      },
      {
        url: gdThumb("1jYQ4eaGpt2rVPDCX45RjkQXWLkeSBH63"),
        caption: "Inventory Before",
      },
      {
        url: gdThumb("1F1bcaNTMxV91IcZcAHzVWE4NnxWAcfB"),
        caption: "Inventory After",
      },
    ],
  },
  {
    id: "nexus-crm",
    title: "Nexus CRM",
    tags: ["CRM", "AI-Architecture", "Scalability"],
    problem:
      'A high-growth web design agency was struggling with "tab fatigue" and fragmented client communication. Leads were falling through the cracks, and project milestones were managed across 5+ different apps, costing the owner 10+ hours of admin weekly.',
    solution:
      'Engineered a custom, centralized CRM with a relational database. Built an automated "Client Portal" that tracks projects through Discovery, Design, and Launch, and integrated a smart CSV engine for instant data migration.',
    result:
      '40% reduction in administrative overhead. The agency can now scale to 2× project volume without increasing headcount, as the "Nexus" system automates 80% of the project lifecycle.',
    businessValue:
      'For a design agency, clarity is currency. This system eliminates the "Where are we at?" email entirely. By automating the backend, the owner can focus on high-level creative direction while the system handles lead nurturing and milestone tracking.',
    stats: [
      { label: "Project Transparency", value: "100%" },
      { label: "Client Onboarding", value: "<5 mins" },
      { label: "Manual Data Entry", value: "Zero" },
    ],
    flowNodes: [
      { label: "Lead Inquiry Submitted", icon: Globe, sublabel: "Lead Form" },
      {
        label: "AI Classifies & Scores Lead",
        icon: Brain,
        sublabel: "AI Engine",
      },
      {
        label: "Relational Record Created",
        icon: Database,
        sublabel: "CRM Database",
      },
      {
        label: "Client Portal Access Sent",
        icon: Monitor,
        sublabel: "Auto-Provisioned",
      },
      {
        label: "Dashboard Milestone Updated",
        icon: BarChart2,
        sublabel: "Live Tracking",
      },
    ],
    images: [
      {
        url: gdThumb("1cVbW0xEWI1AS0ywfJTYRHOQoLpNaKOGh"),
        caption: "Landing Page",
      },
      {
        url: gdThumb("1Q3EJLhBN5RHDCwnksdWO-8eK_CRZcN1l"),
        caption: "CRM Dashboard",
      },
      {
        url: gdThumb("1aDgcFVdsfsUFrK0ZONmLFMQY5ENnn5k3"),
        caption: "CRM Contacts",
      },
    ],
  },
];

function FlowDiagram({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="overflow-x-auto pb-4">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center gap-0 min-w-max mx-auto justify-center py-4">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center">
            <div
              className="rounded-xl p-4 text-center flex flex-col items-center gap-2"
              style={{
                background: "rgba(0,255,255,0.1)",
                border: "1px solid rgba(0,255,255,0.35)",
                color: "#00FFFF",
                minWidth: 130,
                maxWidth: 150,
                boxShadow: "0 0 16px rgba(0,255,255,0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <node.icon size={20} />
              <span className="text-xs font-semibold leading-tight">
                {node.label}
              </span>
              {node.sublabel && (
                <span
                  className="text-xs"
                  style={{ color: "rgba(0,255,255,0.6)" }}
                >
                  {node.sublabel}
                </span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center px-1">
                <ArrowRight
                  size={20}
                  style={{ color: "rgba(0,255,255,0.7)", flexShrink: 0 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex md:hidden flex-col items-center gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center">
            <div
              className="rounded-xl p-4 text-center flex flex-row items-center gap-3 w-full max-w-xs"
              style={{
                background: "rgba(0,255,255,0.1)",
                border: "1px solid rgba(0,255,255,0.35)",
                color: "#00FFFF",
                boxShadow: "0 0 12px rgba(0,255,255,0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <node.icon size={18} className="flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-semibold">{node.label}</div>
                {node.sublabel && (
                  <div
                    className="text-xs"
                    style={{ color: "rgba(0,255,255,0.6)" }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <div className="py-1" style={{ color: "rgba(0,255,255,0.7)" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <title>Arrow down</title>
                  <path
                    d="M10 3v14M5 12l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CaseImage({
  img,
  onOpen,
  csIdx,
}: { img: CaseImage; onOpen: (img: CaseImage) => void; csIdx: number }) {
  const [errored, setErrored] = useState(false);
  return (
    <button
      type="button"
      className="group cursor-pointer text-left"
      onClick={() => onOpen(img)}
      data-ocid={`case_study.item.${csIdx + 1}`}
    >
      <div
        className="rounded-xl overflow-hidden relative"
        style={{
          border: "1px solid rgba(0,255,255,0.15)",
          aspectRatio: "16/10",
          background: "rgba(0,255,255,0.04)",
        }}
      >
        {!errored ? (
          <img
            src={img.url}
            alt={img.caption}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setErrored(true)}
          />
        ) : (
          <div
            className="w-full h-full absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
            }}
          >
            <span>{img.caption}</span>
          </div>
        )}
        {!errored && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <ZoomIn
              size={24}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        )}
      </div>
      <p
        className="text-xs mt-2 text-center"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {img.caption}
      </p>
    </button>
  );
}

// Lightbox: clears both sticky navbar (~64px top) and sticky audit bar (~64px bottom)
// Uses fixed positioning with explicit top/bottom insets so content never clips under either bar.
function ImageLightbox({
  image,
  onClose,
}: { image: CaseImage; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // Full-viewport fixed overlay — z-index 9999 clears nav (z-50) and audit bar (z-50)
    <div
      ref={containerRef}
      className="fixed inset-0"
      style={{ zIndex: 9999, outline: "none" }}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      data-ocid="lightbox.modal"
      aria-label="Image preview"
    >
      {/* Backdrop — full viewport, click to close */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          cursor: "pointer",
        }}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        aria-hidden="true"
      />

      {/* Content container — inset 72px top (navbar) + 8px gap, 72px bottom (audit bar) + 8px gap */}
      {/* This ensures BOTH the close button and the caption are always fully visible */}
      <div
        className="absolute inset-x-4 sm:inset-x-8 flex flex-col"
        style={{
          top: "80px",
          bottom: "80px",
          zIndex: 1,
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button — always at the top of the inset area */}
        <div className="flex justify-end mb-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: 40,
              height: 40,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#ffffff",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,242,234,0.25)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(0,242,234,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.3)";
            }}
            data-ocid="lightbox.close_button"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image — fills remaining space, object-contain preserves aspect ratio */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-hidden">
          <img
            src={image.url}
            alt={image.caption}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl"
            style={{ border: "1px solid rgba(0,255,255,0.2)" }}
          />
        </div>

        {/* Caption — always at the bottom of the inset area, above the audit bar */}
        <p
          className="text-center text-sm mt-3 flex-shrink-0"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {image.caption}
        </p>
      </div>
    </div>
  );
}

export function CaseStudiesPage() {
  const [lightboxImage, setLightboxImage] = useState<CaseImage | null>(null);

  // Scroll to anchored case study when arriving via hash link
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-20" style={{ background: "transparent" }}>
      {lightboxImage && (
        <ImageLightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}

      {/* Header */}
      <div
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{
          background: "rgba(0, 0, 0, 0.2)",
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
          Case Studies
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Real automation systems built for mock clients — each solving a
          concrete business problem.
        </p>
      </div>

      {/* Case studies */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-20">
        {caseStudies.map((cs, csIdx) => (
          <FadeSection key={cs.id} delay={csIdx * 80}>
            <article
              id={cs.id}
              className="rounded-2xl overflow-hidden scroll-mt-24"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,255,255,0.12)",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.4), 0 0 40px rgba(0,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              data-ocid={`case_study.item.${csIdx + 1}`}
            >
              {/* Title band */}
              <div
                className="px-8 py-7"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,255,255,0.12) 0%, rgba(0,255,255,0.05) 100%)",
                  borderBottom: "1px solid rgba(0,255,255,0.15)",
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(0,255,255,0.12)",
                        border: "1px solid rgba(0,255,255,0.25)",
                        color: "#00FFFF",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2
                  className="text-2xl font-extrabold text-white"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {cs.title}
                </h2>
              </div>

              <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {cs.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: "rgba(0,255,255,0.05)",
                        border: "1px solid rgba(0,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      <div
                        className="text-2xl font-extrabold mb-1"
                        style={{
                          color: "#00FFFF",
                          textShadow: "0 0 16px rgba(0,255,255,0.5)",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs font-medium"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Problem / Solution / Result */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(239,68,68,0.05)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "rgba(239,68,68,0.9)" }}
                    >
                      Problem
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {cs.problem}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(0,255,255,0.04)",
                      border: "1px solid rgba(0,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "rgba(0,255,255,0.8)" }}
                    >
                      Solution
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {cs.solution}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(0,200,83,0.05)",
                      border: "1px solid rgba(0,200,83,0.15)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-2"
                      style={{ color: "rgba(0,200,83,0.9)" }}
                    >
                      Result
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {cs.result}
                    </p>
                  </div>
                </div>

                {/* Business value */}
                <div
                  className="rounded-xl p-5 mb-8"
                  style={{
                    background: "rgba(0,255,255,0.04)",
                    borderLeft: "4px solid rgba(0,255,255,0.5)",
                    border: "1px solid rgba(0,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "rgba(0,255,255,0.8)" }}
                  >
                    What This Means For You
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {cs.businessValue}
                  </p>
                </div>

                {/* Automation Flow */}
                <div
                  className="rounded-xl p-6 mb-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(0,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "rgba(0,255,255,0.6)" }}
                  >
                    Automation Flow
                  </div>
                  <FlowDiagram nodes={cs.flowNodes} />
                </div>

                {/* Image gallery */}
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-4"
                    style={{ color: "rgba(0,255,255,0.6)" }}
                  >
                    System Screenshots
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cs.images.map((img) => (
                      <CaseImage
                        key={img.caption}
                        img={img}
                        onOpen={setLightboxImage}
                        csIdx={csIdx}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </FadeSection>
        ))}
      </div>
    </div>
  );
}
