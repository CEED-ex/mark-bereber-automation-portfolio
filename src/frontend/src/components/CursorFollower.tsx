import { useEffect, useRef } from "react";

export function CursorFollower() {
  // Touch device check — render nothing if touch-primary device
  const isTouch =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window);

  const ringRef = useRef<HTMLDivElement>(null);

  // Lerped (current) position
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Raw mouse target position
  const targetX = useRef(0);
  const targetY = useRef(0);

  // Hover state
  const isHovered = useRef(false);

  // rAF handle
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (isTouch) return;

    const ring = ringRef.current;
    if (!ring) return;

    const LERP = 0.15;

    // ── Mouse move: update raw target ──────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    // ── Hover detection via event delegation ──────────────────────────────
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        isHovered.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        isHovered.current = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    // ── rAF loop ───────────────────────────────────────────────────────────
    const loop = () => {
      // Lerp position
      currentX.current += (targetX.current - currentX.current) * LERP;
      currentY.current += (targetY.current - currentY.current) * LERP;

      const x = currentX.current - 10; // offset by half ring width (20px / 2)
      const y = currentY.current - 10;

      if (ring) {
        const hovered = isHovered.current;

        // Position + optional scale — only transform is lerped per-frame.
        // Scale and opacity use CSS transition (set in inline style below).
        ring.style.transform = hovered
          ? `translate3d(${x}px, ${y}px, 0) scale(2)`
          : `translate3d(${x}px, ${y}px, 0) scale(1)`;

        ring.style.opacity = hovered ? "0.9" : "0.3";
        ring.style.background = hovered
          ? "transparent"
          : "rgba(0, 242, 234, 0.05)";
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={ringRef}
      style={{
        // Static styles — never mutated inside the rAF loop
        position: "fixed",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "1px solid #00F2EA",
        background: "rgba(0, 242, 234, 0.05)",
        opacity: 0.3,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        // CSS transition for opacity + scale only (NOT position — that's lerped)
        transition: "opacity 200ms ease, transform 200ms ease",
        transform: "translate3d(-40px, -40px, 0) scale(1)",
      }}
    />
  );
}
