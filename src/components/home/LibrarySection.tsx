"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortOption, MuscleFilter } from "@/types/workout";
import { WorkoutCard } from "@/components/home/WorkoutCard";
import { ChevronDown, Search, Dumbbell, RotateCcw } from "lucide-react";

interface LibrarySectionProps {
  initialWorkouts: Workout[];
  isLoading?: boolean;
}

const MUSCLE_FILTERS: MuscleFilter[] = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Core",
  "Arms",
  "Shoulders",
  "Full Body",
];

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  initialWorkouts,
  isLoading = false,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Filter and sort logic
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...initialWorkouts];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Muscle Group filter
    if (selectedMuscle !== "All") {
      result = result.filter((w) =>
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Sorting (Challenge C1 Requirement)
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "duration") {
        comparison = (a.duration || 0) - (b.duration || 0);
      } else if (sortBy === "calories") {
        comparison = (a.caloriesBurned || 0) - (b.caloriesBurned || 0);
      } else if (sortBy === "rating") {
        comparison = (a.rating || 0) - (b.rating || 0);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [initialWorkouts, searchQuery, selectedMuscle, sortBy, sortOrder]);

  return (
    <section id="library" className="w-full py-10 md:py-16 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
              THE LIBRARY
            </h2>
            <p className="text-sm text-zinc-400 font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown (Challenge C1) */}
          <div className="relative self-start sm:self-auto">
            <button
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              id="sort-dropdown-button"
              className="flex items-center gap-2 bg-[#121217] hover:bg-[#181822] border border-[#1e1e28] hover:border-[#2f2f40] px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 transition-colors shadow-sm"
            >
              <span className="text-zinc-400">Sort By:</span>
              <span className="text-white capitalize font-bold">{sortBy}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                  isSortMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSortMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-[#14141d] border border-[#272738] rounded-xl shadow-2xl p-1.5 z-30 space-y-1">
                  {(["duration", "calories", "rating"] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                        sortBy === option
                          ? "bg-[#20202e] text-[#ccff00] font-bold"
                          : "text-zinc-300 hover:bg-[#1a1a24] hover:text-white"
                      }`}
                    >
                      {option === "duration"
                        ? "Duration"
                        : option === "calories"
                        ? "Calories"
                        : "Rating"}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Category Filter Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-2">
          {MUSCLE_FILTERS.map((muscle) => {
            const isActive = selectedMuscle === muscle;
            return (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all shrink-0 ${
                  isActive
                    ? "bg-[#ccff00] text-[#09090b] shadow-sm font-extrabold"
                    : "bg-[#14141c] hover:bg-[#1c1c28] text-zinc-400 hover:text-white border border-[#22222e]"
                }`}
                id={`filter-muscle-${muscle.toLowerCase().replace(" ", "-")}`}
              >
                {muscle}
              </button>
            );
          })}
        </div>

        {/* Workouts Grid (3x4 Grid on Large Screens, 2-Col Tablet, 1-Col Mobile) */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#121217] border border-[#1e1e28] rounded-2xl overflow-hidden p-0 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] w-full bg-[#181822]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-[#1f1f2e] rounded w-3/4" />
                  <div className="h-3 bg-[#181822] rounded w-1/2" />
                  <div className="h-4 bg-[#1f1f2e] rounded w-full pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedWorkouts.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
            id="library-grid"
          >
            {filteredAndSortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#101015] border border-[#1e1e28] rounded-2xl p-8 space-y-4">
            <Dumbbell className="w-10 h-10 text-zinc-500 mx-auto" />
            <h3 className="font-display text-xl font-bold text-white uppercase">
              No Workouts Found
            </h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedMuscle("All");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ccff00] text-[#09090b] text-xs font-bold uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
