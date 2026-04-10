import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", href: "/" as const },
  { label: "Case Studies", href: "/case-studies" as const },
  { label: "Contact", href: "/contact" as const },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(0, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(0,255,255,0.4)",
                  color: "#00FFFF",
                  boxShadow: "0 0 12px rgba(0,255,255,0.18)",
                }}
              >
                MD
              </div>
              <span className="text-white font-semibold">
                Mark Darren Bereber
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Marketing Automation Specialist
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.55)" }}
                data-ocid="footer.link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Location */}
          <div>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "#00FFFF" }}
            >
              Philippines-based
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Available for remote projects
            </p>
          </div>
        </div>

        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "rgba(0,255,255,0.6)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#00FFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(0,255,255,0.6)";
              }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
