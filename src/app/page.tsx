import { getAllWorkouts } from "@/services/api";
import { HeroBanner } from "@/components/home/HeroBanner";
import { LibrarySection } from "@/components/home/LibrarySection";

export const revalidate = 60;

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">
      {/* 1. Hero / Banner Top Section */}
      <HeroBanner />

      {/* 2. The Library 3x4 Grid Section */}
      <LibrarySection initialWorkouts={workouts} />
    </div>
  );
}
