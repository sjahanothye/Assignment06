import { getWorkoutById, getAllWorkouts } from "@/services/api";
import { WorkoutDetailsView } from "@/components/workout/WorkoutDetailsView";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const workouts = await getAllWorkouts();
  return workouts.map((w) => ({
    id: w.id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    return {
      title: "Workout Not Found — FitLog",
    };
  }

  return {
    title: `${workout.name} — FitLog Exercise Details`,
    description: workout.description,
    openGraph: {
      title: `${workout.name} — FitLog`,
      description: workout.description,
      images: [workout.image],
    },
  };
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#09090b]">
      <WorkoutDetailsView workout={workout} />
    </div>
  );
}
