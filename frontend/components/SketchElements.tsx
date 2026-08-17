"use client";

import React, { useState } from "react";

// Notebook Spiral Binding / Punched Binder Holes along the left margin
export function NotebookSpiralBinding({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute left-1 sm:left-2 top-8 bottom-8 flex flex-col justify-between pointer-events-none z-20">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="relative w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-400 dark:border-zinc-600 shadow-inner flex items-center justify-center">
          {/* Wire ring clip */}
          <div className="absolute -left-2 w-4 h-2.5 rounded-full border-t-2 border-b-2 border-zinc-500 dark:border-zinc-400 transform -rotate-12"></div>
        </div>
      ))}
    </div>
  );
}

// Realistic Metallic Paperclip SVG with inner depth and drop shadow
export function PaperclipElement({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3.5 left-6 w-8 h-14 z-30 pointer-events-none drop-shadow-md ${className}`}>
      <svg viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M8 8 C8 3, 19 3, 19 8 L19 37 C19 43, 6 43, 6 37 L6 13 C6 9, 15 9, 15 13 L15 33"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="4"
          strokeLinecap="round"
          transform="translate(1.5, 2.5)"
        />
        <path
          d="M8 8 C8 3, 19 3, 19 8 L19 37 C19 43, 6 43, 6 37 L6 13 C6 9, 15 9, 15 13 L15 33"
          stroke="#374151"
          strokeWidth="2.8"
          strokeLinecap="round"
          className="dark:stroke-zinc-300"
        />
        <path
          d="M8.5 8 C8.5 4, 18.5 4, 18.5 8 L18.5 37 C18.5 42, 6.5 42, 6.5 37 L6.5 13 C6.5 10, 14.5 10, 14.5 13 L14.5 33"
          stroke="#E5E7EB"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="dark:stroke-zinc-100"
        />
      </svg>
    </div>
  );
}

// Translucent Washi Tape (Center) with textured torn edges
export function WashiTapeCenter({ color = "yellow", className = "" }: { color?: "yellow" | "mint" | "pink" | "kraft"; className?: string }) {
  const colorMap = {
    yellow: "bg-amber-200/80 dark:bg-amber-400/25 border-amber-300/60 dark:border-amber-400/30",
    mint: "bg-emerald-200/80 dark:bg-emerald-400/25 border-emerald-300/60 dark:border-emerald-400/30",
    pink: "bg-rose-200/80 dark:bg-rose-400/25 border-rose-300/60 dark:border-rose-400/30",
    kraft: "bg-[#E6D5B8]/90 dark:bg-[#A88B68]/30 border-[#CDB590]/80 dark:border-[#CDB590]/40",
  };

  return (
    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 z-20 pointer-events-none ${className}`}>
      <div className={`w-full h-full ${colorMap[color]} border-t border-b border-dashed shadow-sm transform -rotate-1 backdrop-blur-xs flex items-center justify-between px-1`}>
        <div className="w-1.5 h-full opacity-30 border-r border-black/10"></div>
        <div className="w-1.5 h-full opacity-30 border-l border-black/10"></div>
      </div>
    </div>
  );
}

// Diagonal Washi Tape across Corner (45 deg)
export function WashiTapeCorner({ color = "yellow", className = "" }: { color?: "yellow" | "mint" | "pink" | "kraft"; className?: string }) {
  const colorMap = {
    yellow: "bg-amber-200/85 dark:bg-amber-400/25 border-amber-300/60 dark:border-amber-400/30",
    mint: "bg-emerald-200/85 dark:bg-emerald-400/25 border-emerald-300/60 dark:border-emerald-400/30",
    pink: "bg-rose-200/85 dark:bg-rose-400/25 border-rose-300/60 dark:border-rose-400/30",
    kraft: "bg-[#E6D5B8]/90 dark:bg-[#A88B68]/30 border-[#CDB590]/80 dark:border-[#CDB590]/40",
  };

  return (
    <div className={`absolute -top-3 -right-3 w-16 h-6 z-20 pointer-events-none ${className}`}>
      <div className={`w-full h-full ${colorMap[color]} border-t border-b border-dashed shadow-sm transform rotate-42 backdrop-blur-xs`}></div>
    </div>
  );
}

// Pushpin Thumbtack
export function PushPinElement({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-7 z-20 pointer-events-none drop-shadow-md ${className}`}>
      <svg viewBox="0 0 24 28" fill="none" className="w-full h-full">
        <ellipse cx="12" cy="25" rx="4" ry="2" fill="rgba(0,0,0,0.25)" />
        <circle cx="12" cy="10" r="6" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
        <circle cx="9.5" cy="8" r="2" fill="#FCA5A5" />
        <path d="M12 16 L12 25" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Hand-stamped official ink seal
export function StampBadge({ label, variant = "emerald" }: { label: string; variant?: "emerald" | "rose" | "amber" | "sky" }) {
  const styles = {
    emerald: "text-emerald-800 dark:text-emerald-300 border-emerald-600 dark:border-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/40",
    rose: "text-rose-800 dark:text-rose-300 border-rose-600 dark:border-rose-400 bg-rose-50/90 dark:bg-rose-950/40",
    amber: "text-amber-900 dark:text-amber-300 border-amber-600 dark:border-amber-400 bg-amber-50/90 dark:bg-amber-950/40",
    sky: "text-sky-900 dark:text-sky-300 border-sky-600 dark:border-sky-400 bg-sky-50/90 dark:bg-sky-950/40",
  };

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-md border-2 border-dashed font-sketch font-bold text-xs uppercase tracking-wider transform -rotate-1 shadow-xs ${styles[variant]}`}>
      <span>[ {label} ]</span>
    </div>
  );
}

// Hand-drawn doodle circle around key words
export function DoodleCircle({ children, className = "text-emerald-600 dark:text-emerald-400" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className="relative inline-block px-1 font-semibold">
      <span className="relative z-10">{children}</span>
      <svg className={`absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none ${className}`} viewBox="0 0 100 40" preserveAspectRatio="none">
        <path
          d="M5,20 C10,5 90,5 95,20 C100,35 15,38 5,22 C2,17 10,12 25,10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// Hand-drawn doodle underline
export function DoodleUnderline({ className = "text-zinc-900 dark:text-white" }: { className?: string }) {
  return (
    <svg className={`w-full h-2.5 mt-1 pointer-events-none ${className}`} viewBox="0 0 100 8" preserveAspectRatio="none">
      <path
        d="M1,4 Q25,1 50,4 T99,4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Hand-drawn star doodle
export function DoodleStar({ className = "text-amber-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-5 h-5 ${className}`}>
      <path d="M12 2 L14 8 L20 9 L15 14 L17 20 L12 16 L7 20 L9 14 L4 9 L10 8 Z" />
    </svg>
  );
}

// Hand-drawn database doodle
export function DoodleDatabase({ className = "text-emerald-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
      <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  );
}

// Hand-drawn cloud doodle
export function DoodleCloud({ className = "text-sky-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

// Hand-drawn lock doodle
export function DoodleLock({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Hand-drawn chip doodle
export function DoodleChip({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </svg>
  );
}

// Hand-drawn shield doodle
export function DoodleShield({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// Hand-drawn scale balance doodle
export function DoodleScale({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

// Hand-drawn interactive checklist item
export function SketchChecklistItem({ label, detail, defaultChecked = false }: { label: string; detail?: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      onClick={() => setChecked(!checked)}
      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
        checked
          ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-600 dark:border-emerald-400 shadow-[2px_2px_0px_#10B981]"
          : "bg-white dark:bg-zinc-900 border-zinc-950 dark:border-white/20 hover:border-zinc-500 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
      }`}
    >
      <div className={`w-5 h-5 rounded-md border-2 border-zinc-950 dark:border-white flex items-center justify-center shrink-0 mt-0.5 ${checked ? "bg-emerald-500 text-white" : "bg-white dark:bg-black"}`}>
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="w-3.5 h-3.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
      <div>
        <span className={`font-sketch text-sm font-bold block ${checked ? "line-through text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-white"}`}>
          {label}
        </span>
        {detail && <span className="font-sans text-xs text-zinc-600 dark:text-zinc-400 block mt-0.5">{detail}</span>}
      </div>
    </div>
  );
}
