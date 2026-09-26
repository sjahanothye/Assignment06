"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout, PlanItem } from "@/types/workout";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface PlanMetrics {
  totalExercises: number;
  totalMinutes: number;
  totalCalories: number;
}

interface PlanContextType {
  todayPlan: PlanItem[];
  savedWorkouts: PlanItem[];
  planCount: number;
  savedCount: number;
  metrics: PlanMetrics;
  isHydrated: boolean;
  addToTodayPlan: (workout: Workout) => boolean;
  saveForLater: (workout: Workout) => boolean;
  removeFromTodayPlan: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
  markAsDone: (workoutId: number) => void;
  moveToTodayPlan: (workout: Workout) => boolean;
  isInTodayPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEY_TODAY = "fitlog_today_plan_v1";
const STORAGE_KEY_SAVED = "fitlog_saved_workouts_v1";
const MAX_TODAY_PLAN = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<PlanItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedToday = localStorage.getItem(STORAGE_KEY_TODAY);
      const savedSaved = localStorage.getItem(STORAGE_KEY_SAVED);

      if (savedToday) {
        setTodayPlan(JSON.parse(savedToday));
      }
      if (savedSaved) {
        setSavedWorkouts(JSON.parse(savedSaved));
      }
    } catch (e) {
      console.error("Failed to load plans from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_TODAY, JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to save today's plan to localStorage", e);
    }
  }, [todayPlan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Failed to save saved workouts to localStorage", e);
    }
  }, [savedWorkouts, isHydrated]);

  const isInTodayPlan = (workoutId: number) => {
    return todayPlan.some((item) => item.workout.id === workoutId);
  };

  const isSaved = (workoutId: number) => {
    return savedWorkouts.some((item) => item.workout.id === workoutId);
  };

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan!`, {
        description: "Check your My Plan page to view details.",
      });
      return false;
    }

    if (todayPlan.length >= MAX_TODAY_PLAN) {
      toast.warning("Daily limit reached! (Max 5 lifts)", {
        description: "Finish or remove a workout from today's plan to add more.",
      });
      return false;
    }

    const newItem: PlanItem = {
      id: Date.now(),
      workout,
      addedAt: new Date().toISOString(),
      isDone: false,
    };

    setTodayPlan((prev) => [...prev, newItem]);
    toast.success(`Added to today's plan!`, {
      description: `${workout.name} (${workout.duration} min • ${workout.caloriesBurned} kcal)`,
    });
    return true;
  };

  const saveForLater = (workout: Workout): boolean => {
    if (isSaved(workout.id)) {
      toast.info(`"${workout.name}" is already in your saved list!`, {
        description: "You can find it under the Saved tab in My Plan.",
      });
      return false;
    }

    const newItem: PlanItem = {
      id: Date.now(),
      workout,
      addedAt: new Date().toISOString(),
      isDone: false,
    };

    setSavedWorkouts((prev) => [...prev, newItem]);
    toast.success(`Saved for later!`, {
      description: `${workout.name} added to your bookmarks.`,
    });
    return true;
  };

  const removeFromTodayPlan = (workoutId: number) => {
    const itemToRemove = todayPlan.find((item) => item.workout.id === workoutId);
    setTodayPlan((prev) => prev.filter((item) => item.workout.id !== workoutId));
    if (itemToRemove) {
      toast.error(`Removed from today's plan`, {
        description: itemToRemove.workout.name,
      });
    }
  };

  const removeFromSaved = (workoutId: number) => {
    const itemToRemove = savedWorkouts.find((item) => item.workout.id === workoutId);
    setSavedWorkouts((prev) => prev.filter((item) => item.workout.id !== workoutId));
    if (itemToRemove) {
      toast.error(`Removed from saved workouts`, {
        description: itemToRemove.workout.name,
      });
    }
  };

  const markAsDone = (workoutId: number) => {
    let wasMarked = false;
    let workoutName = "";

    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.workout.id === workoutId) {
          const nextDone = !item.isDone;
          wasMarked = nextDone;
          workoutName = item.workout.name;
          return {
            ...item,
            isDone: nextDone,
            doneAt: nextDone ? new Date().toISOString() : undefined,
          };
        }
        return item;
      })
    );

    if (wasMarked) {
      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ccff00", "#10b981", "#38bdf8", "#ffffff"],
        });
      } catch {
        // ignore if not supported
      }

      toast.success(`Workout completed! Great work! 💪`, {
        description: `${workoutName} marked as done.`,
      });
    } else {
      toast.info(`Marked as pending`, {
        description: `${workoutName} reopened.`,
      });
    }
  };

  const moveToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan!`);
      return false;
    }

    if (todayPlan.length >= MAX_TODAY_PLAN) {
      toast.warning("Daily limit reached! (Max 5 lifts)", {
        description: "Finish or remove a workout from today's plan first.",
      });
      return false;
    }

    // Add to today
    const newItem: PlanItem = {
      id: Date.now(),
      workout,
      addedAt: new Date().toISOString(),
      isDone: false,
    };
    setTodayPlan((prev) => [...prev, newItem]);

    // Remove from saved
    setSavedWorkouts((prev) => prev.filter((item) => item.workout.id !== workout.id));

    toast.success(`Moved to today's plan!`, {
      description: workout.name,
    });
    return true;
  };

  // Metrics calculation
  const metrics: PlanMetrics = {
    totalExercises: todayPlan.length,
    totalMinutes: todayPlan.reduce((sum, item) => sum + (item.workout.duration || 0), 0),
    totalCalories: todayPlan.reduce((sum, item) => sum + (item.workout.caloriesBurned || 0), 0),
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        planCount: todayPlan.length,
        savedCount: savedWorkouts.length,
        metrics,
        isHydrated,
        addToTodayPlan,
        saveForLater,
        removeFromTodayPlan,
        removeFromSaved,
        markAsDone,
        moveToTodayPlan,
        isInTodayPlan,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
