import React from 'react';

export default function ProgressBar({ progress, status, showLabel = false, height = "h-2" }) {
  let barColor = "bg-[#2D5A39]"; // Default Forest Green

  if (status === "Delayed" || status === "HIGH" || status === "At Risk") {
    barColor = "bg-red-600";
  } else if (status === "Pending" || status === "MEDIUM" || status === "Watch" || status === "Attention Needed") {
    barColor = "bg-amber-600";
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-[#4A524A] font-semibold mb-1">
          <span>Completion</span>
          <span className="font-bold text-[#1E231F]">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-[#E5E2DA] rounded-full overflow-hidden ${height}`}>
        <div 
          className={`${barColor} ${height} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
