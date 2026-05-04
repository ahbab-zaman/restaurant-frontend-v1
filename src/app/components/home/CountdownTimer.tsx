"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetHours?: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({
  targetHours = 8,
}: CountdownTimerProps) {
  const [secs, setSecs] = useState(targetHours * 3600);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <div
      className="flex items-center gap-1 text-xs "
      aria-label={`Offer expires in ${h} hours ${m} minutes ${s} seconds`}
    >
      <span className="text-amber-400/80">⏱</span>
      <span className="text-neutral-600">Ends in</span>
      <span className="text-amber-600 font-semibold">
        {pad(h)}:{pad(m)}:{pad(s)}
      </span>
    </div>
  );
}
