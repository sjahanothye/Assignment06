import { Suspense } from "react";
import { Metadata } from "next";
import { MyPlanView } from "@/components/plan/MyPlanView";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Plan — FitLog Daily Workout Log",
  description: "Manage today's planned lifts, track calories & duration, and bookmark workouts.",
};

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Loading workouts…</p>
        </div>
      }
    >
      <MyPlanView />
    </Suspense>
  );
}
