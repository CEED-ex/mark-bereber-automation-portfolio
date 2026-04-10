import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";

function useOdometer(target: number, duration = 600): number {
  const [displayed, setDisplayed] = useState(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef<number>(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;

    if (from === to) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    startRef.current = null;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(from + (to - from) * eased);
      setDisplayed(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  useEffect(() => {
    fromRef.current = displayed;
  });

  return displayed;
}

function formatRevenue(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function ROICalculator() {
  const [manualHours, setManualHours] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(100);

  // Hours saved per month = manual hours/week * 4 weeks * 75% automation efficiency
  const hoursSavedRaw = manualHours * 4 * 0.75;
  // Revenue reclaimed = hours saved * hourly rate
  const revenueReclaimedRaw = hoursSavedRaw * hourlyRate;

  const hoursSaved = useOdometer(Math.round(hoursSavedRaw), 600);
  const revenueReclaimed = useOdometer(Math.round(revenueReclaimedRaw), 600);

  return (
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      data-ocid="roi_calculator.section"
    >
      <div
        className="rounded-3xl p-8 sm:p-12"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(0,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "0 4px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,255,255,0.06) inset",
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-3"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}
          >
            Calculate Your ROI
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Move the sliders to see how much time and revenue you could reclaim
            each month.
          </p>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          {/* Hours lost per week */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label
                className="text-sm font-semibold text-white"
                htmlFor="manual-hours"
              >
                Hours lost per week to manual tasks
              </label>
              <span
                className="text-sm font-bold px-2.5 py-1 rounded-lg"
                style={{
                  color: "#00F2EA",
                  background: "rgba(0,242,234,0.08)",
                  border: "1px solid rgba(0,242,234,0.2)",
                  minWidth: 42,
                  textAlign: "center",
                }}
                data-ocid="roi_calculator.input"
              >
                {manualHours} hrs
              </span>
            </div>
            <Slider
              id="manual-hours"
              min={1}
              max={40}
              step={1}
              value={[manualHours]}
              onValueChange={(val) => setManualHours(val[0])}
              className="w-full"
              data-ocid="roi_calculator.input"
            />
            <div
              className="flex justify-between text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <span>1 hr</span>
              <span>40 hrs</span>
            </div>
          </div>

          {/* Hourly value slider */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label
                className="text-sm font-semibold text-white"
                htmlFor="hourly-rate"
              >
                Your average hourly value
              </label>
              <span
                className="text-sm font-bold px-2.5 py-1 rounded-lg"
                style={{
                  color: "#00F2EA",
                  background: "rgba(0,242,234,0.08)",
                  border: "1px solid rgba(0,242,234,0.2)",
                  minWidth: 54,
                  textAlign: "center",
                }}
                data-ocid="roi_calculator.input"
              >
                ${hourlyRate}
              </span>
            </div>
            <Slider
              id="hourly-rate"
              min={25}
              max={500}
              step={25}
              value={[hourlyRate]}
              onValueChange={(val) => setHourlyRate(val[0])}
              className="w-full"
              data-ocid="roi_calculator.input"
            />
            <div
              className="flex justify-between text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <span>$25/hr</span>
              <span>$500/hr</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-10 rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,255,255,0.2), transparent)",
          }}
        />

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hours Saved */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,255,255,0.07) 0%, rgba(0,0,0,0.15) 100%)",
              border: "1px solid rgba(0,255,255,0.15)",
              boxShadow: "0 0 24px rgba(0,242,234,0.08)",
            }}
            data-ocid="roi_calculator.card"
          >
            <div
              className="text-5xl font-extrabold tracking-tight mb-2"
              style={{
                color: "#00F2EA",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 20px rgba(0,242,234,0.4)",
                letterSpacing: "-0.03em",
              }}
            >
              {hoursSaved}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Hours Saved Per Month
            </div>
          </div>

          {/* Revenue Reclaimed */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,255,255,0.07) 0%, rgba(0,0,0,0.15) 100%)",
              border: "1px solid rgba(0,255,255,0.15)",
              boxShadow: "0 0 24px rgba(0,242,234,0.08)",
            }}
            data-ocid="roi_calculator.card"
          >
            <div
              className="text-5xl font-extrabold tracking-tight mb-2"
              style={{
                color: "#00F2EA",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 20px rgba(0,242,234,0.4)",
                letterSpacing: "-0.03em",
              }}
            >
              {formatRevenue(revenueReclaimed)}
            </div>
            <div
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Potential Revenue Reclaimed
            </div>
          </div>
        </div>

        {/* Formula note */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Based on 75% automation efficiency &middot; reclaimed hours × your
          hourly value
        </p>
      </div>
    </div>
  );
}
