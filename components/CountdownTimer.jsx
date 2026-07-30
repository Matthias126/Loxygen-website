import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const total = new Date(targetDate).getTime() - Date.now();
  if (total <= 0) return null;

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const PLACEHOLDER_SEGMENTS = [
  { value: 0, label: "days" },
  { value: 0, label: "hrs" },
  { value: 0, label: "min" },
  { value: 0, label: "sec" },
];

export default function CountdownTimer({
  targetDate,
  variant = "dark",
  expiredLabel = "Happening now",
}) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const numberClass = variant === "dark" ? "text-white" : "text-brand-navy";
  const labelClass = variant === "dark" ? "text-white/60" : "text-slate-500";

  if (mounted && !timeLeft) {
    return <p className={`text-lg font-semibold ${numberClass}`}>{expiredLabel}</p>;
  }

  const segments = mounted
    ? [
        { value: timeLeft.days, label: "days" },
        { value: timeLeft.hours, label: "hrs" },
        { value: timeLeft.minutes, label: "min" },
        { value: timeLeft.seconds, label: "sec" },
      ]
    : PLACEHOLDER_SEGMENTS;

  return (
    <div className={`flex justify-center gap-6 sm:gap-10 ${mounted ? "" : "invisible"}`}>
      {segments.map((segment) => (
        <div key={segment.label} className="text-center">
          <p
            className={`font-display text-3xl tabular-nums sm:text-4xl ${numberClass}`}
          >
            {String(segment.value).padStart(2, "0")}
          </p>
          <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
            {segment.label}
          </p>
        </div>
      ))}
    </div>
  );
}
