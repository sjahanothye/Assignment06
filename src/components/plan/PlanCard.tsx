"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlanItem } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import {
  Clock,
  Flame,
  Star,
  Check,
  Trash2,
  ExternalLink,
  Dumbbell,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react";

interface PlanCardProps {
  item: PlanItem;
  tab: "today" | "saved";
}

export const PlanCard: React.FC<PlanCardProps> = ({ item, tab }) => {
  const { workout, isDone } = item;
  const { removeFromTodayPlan, removeFromSaved, markAsDone, moveToTodayPlan, isInTodayPlan } =
    usePlan();
  const [imageError, setImageError] = useState(false);

  const isToday = tab === "today";
  const inToday = isInTodayPlan(workout.id);

  return (
    <div
      className={`group relative bg-[#121218] border rounded-2xl p-4 sm:p-5 transition-all duration-300 ${
        isDone
          ? "border-emerald-500/40 bg-[#0f1712]/70 shadow-sm"
          : "border-[#222230] hover:border-[#353548] hover:bg-[#151520]"
      }`}
      id={`plan-card-${workout.id}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Thumbnail + Details */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Thumbnail */}
          <Link
            href={`/workout/${workout.id}`}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#181822] shrink-0 border border-[#272738] group-hover:border-[#ccff00]/40 transition-colors"
          >
            {!imageError ? (
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                sizes="96px"
                className={`object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
                  isDone ? "grayscale-[40%] opacity-80" : ""
                }`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#151520] text-zinc-600">
                <Dumbbell className="w-6 h-6" />
              </div>
            )}
            {isDone && (
              <div className="absolute inset-0 bg-emerald-950/60 flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
              </div>
            )}
          </Link>

          {/* Info */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/workout/${workout.id}`}
                className={`font-display text-base sm:text-lg font-bold tracking-wide uppercase transition-colors hover:text-[#ccff00] truncate block ${
                  isDone ? "line-through text-zinc-400" : "text-white"
                }`}
              >
                {workout.name}
              </Link>
              {isDone && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[10px] font-extrabold uppercase shrink-0">
                  DONE
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-400 truncate">
              <span className="text-zinc-500 font-medium">Equipment:</span>
              <span className="text-zinc-300 font-medium">{workout.equipment}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs font-semibold pt-1">
              <div className="flex items-center gap-1 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-300">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold">{workout.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1f1f2d]">
          {/* View Details Button */}
          <Link
            href={`/workout/${workout.id}`}
            id={`view-details-btn-${workout.id}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#171722] hover:bg-[#20202e] border border-[#29293a] text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            title="View Details"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden xs:inline">View Details</span>
          </Link>

          {/* If on Saved tab: Move to Today's Plan button */}
          {!isToday && (
            <button
              onClick={() => moveToTodayPlan(workout)}
              disabled={inToday}
              id={`move-to-today-btn-${workout.id}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                inToday
                  ? "bg-[#182312] text-[#ccff00] border border-[#ccff00]/30 cursor-default"
                  : "bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] shadow-sm active:scale-95"
              }`}
              title="Add to Today's Plan"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>{inToday ? "In Plan" : "Add to Plan"}</span>
            </button>
          )}

          {/* Challenge C3: Mark as Done Button (For Today's Plan) */}
          {isToday && (
            <button
              onClick={() => markAsDone(workout.id)}
              id={`mark-done-btn-${workout.id}`}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isDone
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                  : "bg-[#1b1b26] hover:bg-[#242434] text-zinc-200 hover:text-[#ccff00] border border-[#2d2d3e]"
              }`}
              title={isDone ? "Completed! Click to unmark" : "Mark as Done"}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isDone ? "text-emerald-400" : "text-zinc-400"}`}
              />
              <span>{isDone ? "Done" : "Mark Done"}</span>
            </button>
          )}

          {/* Challenge C3: Remove (X) Button */}
          <button
            onClick={() =>
              isToday ? removeFromTodayPlan(workout.id) : removeFromSaved(workout.id)
            }
            id={`remove-plan-btn-${workout.id}`}
            className="p-2 rounded-xl bg-[#171722] hover:bg-rose-950/40 border border-[#29293a] hover:border-rose-700/60 text-zinc-400 hover:text-rose-400 transition-colors"
            title="Remove"
            aria-label="Remove workout"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
