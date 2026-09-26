"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Bookmark, Calendar, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { planCount, savedCount, isHydrated } = usePlan();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-[#22222d] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#ccff00] rounded-lg p-1"
          id="nav-logo"
        >
          <div className="relative w-9 h-9 flex items-center justify-center bg-[#131318] border border-[#272735] rounded-lg group-hover:border-[#ccff00] transition-colors">
            <div className="w-5 h-5 relative flex items-center justify-center">
              {/* Logo fallback icon or image */}
              <Image
                src="/logo.png"
                alt="FitLog Logo"
                width={24}
                height={24}
                className="object-contain"
                onError={(e) => {
                  // Fallback to icon if logo image fails
                  e.currentTarget.style.display = "none";
                }}
              />
              <Dumbbell className="w-5 h-5 text-[#ccff00] absolute inset-0 -z-10" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="font-display text-2xl font-bold tracking-wider text-white">
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121217] border border-[#22222d] px-2 py-1.5 rounded-full">
          <Link
            href="/"
            id="nav-link-workout"
            className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isWorkoutActive
                ? "bg-[#22222e] text-[#ccff00] shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#181820]"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            id="nav-link-my-plan"
            className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isPlanActive
                ? "bg-[#22222e] text-[#ccff00] shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-[#181820]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badge Counters */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Plan Badge Counter (Filled Pill with #ccff00) */}
          <Link
            href="/my-plan?tab=today"
            id="nav-badge-plan"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-bold text-xs uppercase tracking-wider transition-all shadow-sm transform hover:scale-105"
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
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131318] border border-[#2d2d3c] hover:border-[#ccff00] text-zinc-200 hover:text-[#ccff00] font-semibold text-xs uppercase tracking-wider transition-all transform hover:scale-105"
            title="View Saved Workouts"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#ccff00] transition-colors" />
            <span>Saved</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-[#1e1e28] text-zinc-200 group-hover:text-[#ccff00] rounded-full ml-0.5 min-w-[20px]">
              {isHydrated ? savedCount : 0}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ccff00] text-[#09090b] text-xs font-bold"
          >
            <span>Plan</span>
            <span className="bg-[#09090b] text-[#ccff00] rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              {isHydrated ? planCount : 0}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white bg-[#131318] border border-[#22222d] rounded-lg"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#0e0e12] border-b border-[#22222d] px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold ${
                isWorkoutActive
                  ? "bg-[#22222e] text-[#ccff00] border border-[#ccff00]/30"
                  : "bg-[#131318] text-zinc-300 border border-[#22222d]"
              }`}
            >
              Workout Library
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold ${
                isPlanActive
                  ? "bg-[#22222e] text-[#ccff00] border border-[#ccff00]/30"
                  : "bg-[#131318] text-zinc-300 border border-[#22222d]"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="pt-2 border-t border-[#1e1e28] grid grid-cols-2 gap-2">
            <Link
              href="/my-plan?tab=today"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ccff00] text-[#09090b] font-bold text-xs uppercase"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Today's Plan ({isHydrated ? planCount : 0})</span>
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
