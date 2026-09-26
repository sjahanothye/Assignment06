"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block bg-[#121217] hover:bg-[#16161f] border border-[#1e1e28] hover:border-[#ccff00]/50 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
      id={`workout-card-${workout.id}`}
    >
      {/* 1. Thumbnail Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181822]">
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
      </div>

      {/* 2. Card Content */}
      <div className="p-5 space-y-3">
        {/* Category Tag Pills (Figma style: Neon Lime Pill with Black Text) */}
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-[#ccff00] text-[#09090b] text-[10px] font-extrabold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase group-hover:text-[#ccff00] transition-colors leading-snug">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-zinc-400 font-normal truncate">
          {workout.equipment}
        </p>

        {/* Stats Row (Figma: Clock 25 min | Flame 180 kcal | Star 4.8) */}
        <div className="pt-2 border-t border-[#1e1e28] flex items-center justify-between text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-zinc-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-300">
            <Star className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-white font-bold">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
