import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  layer: "A" | "B";
  radius: number;
  opacity: number;
}

interface PulseEvent {
  x: number;
  y: number;
  startTime: number;
}

// ── Counts reduced by 30% from previous (40 → 28, 120 → 84)
const LAYER_A_COUNT = 28;
const LAYER_A_RADIUS = 5;
const LAYER_A_OPACITY = 0.04;

const LAYER_B_COUNT = 84;
const LAYER_B_RADIUS = 1.5;
const LAYER_B_OPACITY = 0.12;

// Connection radius increased 18% from 130 → 154
const CONNECTION_DIST = 154;
// Base line opacity cap — low so extra lines don’t clutter
const LINE_OPACITY_BASE = 0.1;

const BASE_DRIFT = 0.18;
const REPULSION_DIST = 100;
const REPULSION_FORCE = 0.035;
const DAMPING = 0.985;
const MIN_SPEED = 0.08;
const MAX_SPEED = 0.6;

// Neural Pulse constants
const PULSE_RADIUS = 90; // 80–100px — mid-point
const PULSE_PEAK_OPACITY = 0.6; // momentary brightness spike
const PULSE_DURATION = 400; // ms — digital heartbeat fade

// Tags considered "interactive" — clicks on these do NOT fire the pulse
const INTERACTIVE_TAGS = new Set([
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "label",
  "summary",
]);

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  // Raw mouse position updated on every mousemove event
  const pendingMouseRef = useRef<{ x: number; y: number }>({
    x: -9999,
    y: -9999,
  });
  // Smoothed position consumed by the rAF loop
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  // Queue of active pulse events
  const pulsesRef = useRef<PulseEvent[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const initParticles = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      const layerA: Particle[] = Array.from({ length: LAYER_A_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = BASE_DRIFT * (0.4 + Math.random() * 0.4);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          layer: "A" as const,
          radius: LAYER_A_RADIUS + Math.random() * 4,
          opacity: LAYER_A_OPACITY * (0.5 + Math.random() * 0.5),
        };
      });

      const layerB: Particle[] = Array.from({ length: LAYER_B_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = BASE_DRIFT * (0.6 + Math.random() * 0.8);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          layer: "B" as const,
          radius: LAYER_B_RADIUS * (0.8 + Math.random() * 0.4),
          opacity: LAYER_B_OPACITY * (0.7 + Math.random() * 0.6),
        };
      });

      particlesRef.current = [...layerA, ...layerB];
    };

    initParticles();

    // ── Neural Pulse: fire when clicking non-interactive background space ─
    // The canvas has pointerEvents:"none" so clicks land on content elements.
    // We listen on window and block only truly interactive targets (buttons,
    // links, inputs). Everything else — divs, sections, article, main, etc. —
    // counts as "empty background" and fires the pulse.
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      // Walk up the DOM a few levels to catch clicks inside a <button> on a child <span>
      let el: HTMLElement | null = target;
      let isInteractive = false;
      for (let i = 0; i < 5 && el; i++) {
        if (INTERACTIVE_TAGS.has(el.tagName.toLowerCase())) {
          isInteractive = true;
          break;
        }
        el = el.parentElement;
      }
      if (!isInteractive && tag !== "canvas") {
        pulsesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          startTime: performance.now(),
        });
      }
    };

    // ── Event handlers ─────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      pendingMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      pendingMouseRef.current = { x: -9999, y: -9999 };
    };
    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // ── Animation loop ───────────────────────────────────────────
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!canvas || !ctx) return;

      // Consume latest pending mouse position once per frame
      mouseRef.current = pendingMouseRef.current;

      // Parallax: read scrollY directly inside rAF — no separate scroll listener
      canvas.style.transform = `translate3d(0, ${-window.scrollY * 0.3}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const now = performance.now();

      // ── Prune expired pulses ──────────────────────────────────
      pulsesRef.current = pulsesRef.current.filter(
        (p) => now - p.startTime < PULSE_DURATION,
      );
      const activePulses = pulsesRef.current;

      // ── Update positions ──────────────────────────────────────────
      for (const p of particles) {
        // Repulsion — only Layer B, only when cursor is near
        if (p.layer === "B") {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < REPULSION_DIST * REPULSION_DIST && dist2 > 0) {
            const dist = Math.sqrt(dist2);
            const force = (REPULSION_DIST - dist) / REPULSION_DIST;
            p.vx += (dx / dist) * force * REPULSION_FORCE;
            p.vy += (dy / dist) * force * REPULSION_FORCE;
          }
        }

        // Smooth damping back to base drift
        p.vx = p.vx * DAMPING + p.baseVx * (1 - DAMPING);
        p.vy = p.vy * DAMPING + p.baseVy * (1 - DAMPING);

        // Speed clamping
        const speed2 = p.vx * p.vx + p.vy * p.vy;
        if (speed2 > 0) {
          const speed = Math.sqrt(speed2);
          if (speed < MIN_SPEED) {
            p.vx = (p.vx / speed) * MIN_SPEED;
            p.vy = (p.vy / speed) * MIN_SPEED;
          } else if (speed > MAX_SPEED) {
            p.vx = (p.vx / speed) * MAX_SPEED;
            p.vy = (p.vy / speed) * MAX_SPEED;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }

      // ── Compute per-node pulse boost (ease-out over 400ms) ─────
      // pulseBoost[i] is the additive opacity bonus for particles[i]
      // We calculate it once here and reuse for both nodes and lines.
      const pulseBoostB: Float32Array = new Float32Array(LAYER_B_COUNT);
      if (activePulses.length > 0) {
        const lb = particles.filter((p) => p.layer === "B");
        for (let i = 0; i < lb.length; i++) {
          let maxBoost = 0;
          for (const pulse of activePulses) {
            const dx = lb[i].x - pulse.x;
            const dy = lb[i].y - pulse.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 <= PULSE_RADIUS * PULSE_RADIUS) {
              const t = (now - pulse.startTime) / PULSE_DURATION; // 0 → 1
              // ease-out cubic: starts fast, decelerates smoothly
              const easeOut = 1 - t ** 3;
              const boost = PULSE_PEAK_OPACITY * easeOut;
              if (boost > maxBoost) maxBoost = boost;
            }
          }
          pulseBoostB[i] = maxBoost;
        }
      }

      // ── Draw Layer A — soft glow without ctx.filter ────────────────
      for (const p of particles) {
        if (p.layer !== "A") continue;
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 4,
        );
        grad.addColorStop(
          0,
          `rgba(0, 242, 234, ${(p.opacity * 2).toFixed(4)})`,
        );
        grad.addColorStop(0.4, `rgba(0, 242, 234, ${p.opacity.toFixed(4)})`);
        grad.addColorStop(1, "rgba(0, 242, 234, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Draw Layer B connecting lines ─────────────────────────
      const lb = particles.filter((p) => p.layer === "B");
      const connDist2 = CONNECTION_DIST * CONNECTION_DIST;

      ctx.lineWidth = 0.6;

      for (let i = 0; i < lb.length; i++) {
        for (let j = i + 1; j < lb.length; j++) {
          const dx = lb[i].x - lb[j].x;
          const dy = lb[i].y - lb[j].y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < connDist2) {
            const dist = Math.sqrt(dist2);
            const proximity = 1 - dist / CONNECTION_DIST;
            // Base alpha + max pulse boost from either endpoint
            const baseAlpha = proximity * LINE_OPACITY_BASE;
            const lineBoost = Math.max(pulseBoostB[i], pulseBoostB[j]);
            const alpha = Math.min(baseAlpha + lineBoost * proximity, 0.65);

            ctx.beginPath();
            ctx.moveTo(lb[i].x, lb[i].y);
            ctx.lineTo(lb[j].x, lb[j].y);
            ctx.strokeStyle = `rgba(0, 242, 234, ${alpha.toFixed(4)})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw Layer B nodes (crisp data points) ─────────────────
      for (let i = 0; i < lb.length; i++) {
        const p = lb[i];
        const boostedOpacity = Math.min(p.opacity + pulseBoostB[i], 0.75);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 234, ${boostedOpacity.toFixed(4)})`;
        ctx.fill();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    />
  );
}
