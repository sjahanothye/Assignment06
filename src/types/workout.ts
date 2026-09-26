export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: number; // in minutes
  caloriesBurned: number; // in kcal
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanItem {
  id: number;
  workout: Workout;
  addedAt: string;
  isDone?: boolean;
  doneAt?: string;
}

export type SortOption = "duration" | "calories" | "rating";
export type SortOrder = "asc" | "desc";
export type PlanTab = "today" | "saved";
export type MuscleFilter = "All" | "Chest" | "Back" | "Legs" | "Core" | "Arms" | "Shoulders" | "Full Body";
