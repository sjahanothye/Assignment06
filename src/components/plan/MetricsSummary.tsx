"use client";

import React from "react";

interface MetricsSummaryProps {
  exercises: number;
  minutes: number;
  calories: number;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({
  exercises,
  minutes,
  calories,
}) => {
  return (
    <div className="bg-[#121217] border border-[#1e1e28] rounded-2xl p-6 sm:p-8">
      <div className="grid grid-cols-3 divide-x divide-[#1e1e28]">
        {/* 1. Exercises */}
        <div className="space-y-1 text-center sm:text-left sm:pl-4">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Exercises
          </p>
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {exercises}
          </p>
        </div>

        {/* 2. Minutes */}
        <div className="space-y-1 text-center sm:text-left pl-4 sm:pl-8">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Minutes
          </p>
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {minutes}
          </p>
        </div>

        {/* 3. Calories */}
        <div className="space-y-1 text-center sm:text-left pl-4 sm:pl-8">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Calories
          </p>
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            {calories}
          </p>
        </div>
      </div>
    </div>
  );
};
