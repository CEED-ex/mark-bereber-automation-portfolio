// Inline SVG animated icons for the How It Works section
// All animations use raw CSS keyframes via <style> tags for maximum control

export function MapIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes mapPulse {
          0%, 100% { r: 6; opacity: 0.9; }
          50% { r: 8; opacity: 0.5; }
        }
        @keyframes mapRing {
          0% { r: 9; opacity: 0.5; }
          100% { r: 20; opacity: 0; }
        }
        @keyframes lineDraw1 {
          0% { stroke-dashoffset: 32; opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes lineDraw2 {
          0% { stroke-dashoffset: 35; opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes lineDraw3 {
          0% { stroke-dashoffset: 38; opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes lineDraw4 {
          0% { stroke-dashoffset: 30; opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        .map-node {
          animation: mapPulse 2s ease-in-out infinite;
        }
        .map-ring {
          animation: mapRing 2s ease-out infinite;
        }
        .map-line-1 {
          stroke-dasharray: 32;
          animation: lineDraw1 2.4s ease-out infinite;
        }
        .map-line-2 {
          stroke-dasharray: 35;
          animation: lineDraw2 2.4s ease-out infinite 0.3s;
        }
        .map-line-3 {
          stroke-dasharray: 38;
          animation: lineDraw3 2.4s ease-out infinite 0.6s;
        }
        .map-line-4 {
          stroke-dasharray: 30;
          animation: lineDraw4 2.4s ease-out infinite 0.9s;
        }
        .map-end-node {
          opacity: 0.5;
        }
      `}</style>

      {/* Branch lines from center */}
      <line
        x1="32"
        y1="32"
        x2="8"
        y2="10"
        stroke="rgba(0,242,234,0.7)"
        strokeWidth="1"
        className="map-line-1"
      />
      <line
        x1="32"
        y1="32"
        x2="56"
        y2="10"
        stroke="rgba(0,242,234,0.7)"
        strokeWidth="1"
        className="map-line-2"
      />
      <line
        x1="32"
        y1="32"
        x2="8"
        y2="54"
        stroke="rgba(0,242,234,0.7)"
        strokeWidth="1"
        className="map-line-3"
      />
      <line
        x1="32"
        y1="32"
        x2="56"
        y2="54"
        stroke="rgba(0,242,234,0.7)"
        strokeWidth="1"
        className="map-line-4"
      />

      {/* End-point nodes */}
      <circle
        cx="8"
        cy="10"
        r="3"
        fill="rgba(0,242,234,0.4)"
        className="map-end-node"
      />
      <circle
        cx="56"
        cy="10"
        r="3"
        fill="rgba(0,242,234,0.4)"
        className="map-end-node"
      />
      <circle
        cx="8"
        cy="54"
        r="3"
        fill="rgba(0,242,234,0.4)"
        className="map-end-node"
      />
      <circle
        cx="56"
        cy="54"
        r="3"
        fill="rgba(0,242,234,0.4)"
        className="map-end-node"
      />

      {/* Pulse ring */}
      <circle
        cx="32"
        cy="32"
        fill="none"
        stroke="rgba(0,242,234,0.4)"
        strokeWidth="1"
        className="map-ring"
      />

      {/* Central node */}
      <circle
        cx="32"
        cy="32"
        fill="rgba(0,242,234,0.9)"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,242,234,0.8))" }}
        className="map-node"
      />
    </svg>
  );
}

export function BuildIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes orbitA {
          from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }
        @keyframes orbitB {
          from { transform: rotate(180deg) translateX(18px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(18px) rotate(-540deg); }
        }
        @keyframes arcGlow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.45; }
        }
        @keyframes coreGlow {
          0%, 100% { opacity: 0.3; r: 4; }
          50% { opacity: 0.7; r: 5; }
        }
        .build-orbit-a {
          transform-origin: 32px 32px;
          animation: orbitA 3s linear infinite;
        }
        .build-orbit-b {
          transform-origin: 32px 32px;
          animation: orbitB 3s linear infinite;
        }
        .build-arc {
          animation: arcGlow 3s ease-in-out infinite;
        }
        .build-core {
          animation: coreGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Orbit ring */}
      <circle
        cx="32"
        cy="32"
        r="18"
        fill="none"
        stroke="rgba(0,242,234,0.12)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Arc glow */}
      <ellipse
        cx="32"
        cy="32"
        rx="18"
        ry="7"
        fill="none"
        stroke="rgba(0,242,234,0.5)"
        strokeWidth="1.5"
        className="build-arc"
        style={{ filter: "drop-shadow(0 0 4px rgba(0,242,234,0.6))" }}
      />

      {/* Central core */}
      <circle
        cx="32"
        cy="32"
        fill="rgba(0,242,234,0.3)"
        className="build-core"
        style={{ filter: "drop-shadow(0 0 8px rgba(0,242,234,0.6))" }}
      />

      {/* Orbiting node A */}
      <circle
        r="4"
        fill="rgba(0,242,234,0.9)"
        className="build-orbit-a"
        style={{ filter: "drop-shadow(0 0 5px rgba(0,242,234,0.9))" }}
      />

      {/* Orbiting node B */}
      <circle
        r="4"
        fill="rgba(0,242,234,0.9)"
        className="build-orbit-b"
        style={{ filter: "drop-shadow(0 0 5px rgba(0,242,234,0.9))" }}
      />
    </svg>
  );
}

export function LaunchIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <style>{`
        @keyframes burst {
          0% { stroke-dashoffset: 64; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { stroke-dashoffset: -64; opacity: 0; }
        }
        .launch-line-1 { stroke-dasharray: 64; animation: burst 0.6s ease-in-out infinite; animation-delay: 0s; }
        .launch-line-2 { stroke-dasharray: 50; animation: burst 0.6s ease-in-out infinite; animation-delay: 0.1s; }
        .launch-line-3 { stroke-dasharray: 56; animation: burst 0.6s ease-in-out infinite; animation-delay: 0.2s; }
        .launch-line-4 { stroke-dasharray: 42; animation: burst 0.6s ease-in-out infinite; animation-delay: 0.3s; }
        .launch-line-5 { stroke-dasharray: 48; animation: burst 0.6s ease-in-out infinite; animation-delay: 0.4s; }
      `}</style>

      {/* Line 1 — full width */}
      <line
        x1="0"
        y1="14"
        x2="64"
        y2="14"
        stroke="rgba(0,242,234,0.9)"
        strokeWidth="2"
        strokeLinecap="round"
        className="launch-line-1"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,242,234,0.7))" }}
      />

      {/* Line 2 — slightly shorter */}
      <line
        x1="6"
        y1="24"
        x2="56"
        y2="24"
        stroke="rgba(0,242,234,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="launch-line-2"
      />

      {/* Line 3 — medium */}
      <line
        x1="2"
        y1="34"
        x2="58"
        y2="34"
        stroke="rgba(0,242,234,0.8)"
        strokeWidth="2"
        strokeLinecap="round"
        className="launch-line-3"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,242,234,0.6))" }}
      />

      {/* Line 4 — shorter */}
      <line
        x1="10"
        y1="44"
        x2="52"
        y2="44"
        stroke="rgba(0,242,234,0.6)"
        strokeWidth="1"
        strokeLinecap="round"
        className="launch-line-4"
      />

      {/* Line 5 — medium */}
      <line
        x1="4"
        y1="54"
        x2="52"
        y2="54"
        stroke="rgba(0,242,234,0.75)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="launch-line-5"
      />
    </svg>
  );
}
