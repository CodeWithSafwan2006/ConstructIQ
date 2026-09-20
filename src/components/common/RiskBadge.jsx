import React from 'react';

export default function RiskBadge({ level, text, size = "md" }) {
  const lvl = (level || "").toUpperCase();

  let colors = "bg-[#F7F5F0] text-[#4A524A] border-[#E5E2DA]";

  if (lvl === "HIGH" || lvl === "AT RISK" || lvl === "DELAYED") {
    colors = "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]";
  } else if (lvl === "MEDIUM" || lvl === "WATCH" || lvl === "ATTENTION NEEDED" || lvl === "PENDING" || lvl === "LOW STOCK") {
    colors = "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
  } else if (lvl === "LOW" || lvl === "ON TRACK" || lvl === "COMPLETED" || lvl === "OK" || lvl === "RESOLVED") {
    colors = "bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]";
  }

  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center font-bold rounded-full border shadow-2xs ${colors} ${padding}`}>
      {text || level}
    </span>
  );
}
