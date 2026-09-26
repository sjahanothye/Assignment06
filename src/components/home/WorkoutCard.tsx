"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Clock, Flame, Star, Plus, Check, Bookmark, ArrowUpRight, Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { addToTodayPlan, saveForLater, isInTodayPlan, isSaved } = usePlan();
  const [imageError, setImageError] = useState(false);

  const inToday = isInTodayPlan(workout.id);
  const inSaved = isSaved(workout.id);

  // Difficulty color styling
  const difficultyBadge = () => {
    switch (workout.difficulty?.toLowerCase()) {
      case "beginner":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-800/50";
      case "advanced":
        return "text-rose-400 bg-rose-950/40 border-rose-800/50";
      default:
        return "text-amber-400 bg-amber-950/40 border-amber-800/50";
    }
  };

  return (
    <div className="group workout-card flex flex-col justify-between bg-[#121217] hover:bg-[#16161f] border border-[#22222f] hover:border-[#ccff00]/40 rounded-2xl overflow-hidden transition-all duration-300">
      <div>
        {/* Card Media Header */}
        <Link
          href={`/workout/${workout.id}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-[#181822] cursor-pointer"
          id={`workout-card-img-${workout.id}`}
        >
          {!imageError ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#181824] text-zinc-500 p-4 text-center">
              <Dumbbell className="w-10 h-10 text-zinc-600 mb-2" />
              <span className="text-xs font-semibold text-zinc-400">{workout.name}</span>
            </div>
          )}

          {/* Dark Overlay gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

          {/* Muscle Group Tags (Top Left) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-[#09090b]/80 backdrop-blur-md border border-[#313144] text-[#ccff00] text-[11px] font-bold uppercase tracking-wider shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Difficulty Badge (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`px-2.5 py-0.5 rounded-md border text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${difficultyBadge()}`}
            >
              {workout.difficulty}
            </span>
          </div>

          {/* Hover View Indicator */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="w-8 h-8 rounded-full bg-[#ccff00] text-[#09090b] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4 font-bold" />
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <Link href={`/workout/${workout.id}`} className="block group-hover:text-[#ccff00] transition-colors">
            <h3 className="font-display text-xl font-bold text-white tracking-wide leading-snug line-clamp-1 uppercase">
              {workout.name}
            </h3>
          </Link>

          {/* Equipment Line */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="text-zinc-500 font-medium">Equipment:</span>
            <span className="text-zinc-300 font-medium truncate">{workout.equipment}</span>
          </div>

          {/* Stats Row with Icons */}
          <div className="pt-2 border-t border-[#1e1e2b] grid grid-cols-3 gap-2 text-xs font-semibold">
            {/* Duration */}
            <div className="flex items-center gap-1.5 text-zinc-300" title="Duration">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5 text-zinc-300" title="Calories Burned">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-end gap-1 text-zinc-300" title="Rating">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
              <span className="text-white font-bold">{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2">
        {/* Add to Today's Plan Button */}
        <button
          onClick={() => addToTodayPlan(workout)}
          disabled={inToday}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            inToday
              ? "bg-[#1d2b12] text-[#ccff00] border border-[#ccff00]/40 cursor-default"
              : "bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          }`}
          title={inToday ? "Already in today's plan" : "Add to Today's Plan"}
          id={`add-plan-btn-${workout.id}`}
        >
          {inToday ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>In Plan</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add Plan</span>
            </>
          )}
        </button>

        {/* Save for Later Button */}
        <button
          onClick={() => saveForLater(workout)}
          disabled={inSaved}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
            inSaved
              ? "bg-[#181824] text-[#ccff00] border-[#ccff00]/30 cursor-default"
              : "bg-[#171722] hover:bg-[#20202e] text-zinc-300 hover:text-white border-[#2c2c3e] hover:border-zinc-500"
          }`}
          title={inSaved ? "Already in saved workouts" : "Save for Later"}
          id={`save-btn-${workout.id}`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${inSaved ? "fill-[#ccff00] text-[#ccff00]" : ""}`} />
          <span>{inSaved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
};
