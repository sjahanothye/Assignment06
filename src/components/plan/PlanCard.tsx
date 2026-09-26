"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlanItem } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Clock, Flame, Star, X, Check, Dumbbell } from "lucide-react";

interface PlanCardProps {
  item: PlanItem;
  tab: "today" | "saved";
}

export const PlanCard: React.FC<PlanCardProps> = ({ item, tab }) => {
  const { workout, isDone } = item;
  const { removeFromTodayPlan, removeFromSaved, markAsDone } = usePlan();
  const [imageError, setImageError] = useState(false);

  const isToday = tab === "today";

  return (
    <div
      className={`group bg-[#121217] border rounded-2xl p-4 sm:p-5 transition-all duration-200 ${
        isDone ? "border-emerald-700/50 bg-[#0f1412]" : "border-[#1e1e28] hover:border-[#2b2b3a]"
      }`}
      id={`plan-card-${workout.id}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Side: Thumbnail + Info */}
        <div className="flex items-center gap-4">
          <Link
            href={`/workout/${workout.id}`}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#181822] shrink-0 border border-[#222230]"
          >
            {!imageError ? (
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="80px"
                className="object-cover object-center"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#151520] text-zinc-600">
                <Dumbbell className="w-5 h-5" />
              </div>
            )}
            {isDone && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Check className="w-6 h-6 text-[#ccff00] stroke-[3]" />
              </div>
            )}
          </Link>

          <div className="space-y-1">
            <Link
              href={`/workout/${workout.id}`}
              className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide hover:text-[#ccff00] transition-colors block ${
                isDone ? "line-through text-zinc-400" : "text-white"
              }`}
            >
              {workout.name}
            </Link>
            <p className="text-xs text-zinc-400 font-normal">{workout.equipment}</p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-zinc-400" />
                <span>{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-white font-bold">{workout.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons (Figma Layout) */}
        <div className="flex items-center justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c1c26]">
          {/* View Details Link */}
          <Link
            href={`/workout/${workout.id}`}
            id={`view-details-btn-${workout.id}`}
            className="text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider px-3 py-2 transition-colors"
          >
            View Details
          </Link>

          {/* Mark as Done Button (Figma: Bright Lime Button with Check) */}
          {isToday && (
            <button
              onClick={() => markAsDone(workout.id)}
              id={`mark-done-btn-${workout.id}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isDone
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-700/60"
                  : "bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] shadow-sm hover:scale-105 active:scale-95"
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isDone ? "Done" : "Mark as Done"}</span>
            </button>
          )}

          {/* Remove Button (X) */}
          <button
            onClick={() =>
              isToday ? removeFromTodayPlan(workout.id) : removeFromSaved(workout.id)
            }
            id={`remove-plan-btn-${workout.id}`}
            className="p-2 text-zinc-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-[#181822]"
            aria-label="Remove workout"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
