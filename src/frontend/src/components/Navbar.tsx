import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(11, 14, 17, 0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(0, 255, 255, 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-ocid="nav.link">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(0, 255, 255, 0.4)",
                color: "#00FFFF",
                boxShadow: "0 0 12px rgba(0, 255, 255, 0.2)",
              }}
            >
              MD
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-semibold text-sm leading-tight">
                Mark Darren Bereber
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(0, 255, 255, 0.75)" }}
              >
                Marketing Automation Specialist
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color:
                    location.pathname === link.href.split("#")[0] &&
                    !link.href.includes("#")
                      ? "white"
                      : "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00FFFF";
                }}
                onMouseLeave={(e) => {
                  const isActive =
                    location.pathname === link.href.split("#")[0] &&
                    !link.href.includes("#");
                  (e.currentTarget as HTMLElement).style.color = isActive
                    ? "white"
                    : "rgba(255,255,255,0.6)";
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                border: "1px solid rgba(0, 255, 255, 0.6)",
                background: "rgba(0, 255, 255, 0.1)",
                color: "#00FFFF",
                boxShadow: "0 0 16px rgba(0, 255, 255, 0.25)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              data-ocid="nav.primary_button"
            >
              Book Free Audit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2"
            style={{ color: "rgba(255,255,255,0.8)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            background: "rgba(10, 10, 10, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(0, 255, 255, 0.12)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onClick={() => setOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/contact"
              className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all"
              style={{
                border: "1px solid rgba(0, 255, 255, 0.5)",
                background: "rgba(0, 255, 255, 0.08)",
                color: "#00FFFF",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setOpen(false)}
              data-ocid="nav.primary_button"
            >
              Book Free Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
