"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { MetricsSummary } from "@/components/plan/MetricsSummary";
import { PlanCard } from "@/components/plan/PlanCard";
import { EmptyPlanState } from "@/components/plan/EmptyPlanState";
import { PlanTab } from "@/types/workout";
import { Calendar, Bookmark, Sparkles, Loader2 } from "lucide-react";

export const MyPlanView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { todayPlan, savedWorkouts, metrics, isHydrated, planCount, savedCount } = usePlan();

  const tabParam = searchParams.get("tab") as PlanTab | null;
  const [activeTab, setActiveTab] = useState<PlanTab>(
    tabParam === "saved" ? "saved" : "today"
  );

  // Sync tab state with URL parameter
  useEffect(() => {
    if (tabParam === "saved" || tabParam === "today") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: PlanTab) => {
    setActiveTab(tab);
    router.replace(`/my-plan?tab=${tab}`);
  };

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  return (
    <div className="w-full py-10 md:py-16 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title & Subtitle */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
              DAILY LOG & TARGETS
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
            MY PLAN
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* 1. Metrics Summary Row (Live Stat Cards) */}
        <MetricsSummary
          exercises={isHydrated ? metrics.totalExercises : 0}
          minutes={isHydrated ? metrics.totalMinutes : 0}
          calories={isHydrated ? metrics.totalCalories : 0}
        />

        {/* 2. Tabs Switcher: Today's Plan vs Saved */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222230] pb-4">
          <div className="flex items-center gap-2 bg-[#121217] p-1.5 rounded-2xl border border-[#222230] w-full sm:w-auto">
            {/* Today's Plan Tab */}
            <button
              onClick={() => handleTabChange("today")}
              id="tab-today-plan"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-[#09090b] shadow-md shadow-[#ccff00]/10"
                  : "text-zinc-400 hover:text-white hover:bg-[#181822]"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Today&apos;s Plan</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === "today"
                    ? "bg-[#09090b] text-[#ccff00]"
                    : "bg-[#1f1f2c] text-zinc-300"
                }`}
              >
                {isHydrated ? planCount : 0}
              </span>
            </button>

            {/* Saved Tab */}
            <button
              onClick={() => handleTabChange("saved")}
              id="tab-saved-workouts"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-[#09090b] shadow-md shadow-[#ccff00]/10"
                  : "text-zinc-400 hover:text-white hover:bg-[#181822]"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  activeTab === "saved"
                    ? "bg-[#09090b] text-[#ccff00]"
                    : "bg-[#1f1f2c] text-zinc-300"
                }`}
              >
                {isHydrated ? savedCount : 0}
              </span>
            </button>
          </div>

          {/* Quick Tab Info */}
          <div className="text-xs text-zinc-400 font-medium">
            {activeTab === "today"
              ? `${isHydrated ? todayPlan.length : 0} of 5 slots used`
              : `${isHydrated ? savedWorkouts.length : 0} workouts saved`}
          </div>
        </div>

        {/* 3. Workouts List / Loading State / Empty State */}
        {!isHydrated ? (
          /* Loading State Requirement */
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Loading workouts…</p>
          </div>
        ) : currentList.length > 0 ? (
          <div className="space-y-4" id="my-plan-list">
            {currentList.map((item) => (
              <PlanCard key={item.id} item={item} tab={activeTab} />
            ))}
          </div>
        ) : (
          /* Empty State Requirement */
          <EmptyPlanState tab={activeTab} />
        )}
      </div>
    </div>
  );
};
