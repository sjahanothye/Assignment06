"use client";

import React from "react";
import { Dumbbell, Clock, Flame } from "lucide-react";

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {/* 1. Total Exercises */}
      <div className="bg-[#121218] border border-[#222230] rounded-2xl p-6 relative overflow-hidden group hover:border-[#ccff00]/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Exercises
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
            <Dumbbell className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {exercises}
          </span>
          <span className="text-xs font-semibold text-zinc-500">/ 5 max</span>
        </div>
        {/* Progress Bar towards 5 lifts cap */}
        <div className="w-full h-1.5 bg-[#1b1b26] rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ccff00] to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((exercises / 5) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Total Minutes */}
      <div className="bg-[#121218] border border-[#222230] rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Minutes
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {minutes}
          </span>
          <span className="text-xs font-semibold text-zinc-500">estimated</span>
        </div>
        <div className="w-full h-1.5 bg-[#1b1b26] rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((minutes / 90) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* 3. Total Calories */}
      <div className="bg-[#121218] border border-[#222230] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Calories
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {calories}
          </span>
          <span className="text-xs font-semibold text-zinc-500">kcal target</span>
        </div>
        <div className="w-full h-1.5 bg-[#1b1b26] rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((calories / 600) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
