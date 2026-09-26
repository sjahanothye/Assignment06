"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#070709] border-t border-[#1c1c24] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#121217] border border-[#262633] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="FitLog"
                  width={20}
                  height={20}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Dumbbell className="w-4 h-4 text-[#ccff00] -z-10" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-white">
                FIT<span className="text-[#ccff00]">LOG</span>
              </span>
            </Link>
            <div className="hidden sm:block h-4 w-px bg-zinc-800" />
            <span className="text-xs text-zinc-400 font-medium">
              Precision workout logging for serious athletes
            </span>
          </div>

          {/* Center / Right: Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
            <p className="text-xs text-zinc-500 font-normal">
              © 2026 <span className="text-zinc-300 font-medium">FitLog</span> — Workout Library. Train hard, log honest.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#121217] border border-[#22222d] hover:border-[#ccff00] text-zinc-400 hover:text-[#ccff00] transition-colors"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
