import { Workout } from "@/types/workout";
import { MOCK_WORKOUTS } from "@/data/mockWorkouts";

const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const SECONDARY_API = "https://api.api-store.workers.dev/api/fitlog";

/**
 * Fetch all workouts with robust fallback
 */
export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(PRIMARY_API, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const workouts = Array.isArray(data) ? data : data.data || data.workouts || [];
      if (workouts.length > 0) return workouts;
    }
  } catch (error) {
    console.warn("Primary API failed, trying secondary API...", error);
  }

  try {
    const res = await fetch(SECONDARY_API, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const workouts = Array.isArray(data) ? data : data.data || data.workouts || [];
      if (workouts.length > 0) return workouts;
    }
  } catch (error) {
    console.warn("Secondary API failed, using fallback mock data...", error);
  }

  // Resilient fallback
  return MOCK_WORKOUTS;
}

/**
 * Fetch a single workout by id with robust fallback
 */
export async function getWorkoutById(id: number | string): Promise<Workout | null> {
  const numericId = Number(id);

  try {
    const res = await fetch(`${PRIMARY_API}/${numericId}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const workout = data.data || data;
      if (workout && workout.id) return workout;
    }
  } catch (error) {
    console.warn(`Primary API for item ${id} failed, trying secondary...`, error);
  }

  try {
    const res = await fetch(`${SECONDARY_API}/${numericId}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      const workout = data.data || data;
      if (workout && workout.id) return workout;
    }
  } catch (error) {
    console.warn(`Secondary API for item ${id} failed, using local mock...`, error);
  }

  const found = MOCK_WORKOUTS.find((w) => w.id === numericId);
  return found || null;
}
