import { Link } from "@tanstack/react-router";

export function StickyAuditBar() {
  return (
    <div className="sticky-audit-bar" data-ocid="audit_bar.panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <p
          className="text-sm font-medium"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Ready to automate your marketing?
        </p>
        <Link
          to="/contact"
          className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            border: "1px solid rgba(0, 255, 255, 0.5)",
            background: "rgba(0, 255, 255, 0.08)",
            color: "#00FFFF",
            boxShadow: "0 0 14px rgba(0, 255, 255, 0.2)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          data-ocid="audit_bar.primary_button"
        >
          Book Free Audit
        </Link>
      </div>
    </div>
  );
}
