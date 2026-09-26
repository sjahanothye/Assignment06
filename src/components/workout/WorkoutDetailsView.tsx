"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import {
  Clock,
  Flame,
  Star,
  Plus,
  Bookmark,
  Check,
  ArrowLeft,
  Dumbbell,
  Layers,
  Repeat,
  Gauge,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface WorkoutDetailsViewProps {
  workout: Workout;
}

export const WorkoutDetailsView: React.FC<WorkoutDetailsViewProps> = ({ workout }) => {
  const router = useRouter();
  const { addToTodayPlan, saveForLater, isInTodayPlan, isSaved } = usePlan();
  const [imageError, setImageError] = useState(false);

  const inToday = isInTodayPlan(workout.id);
  const inSaved = isSaved(workout.id);

  const difficultyBadge = () => {
    switch (workout.difficulty?.toLowerCase()) {
      case "beginner":
        return "text-emerald-400 bg-emerald-950/50 border-emerald-800/60";
      case "advanced":
        return "text-rose-400 bg-rose-950/50 border-rose-800/60";
      default:
        return "text-amber-400 bg-amber-950/50 border-amber-800/60";
    }
  };

  return (
    <div className="w-full py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121217] hover:bg-[#181822] border border-[#232332] hover:border-[#ccff00]/50 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            id="back-to-workouts-btn"
          >
            <ArrowLeft className="w-4 h-4 text-[#ccff00]" />
            <span>Back to Library</span>
          </Link>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Large Workout Image / Media */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden bg-[#13131b] border border-[#262638] shadow-2xl">
              <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full">
                {!imageError ? (
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#151520] p-8 text-center">
                    <Dumbbell className="w-16 h-16 text-zinc-600 mb-3" />
                    <span className="text-sm font-bold text-zinc-400">{workout.name}</span>
                  </div>
                )}
                {/* Visual Gradient Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Quick Summary Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#0e0e14]/90 backdrop-blur-md border border-[#2b2b3d] rounded-2xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      {workout.muscleGroups.join(" • ")}
                    </p>
                    <p className="text-[11px] text-zinc-400">{workout.equipment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#1a1a26] px-2.5 py-1 rounded-lg border border-[#2e2e42]">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-extrabold text-white">{workout.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workout Details, Specs & Actions */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header: Tags, Title, Subtitle */}
            <div className="space-y-4">
              {/* Category Tag Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {workout.muscleGroups.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#161622] border border-[#2e2e42] text-[#ccff00] text-xs font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={`px-3 py-1 rounded-md border text-xs font-extrabold uppercase tracking-wider ${difficultyBadge()}`}
                >
                  {workout.difficulty}
                </span>
              </div>

              {/* Main Workout Name */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
                {workout.name}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                {workout.description}
              </p>
            </div>

            {/* Key Specs Table / Panel */}
            <div className="bg-[#121218] border border-[#222230] rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#20202e] pb-3">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#ccff00]" />
                  <span>KEY SPECIFICATIONS</span>
                </h3>
                <span className="text-[11px] text-zinc-500 font-medium">Standard Protocol</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Equipment */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Dumbbell className="w-3 h-3 text-cyan-400" /> Equipment
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {workout.equipment}
                  </p>
                </div>

                {/* Difficulty */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Difficulty
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">{workout.difficulty}</p>
                </div>

                {/* Sets */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#ccff00]" /> Sets
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">{workout.sets} Sets</p>
                </div>

                {/* Reps */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Repeat className="w-3 h-3 text-purple-400" /> Reps
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">{workout.reps}</p>
                </div>

                {/* Duration */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-cyan-400" /> Duration
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">{workout.duration} min</p>
                </div>

                {/* Calories */}
                <div className="bg-[#171720] border border-[#242434] p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-amber-400" /> Calories
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-[#121218] border border-[#222230] rounded-2xl p-5 sm:p-6 space-y-4">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#20202e] pb-3">
                <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
                <span>EXECUTION INSTRUCTIONS</span>
              </h3>

              <ol className="space-y-3.5">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-3.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1e1e2c] border border-[#313145] text-[#ccff00] text-xs font-bold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary CTA: Add to Today's Plan */}
              <button
                onClick={() => addToTodayPlan(workout)}
                id="details-add-plan-button"
                className={`flex-1 inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-display text-base font-bold uppercase tracking-wider transition-all duration-200 shadow-lg ${
                  inToday
                    ? "bg-[#1f2d12] text-[#ccff00] border border-[#ccff00]/40 shadow-none"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] shadow-[#ccff00]/20 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {inToday ? (
                  <>
                    <Check className="w-5 h-5 stroke-[2.5]" />
                    <span>In Today&apos;s Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              {/* Secondary CTA: Save for Later */}
              <button
                onClick={() => saveForLater(workout)}
                id="details-save-button"
                className={`inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-display text-base font-bold uppercase tracking-wider border transition-all duration-200 ${
                  inSaved
                    ? "bg-[#181824] text-[#ccff00] border-[#ccff00]/40"
                    : "bg-[#13131b] hover:bg-[#1b1b26] text-zinc-200 hover:text-white border-[#2c2c3e] hover:border-zinc-500 active:scale-[0.98]"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${inSaved ? "fill-[#ccff00] text-[#ccff00]" : ""}`}
                />
                <span>{inSaved ? "Saved in Bookmarks" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
