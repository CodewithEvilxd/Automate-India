"use client";

import React from "react";

// Paperclip SVG stuck to top-left edge
export function PaperclipElement({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3 left-4 w-7 h-12 z-20 pointer-events-none drop-shadow-md ${className}`}>
      <svg viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Paperclip drop shadow */}
        <path
          d="M8 8 C8 4, 18 4, 18 8 L18 36 C18 42, 6 42, 6 36 L6 14 C6 10, 14 10, 14 14 L14 32"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform="translate(1, 2)"
        />
        {/* Main metallic wire */}
        <path
          d="M8 8 C8 4, 18 4, 18 8 L18 36 C18 42, 6 42, 6 36 L6 14 C6 10, 14 10, 14 14 L14 32"
          stroke="#4B5563"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-zinc-400"
        />
        {/* Highlight inner wire */}
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
    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 z-20 pointer-events-none ${className}`}>
      <div className="w-full h-full bg-amber-100/90 dark:bg-amber-400/20 border-t border-b border-dashed border-amber-400/50 shadow-sm transform -rotate-1 backdrop-blur-xs flex items-center justify-between px-1">
        {/* Serrated left & right edges */}
        <div className="w-1.5 h-full bg-repeating-linear-gradient opacity-40"></div>
        <div className="w-1.5 h-full bg-repeating-linear-gradient opacity-40"></div>
      </div>
    </div>
  );
}

// Diagonal washi tape stuck at top-right corner
export function WashiTapeCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute -top-3 -right-3 w-16 h-6 z-20 pointer-events-none ${className}`}>
      <div className="w-full h-full bg-amber-100/90 dark:bg-amber-400/20 border-t border-b border-dashed border-amber-400/50 shadow-sm transform rotate-42 backdrop-blur-xs"></div>
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
    <svg className={`w-full h-2 mt-0.5 pointer-events-none ${className}`} viewBox="0 0 100 8" preserveAspectRatio="none">
      <path
        d="M1,4 Q25,1 50,4 T99,4"
        stroke="currentColor"
        strokeWidth="1.8"
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
