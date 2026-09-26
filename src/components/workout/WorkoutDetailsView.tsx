"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import {
  Calendar,
  Bookmark,
  Check,
  ArrowLeft,
  Dumbbell,
} from "lucide-react";

interface WorkoutDetailsViewProps {
  workout: Workout;
}

export const WorkoutDetailsView: React.FC<WorkoutDetailsViewProps> = ({ workout }) => {
  const { addToTodayPlan, saveForLater, isInTodayPlan, isSaved } = usePlan();
  const [imageError, setImageError] = useState(false);

  const inToday = isInTodayPlan(workout.id);
  const inSaved = isSaved(workout.id);

  const specRows = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toString() },
  ];

  return (
    <div className="w-full py-10 md:py-16 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#ccff00] transition-colors"
            id="back-to-workouts-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workouts</span>
          </Link>
        </div>

        {/* Two-Column Layout (Matching Figma) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Large Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/4.2] sm:aspect-[4/4] lg:aspect-[4/4.2] w-full rounded-2xl overflow-hidden bg-[#13131a] border border-[#1e1e28] shadow-2xl">
              {!imageError ? (
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#151520] p-8 text-center">
                  <Dumbbell className="w-16 h-16 text-zinc-600 mb-3" />
                  <span className="text-sm font-bold text-zinc-400">{workout.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Tags, Specs Table, Instructions, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
                {workout.name}
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
                {workout.description}
              </p>

              {/* Category Tags (Figma: Neon Lime Pills with Black Text) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {workout.muscleGroups.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 rounded-full bg-[#ccff00] text-[#09090b] text-xs font-extrabold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Specs Table Panel (Matching Figma) */}
            <div className="bg-[#121217] border border-[#1e1e28] rounded-xl overflow-hidden divide-y divide-[#1b1b26]">
              {specRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-3 text-xs"
                >
                  <span className="font-bold text-zinc-400 tracking-wider">
                    {row.label}
                  </span>
                  <span className="font-medium text-zinc-200">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Instructions Section (Matching Figma) */}
            <div className="space-y-3 pt-2">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-zinc-300">
                {workout.instructions.map((step, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-zinc-500 font-bold shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Call to Action Buttons (Matching Figma) */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary: Add to Today's Plan */}
              <button
                onClick={() => addToTodayPlan(workout)}
                id="details-add-plan-button"
                className={`flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  inToday
                    ? "bg-[#1f2d12] text-[#ccff00] border border-[#ccff00]/40"
                    : "bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] shadow-md shadow-[#ccff00]/10 hover:scale-[1.01] active:scale-[0.99]"
                }`}
              >
                {inToday ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>In Today&apos;s Plan</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Add to today&apos;s plan</span>
                  </>
                )}
              </button>

              {/* Secondary: Save for Later */}
              <button
                onClick={() => saveForLater(workout)}
                id="details-save-button"
                className={`inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-display text-sm font-bold uppercase tracking-wider border transition-all duration-200 ${
                  inSaved
                    ? "bg-[#181824] text-[#ccff00] border-[#ccff00]/40"
                    : "bg-[#13131b] hover:bg-[#1b1b26] text-zinc-300 hover:text-white border-[#272738] active:scale-[0.99]"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${inSaved ? "fill-[#ccff00] text-[#ccff00]" : ""}`} />
                <span>{inSaved ? "Saved" : "Save for later"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
