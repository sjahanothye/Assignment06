"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface EmptyPlanStateProps {
  tab: "today" | "saved";
}

export const EmptyPlanState: React.FC<EmptyPlanStateProps> = ({ tab }) => {
  const isToday = tab === "today";

  return (
    <div className="w-full py-16 sm:py-24 bg-[#111116] border border-[#22222f] rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-[#171722] border border-[#2a2a3c] flex items-center justify-center text-zinc-500 shadow-inner">
        <Dumbbell className="w-10 h-10 text-zinc-500" />
      </div>

      {/* Main Heading */}
      <div className="space-y-2 max-w-md">
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
          NOTHING HERE YET
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {isToday
            ? "Browse the library and add a lift to get today moving."
            : "You have not bookmarked any lifts yet. Save workouts to quickly access them later."}
        </p>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Link
          href="/#library"
          id="empty-plan-cta-button"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#ccff00]/10 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Go to workouts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
