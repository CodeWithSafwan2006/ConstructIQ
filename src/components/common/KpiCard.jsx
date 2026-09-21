import React from 'react';

export default function KpiCard({ title, value, subtext, trend, icon: Icon, color = "blue", glow = false }) {
  let iconBg = "bg-[#E5EFE2] text-[#2D5A39]";

  if (color === "red") {
    iconBg = "bg-[#FEE2E2] text-[#991B1B]";
  } else if (color === "amber") {
    iconBg = "bg-[#FEF3C7] text-[#92400E]";
  } else if (color === "emerald") {
    iconBg = "bg-[#DCFCE7] text-[#166534]";
  }

  return (
    <div className={`p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between card-shadow-hover ${glow ? 'border-[#FDE68A]' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6E726E]">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl ${iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="text-3xl font-black text-[#1E231F] tracking-tight">{value}</div>
        {subtext && <div className="text-xs font-medium text-[#6E726E] mt-1">{subtext}</div>}
        {trend && <div className="text-xs font-bold text-red-600 mt-0.5">{trend}</div>}
      </div>
    </div>
  );
}
