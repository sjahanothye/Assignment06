"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#09090b]">
      <div className="max-w-md space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-950/40 border border-rose-800/60 flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold text-white uppercase">
            SOMETHING WENT WRONG
          </h2>
          <p className="text-sm text-zinc-400">
            An unexpected error occurred while loading this view.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ccff00] text-[#09090b] font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#14141d] border border-[#2b2b3d] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#1c1c28] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
