"use client";

import React from "react";
import Image from "next/image";

export const HeroBanner: React.FC = () => {
  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const libraryElement = document.getElementById("library");
    if (libraryElement) {
      libraryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full pt-6 pb-12 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enclosed Hero Card Container */}
        <div className="bg-[#121217] border border-[#1e1e28] rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <p className="text-[#ccff00] text-xs font-bold uppercase tracking-widest">
                WORKOUT LIBRARY
              </p>

              {/* Main Heading: Fixed 2-line break after the dot (.) */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white uppercase tracking-tight leading-[1.02]">
                <span className="block">TRAIN WITH INTENT.</span>
                <span className="block">LOG EVERY SET.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-normal">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#library"
                  onClick={scrollToLibrary}
                  id="hero-cta-button"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-[#09090b] font-display text-base font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#ccff00]/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>BROWSE WORKOUTS</span>
                </a>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-md aspect-[4/3.5]">
                <Image
                  src="/banner.png"
                  alt="FitLog Gym Athlete"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-center drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
