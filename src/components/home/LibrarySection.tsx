"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortOption, MuscleFilter } from "@/types/workout";
import { WorkoutCard } from "@/components/home/WorkoutCard";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  Dumbbell,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

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

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q)) ||
          w.difficulty.toLowerCase().includes(q)
      );
    }

    // 2. Muscle Group filter
    if (selectedMuscle !== "All") {
      result = result.filter((w) =>
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // 3. Sorting (Challenge C1 Requirement)
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

  const sortLabelMap: Record<SortOption, string> = {
    duration: "Duration (Time)",
    calories: "Calories Burned",
    rating: "Rating (Stars)",
  };

  return (
    <section id="library" className="w-full py-16 md:py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#22222f]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
                Curated Collection
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
              THE LIBRARY
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search & Challenge C1 Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lifts, equipment..."
                className="w-full bg-[#121217] border border-[#272738] focus:border-[#ccff00] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ccff00] transition-all"
                id="library-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Challenge C1: Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                id="sort-dropdown-button"
                className="w-full sm:w-auto flex items-center justify-between gap-2.5 bg-[#121217] hover:bg-[#181822] border border-[#272738] hover:border-[#ccff00]/60 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span className="text-zinc-400">Sort By:</span>
                  <span className="text-[#ccff00] font-bold">
                    {sortBy === "duration"
                      ? "Duration"
                      : sortBy === "calories"
                      ? "Calories"
                      : "Rating"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    isSortMenuOpen ? "rotate-180 text-[#ccff00]" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isSortMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsSortMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-[#13131b] border border-[#2b2b3d] rounded-xl shadow-2xl p-2 z-30 space-y-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-[#222230]">
                      Sort Workouts By
                    </div>
                    {(["duration", "calories", "rating"] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          sortBy === option
                            ? "bg-[#222230] text-[#ccff00] font-bold"
                            : "text-zinc-300 hover:bg-[#1b1b24] hover:text-white"
                        }`}
                        id={`sort-option-${option}`}
                      >
                        <span>{sortLabelMap[option]}</span>
                        {sortBy === option && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                        )}
                      </button>
                    ))}

                    {/* Sort Order Toggle (High to Low / Low to High) */}
                    <div className="pt-1 border-t border-[#222230] flex items-center justify-between px-3 py-1.5 text-[11px]">
                      <span className="text-zinc-400 font-medium">Order:</span>
                      <button
                        onClick={() =>
                          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                        className="text-[#ccff00] hover:underline font-bold"
                      >
                        {sortOrder === "desc" ? "Highest First ↓" : "Lowest First ↑"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Muscle Group Filter Tabs */}
        <div className="py-6 overflow-x-auto no-scrollbar flex items-center gap-2">
          {MUSCLE_FILTERS.map((muscle) => {
            const isActive = selectedMuscle === muscle;
            return (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all shrink-0 ${
                  isActive
                    ? "bg-[#ccff00] text-[#09090b] shadow-md shadow-[#ccff00]/10"
                    : "bg-[#121217] hover:bg-[#191922] text-zinc-400 hover:text-white border border-[#222230]"
                }`}
                id={`filter-muscle-${muscle.toLowerCase().replace(" ", "-")}`}
              >
                {muscle}
              </button>
            );
          })}
        </div>

        {/* Workouts Grid (3x4 Grid on Desktop, 2-Col Tablet, 1-Col Mobile) */}
        {isLoading ? (
          /* Loading Animation Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#121217] border border-[#22222f] rounded-2xl overflow-hidden p-0 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] w-full bg-[#1c1c28]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-[#1f1f2e] rounded w-3/4" />
                  <div className="h-3 bg-[#181822] rounded w-1/2" />
                  <div className="h-4 bg-[#1f1f2e] rounded w-full pt-2" />
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-9 bg-[#1f1f2e] rounded-xl" />
                    <div className="h-9 bg-[#181822] rounded-xl" />
                  </div>
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
          /* No Results Found State */
          <div className="py-20 text-center bg-[#101015] border border-[#20202d] rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#2a2a3a] flex items-center justify-center mx-auto text-zinc-500">
              <Dumbbell className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold text-white uppercase">
                No Workouts Match Your Filter
              </h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                Try searching for another keyword or reset your filter to view all 12 lifts.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedMuscle("All");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccff00] text-[#09090b] text-xs font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
