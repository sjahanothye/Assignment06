"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { MetricsSummary } from "@/components/plan/MetricsSummary";
import { PlanCard } from "@/components/plan/PlanCard";
import { EmptyPlanState } from "@/components/plan/EmptyPlanState";
import { PlanTab, SortOption } from "@/types/workout";
import { ChevronDown, Loader2 } from "lucide-react";

export const MyPlanView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { todayPlan, savedWorkouts, metrics, isHydrated } = usePlan();

  const tabParam = searchParams.get("tab") as PlanTab | null;
  const [activeTab, setActiveTab] = useState<PlanTab>(
    tabParam === "saved" ? "saved" : "today"
  );
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (tabParam === "saved" || tabParam === "today") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: PlanTab) => {
    setActiveTab(tab);
    router.replace(`/my-plan?tab=${tab}`);
  };

  const rawList = activeTab === "today" ? todayPlan : savedWorkouts;

  const sortedList = useMemo(() => {
    const list = [...rawList];
    list.sort((a, b) => {
      if (sortBy === "duration") {
        return (b.workout.duration || 0) - (a.workout.duration || 0);
      } else if (sortBy === "calories") {
        return (b.workout.caloriesBurned || 0) - (a.workout.caloriesBurned || 0);
      } else if (sortBy === "rating") {
        return (b.workout.rating || 0) - (a.workout.rating || 0);
      }
      return 0;
    });
    return list;
  }, [rawList, sortBy]);

  return (
    <div className="w-full py-10 md:py-16 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title & Subtitle (Figma: MY PLAN) */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            MY PLAN
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* 1. Metrics Summary Row (Single Container with 3 Stats) */}
        <MetricsSummary
          exercises={isHydrated ? metrics.totalExercises : 0}
          minutes={isHydrated ? metrics.totalMinutes : 0}
          calories={isHydrated ? metrics.totalCalories : 0}
        />

        {/* 2. Tabs Row + Sort Dropdown (Figma Layout) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Tabs on Left */}
          <div className="flex items-center gap-1 bg-[#121217] border border-[#1e1e28] p-1 rounded-xl w-fit">
            <button
              onClick={() => handleTabChange("today")}
              id="tab-today-plan"
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "today"
                  ? "bg-[#222230] text-[#ccff00]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => handleTabChange("saved")}
              id="tab-saved-workouts"
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "saved"
                  ? "bg-[#222230] text-[#ccff00]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort Dropdown on Right */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-[#121217] border border-[#1e1e28] hover:border-[#2f2f40] px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 transition-colors"
            >
              <span className="text-zinc-400">Sort By:</span>
              <span className="text-white capitalize font-bold">{sortBy}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-[#14141d] border border-[#272738] rounded-xl shadow-2xl p-1.5 z-30 space-y-1">
                  {(["duration", "calories", "rating"] as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                        sortBy === opt
                          ? "bg-[#20202e] text-[#ccff00] font-bold"
                          : "text-zinc-300 hover:bg-[#1a1a24] hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 3. Workout Cards List or Empty State */}
        {!isHydrated ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
            <p className="text-sm font-semibold text-zinc-400">Loading workouts…</p>
          </div>
        ) : sortedList.length > 0 ? (
          <div className="space-y-3" id="my-plan-list">
            {sortedList.map((item) => (
              <PlanCard key={item.id} item={item} tab={activeTab} />
            ))}
          </div>
        ) : (
          <EmptyPlanState tab={activeTab} />
        )}
      </div>
    </div>
  );
};
