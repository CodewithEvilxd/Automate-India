"use client";

import React from "react";

export interface CarouselImage {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className = "",
      containerClassName = "",
      cardClassName = "",
      animationDuration = 28,
      cardWidth = 240,
      ...props
    },
    ref
  ) => {
    const N = images.length;
    
    // CSS variables for 3D Cylinder geometry
    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`w-full min-h-[480px] sm:min-h-[540px] grid place-items-center overflow-hidden relative select-none ${className}`}
        style={{
          perspective: "40em",
          maskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15% 85%, transparent)",
        }}
        {...props}
      >
        <div
          className={`grid place-items-center [transform-style:preserve-3d] ${containerClassName}`}
          style={{
            ...customStyle,
            animation: "cylinderRotate var(--anim-dur) linear infinite",
          }}
        >
          {/* Keyframes for seamless infinite 3D spin */}
          <style>
            {`
              @keyframes cylinderRotate {
                to { transform: rotateY(1turn); }
              }
              @keyframes cylinderRotateHover {
                to { transform: rotateY(1turn); }
              }
            `}
          </style>

          {images.map((img, i) => (
            <div
              key={i}
              className={`[grid-area:1/1] [backface-visibility:hidden] rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-300 group cursor-pointer ${cardClassName}`}
              style={
                {
                  width: "var(--w)",
                  aspectRatio: "7/10",
                  "--i": i,
                  transform:
                    "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
                } as React.CSSProperties
              }
            >
              <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt || `Scrap Stream ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient overlay with badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex flex-col justify-end p-4 text-left">
                  {img.category && (
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/80 text-zinc-950 text-[10px] font-mono font-extrabold uppercase tracking-wider w-fit mb-1 shadow-sm">
                      {img.category}
                    </span>
                  )}
                  {img.title && (
                    <h4 className="font-display text-white font-bold text-sm leading-tight drop-shadow-md">
                      {img.title}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
