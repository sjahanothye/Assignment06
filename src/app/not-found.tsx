import Link from "next/link";
import { Dumbbell, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center bg-[#09090b]">
      <div className="max-w-md space-y-6">
        {/* Visual Graphic */}
        <div className="relative mx-auto w-28 h-28 rounded-3xl bg-[#12121a] border border-[#272738] flex items-center justify-center text-zinc-600 shadow-2xl">
          <Dumbbell className="w-14 h-14 text-[#ccff00] rotate-45" />
          <div className="absolute -top-2 -right-2 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase">
            404
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            PAGE NOT FOUND
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            The workout or page you are looking for has been moved, removed, or never existed in the log.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-display text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#ccff00]/20"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/my-plan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#14141d] hover:bg-[#1d1d2b] border border-[#2b2b3e] text-zinc-200 hover:text-white font-display text-sm font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to My Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
