"use client";

import React from "react";

// Paperclip SVG stuck to top-left edge
export function PaperclipElement({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3 left-4 w-7 h-12 z-20 pointer-events-none drop-shadow-md ${className}`}>
      <svg viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M8 8 C8 4, 18 4, 18 8 L18 36 C18 42, 6 42, 6 36 L6 14 C6 10, 14 10, 14 14 L14 32"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform="translate(1, 2)"
        />
        <path
          d="M8 8 C8 4, 18 4, 18 8 L18 36 C18 42, 6 42, 6 36 L6 14 C6 10, 14 10, 14 14 L14 32"
          stroke="#4B5563"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-zinc-400"
        />
        <path
          d="M8 8 C8 4, 18 4, 18 8 L18 36 C18 42, 6 42, 6 36 L6 14 C6 10, 14 10, 14 14 L14 32"
          stroke="#9CA3AF"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="dark:stroke-zinc-200"
        />
      </svg>
    </div>
  );
}

// Horizontal washi tape stuck at the top-center
export function WashiTapeCenter({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 z-20 pointer-events-none ${className}`}>
      <div className="w-full h-full bg-amber-100/90 dark:bg-amber-400/20 border-t border-b border-dashed border-amber-400/60 shadow-sm transform -rotate-1 backdrop-blur-xs flex items-center justify-between px-1">
        <div className="w-1.5 h-full opacity-40"></div>
        <div className="w-1.5 h-full opacity-40"></div>
      </div>
    </div>
  );
}

// Diagonal washi tape stuck at top-right corner
export function WashiTapeCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3 -right-3 w-16 h-6 z-20 pointer-events-none ${className}`}>
      <div className="w-full h-full bg-amber-100/90 dark:bg-amber-400/20 border-t border-b border-dashed border-amber-400/60 shadow-sm transform rotate-42 backdrop-blur-xs"></div>
    </div>
  );
}

// Pushpin Pin
export function PushPinElement({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 z-20 pointer-events-none drop-shadow-md ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="10" r="5" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
        <circle cx="10" cy="8" r="1.5" fill="#FCA5A5" />
        <path d="M12 15 L12 22" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Hand-drawn doodle underline
export function DoodleUnderline({ className = "text-zinc-900 dark:text-white" }: { className?: string }) {
  return (
    <svg className={`w-full h-2.5 mt-1 pointer-events-none ${className}`} viewBox="0 0 100 8" preserveAspectRatio="none">
      <path
        d="M1,4 Q25,1 50,4 T99,4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Hand-drawn little star doodle
export function DoodleStar({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-5 h-5 ${className}`}>
      <path d="M12 2 L14 8 L20 9 L15 14 L17 20 L12 16 L7 20 L9 14 L4 9 L10 8 Z" />
    </svg>
  );
}

// Hand-drawn cylindrical database doodle
export function DoodleDatabase({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
      <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  );
}

// Hand-drawn cloud doodle
export function DoodleCloud({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

// Hand-drawn lock doodle
export function DoodleLock({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Hand-drawn microprocessor chip doodle
export function DoodleChip({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
    </svg>
  );
}

// Hand-drawn shield doodle
export function DoodleShield({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// Hand-drawn scale balance doodle
export function DoodleScale({ className = "text-zinc-600 dark:text-zinc-400" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`w-6 h-6 ${className}`}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

// Hand-drawn curly arrow
export function DoodleArrow({ className = "text-emerald-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`w-8 h-5 ${className}`}>
      <path d="M2 18 C 12 2, 26 2, 36 12" />
      <path d="M30 12 L 36 12 L 35 6" />
    </svg>
  );
}
