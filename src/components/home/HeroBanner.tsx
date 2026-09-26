"use client";

import React from "react";
import Image from "next/image";
import { Dumbbell, ArrowDown, Sparkles, Flame, ShieldCheck } from "lucide-react";

export const HeroBanner: React.FC = () => {
  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0e0e14] via-[#09090b] to-[#09090b] border-b border-[#1c1c25] pt-10 pb-16 md:py-20 lg:py-24">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161620] border border-[#2c2c3e] text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[0.95]">
              TRAIN WITH INTENT. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e5ff80] to-emerald-400">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#library"
                onClick={scrollToLibrary}
                id="hero-cta-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-display text-lg font-bold tracking-wider uppercase transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#ccff00]/20"
              >
                <Dumbbell className="w-5 h-5" />
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium px-2 py-1">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Calorie Tracker</span>
                </div>
                <div className="h-3 w-px bg-zinc-700" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
                  <span>5-Lift Daily Cap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none group">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#ccff00]/30 via-emerald-500/20 to-transparent rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-700" />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-[#13131a] border border-[#292938] shadow-2xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/banner.png"
                    alt="FitLog Gym Companion Hero"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Stat Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e14]/90 backdrop-blur-md border border-[#272738] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-[#ccff00]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        12 Major Lifts
                      </p>
                      <p className="text-[11px] text-zinc-400">All muscle groups covered</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#1d1d28] border border-[#313144] text-[#ccff00] text-xs font-bold">
                    PRO LOG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
