"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Bookmark, Calendar, Menu, X, ChevronRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planCount, savedCount, isHydrated } = usePlan();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="w-full bg-[#0d0d11] border-b border-[#1c1c24] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 focus:outline-none"
          id="nav-logo"
        >
          <div className="w-7 h-7 flex items-center justify-center text-[#ccff00]">
            <Dumbbell className="w-6 h-6 text-[#ccff00] transform -rotate-45" />
          </div>
          <span className="font-display text-2xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#14141c] border border-[#22222e] p-1.5 rounded-full">
          <Link
            href="/"
            id="nav-link-workout"
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isWorkoutActive
                ? "bg-[#222230] text-[#ccff00] shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            id="nav-link-my-plan"
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isPlanActive
                ? "bg-[#222230] text-[#ccff00] shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badge Counters */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Plan Badge Counter (Filled Lime Pill / Circle) */}
          <Link
            href="/my-plan?tab=today"
            id="nav-badge-plan"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105"
            title="View Today's Plan"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-extrabold bg-[#09090b] text-[#ccff00] rounded-full ml-0.5">
              {isHydrated ? planCount : 0}
            </span>
          </Link>

          {/* Saved Badge Counter (Outlined Pill) */}
          <Link
            href="/my-plan?tab=saved"
            id="nav-badge-saved"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-[#2e2e3e] hover:border-[#ccff00] text-zinc-300 hover:text-white font-medium text-xs uppercase tracking-wider transition-all transform hover:scale-105"
            title="View Saved Workouts"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
            <span>Saved</span>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-[#1a1a24] text-zinc-300 rounded-full ml-0.5">
              {isHydrated ? savedCount : 0}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ccff00] text-[#09090b] text-xs font-bold"
          >
            <span>Plan</span>
            <span className="bg-[#09090b] text-[#ccff00] rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {isHydrated ? planCount : 0}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white bg-[#14141c] border border-[#22222e] rounded-lg"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#0d0d11] border-b border-[#22222e] px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isWorkoutActive
                  ? "bg-[#222230] text-[#ccff00] border border-[#ccff00]/40"
                  : "bg-[#14141c] text-zinc-300 border border-[#22222e]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isPlanActive
                  ? "bg-[#222230] text-[#ccff00] border border-[#ccff00]/40"
                  : "bg-[#14141c] text-zinc-300 border border-[#22222e]"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="pt-2 border-t border-[#1a1a24] grid grid-cols-2 gap-2">
            <Link
              href="/my-plan?tab=today"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ccff00] text-[#09090b] font-bold text-xs uppercase"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Plan ({isHydrated ? planCount : 0})</span>
            </Link>
            <Link
              href="/my-plan?tab=saved"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#181822] border border-[#2c2c3c] text-white font-medium text-xs uppercase"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Saved ({isHydrated ? savedCount : 0})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
