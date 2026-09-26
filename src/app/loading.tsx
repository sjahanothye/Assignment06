import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#09090b]">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-[#1c1c28] border-t-[#ccff00] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-ping" />
        </div>
      </div>
      <p className="font-display text-base font-bold text-white tracking-widest uppercase">
        LOADING WORKOUTS…
      </p>
      <p className="text-xs text-zinc-500">Preparing today&apos;s strength routine</p>
    </div>
  );
}
