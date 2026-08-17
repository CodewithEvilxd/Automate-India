"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  SiPolygon,
  SiGooglecloud,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";
import { ShieldCheck, Scale, CheckCircle2, FileText, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResearchBentoBrand {
  name: string;
  badge: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export interface ResearchBentoGridCopy {
  showcaseTitle: React.ReactNode;
  showcaseDescription: React.ReactNode;
  pricingTitle: React.ReactNode;
  pricingDescription: React.ReactNode;
  pauseTitle: React.ReactNode;
  activeDescription: React.ReactNode;
  pausedDescription: React.ReactNode;
}

export interface ResearchBentoGridProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  monthlyPrice?: number;
  previousPrice?: number;
  currency?: string;
  locale?: string;
  paused?: boolean;
  defaultPaused?: boolean;
  selectedBrand?: number;
  defaultSelectedBrand?: number;
  brands?: readonly ResearchBentoBrand[];
  copy?: Partial<ResearchBentoGridCopy>;
  autoPlay?: boolean;
  brandRotationInterval?: number;
  spotlightInterval?: number;
  userLabel?: string;
  collaboratorLabel?: string;
  onPausedChange?: (paused: boolean) => void;
  onSelectedBrandChange?: (index: number) => void;
}

const spring = { type: "spring", stiffness: 230, damping: 24 } as const;

const LIFTED_TILES = new Set([
  5, 14, 23, 34, 41, 53, 62, 71, 79, 88, 97, 108, 119, 131, 146, 157, 169, 184, 199, 213, 226, 241,
]);

const BRIGHT_TILES = new Set([17, 45, 76, 103, 138, 176, 205, 234]);

const INVOICE_BARS = [78, 55, 92, 45, 68];

export const ACTUAL_CIRCULAR_BRANDS: readonly ResearchBentoBrand[] = [
  {
    name: "Polygon Amoy",
    badge: "Chain ID 80002",
    subtext: "Gasless Smart Contract Protocol",
    icon: SiPolygon,
  },
  {
    name: "Gemini Vision AI",
    badge: "1.5 Flash Neural",
    subtext: "Optical Scrap Contamination Vision",
    icon: SiGooglecloud,
  },
  {
    name: "Postgres & Prisma",
    badge: "ACID Ledger",
    subtext: "High-Throughput Material Database",
    icon: SiPostgresql,
  },
  {
    name: "CPCB Statutory Portal",
    badge: "PWM 2026 Engine",
    subtext: "Automated Form 1 EPR Compliance",
    icon: ShieldCheck,
  },
  {
    name: "MCX Commodity Oracle",
    badge: "Live Ticker Feed",
    subtext: "Real-Time Metal & Polymer Spot Rates",
    icon: Scale,
  },
];

const DEFAULT_COPY: ResearchBentoGridCopy = {
  showcaseTitle: "Integrated Protocol Architecture for India's Circular Economy",
  showcaseDescription:
    "From grassroots kabadiwala AI image grading to Polygon Amoy smart contracts, PostgreSQL transaction ledger, and statutory CPCB filing.",
  pricingTitle: (
    <>
      Automated EPR Certification.
      <br />
      Zero Environmental Fine Risk.
    </>
  ),
  pricingDescription:
    "Avoid up to ₹25,000/MT CPCB non-compliance penalties with instantaneous, cryptographically audited Form 1 filings and LCA carbon accounting.",
  pauseTitle: (
    <>
      Autonomous Smelter Escrow.
      <br />
      Pause Or Resume Scrap Intake.
    </>
  ),
  activeDescription:
    "Active Scrap Ingestion: Autonomous Multi-Agents are routing certified scrap lots into furnace capacity with verified weighbridge telemetry.",
  pausedDescription:
    "Escrow Paused: Material intake on standby. Resume whenever furnace batch changeover is complete.",
};

function ArrowCursor({
  className,
  label,
  inverted = false,
  delay = 0,
  active,
  targetLeft,
  targetTop,
}: {
  className?: string;
  label: string;
  inverted?: boolean;
  delay?: number;
  active?: boolean;
  targetLeft?: string;
  targetTop?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("absolute z-30 flex flex-col items-start pointer-events-none", className)}
      animate={
        reduceMotion
          ? undefined
          : active !== undefined
          ? active
            ? { x: -3, y: -36, rotate: -1.5 }
            : { x: 0, y: 0, rotate: 0 }
          : targetLeft
          ? { left: targetLeft, top: targetTop, x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] }
          : { x: 0, y: [0, -3, 0], rotate: [0, 1.5, 0] }
      }
      transition={
        active !== undefined
          ? {
              duration: active ? 0.68 : 0.82,
              ease: active ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
            }
          : targetLeft
          ? {
              left: spring,
              top: spring,
              y: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" },
            }
          : { duration: 4.6, delay, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        className="h-auto w-[18px] drop-shadow-md sm:w-[22px] lg:w-[26px]"
      >
        <path
          d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z"
          className={cn(
            inverted
              ? "fill-zinc-950 stroke-white dark:fill-white dark:stroke-[#080808]"
              : "fill-emerald-400 stroke-zinc-950 dark:stroke-white/70"
          )}
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "ml-2.5 -mt-1 px-2.5 py-1 text-[11px] font-bold tracking-tight sm:ml-3 sm:px-3 sm:text-[13px] lg:ml-4 lg:px-4 lg:py-1.5 lg:text-[13px] font-sans whitespace-nowrap",
          inverted
            ? "rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-[0_5px_18px_rgba(0,0,0,0.28)]"
            : cn(
                "rounded-[22px] border border-emerald-300 dark:border-emerald-500/40 bg-emerald-400 text-zinc-950",
                active
                  ? "shadow-[0_5px_18px_rgba(16,185,129,0.35),0_0_14px_rgba(16,185,129,0.2)]"
                  : "shadow-[0_5px_18px_rgba(16,185,129,0.25)]"
              )
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

function BrandMark({ brand }: { brand: ResearchBentoBrand }) {
  const Icon = brand.icon;
  return <Icon className="size-[52%]" aria-hidden />;
}

function Panel({ className, children, ...props }: React.ComponentProps<"section">) {
  const grainId = React.useId().replace(/:/g, "");
  return (
    <section
      {...props}
      className={cn(
        "relative isolate overflow-hidden rounded-[20px] border border-zinc-300 dark:border-white/10 bg-[#FAF9F6] dark:bg-[#0B0C10]",
        "shadow-[inset_0_1px_rgba(255,255,255,0.9),0_12px_32px_rgba(24,24,27,0.06)]",
        "dark:shadow-[inset_0_1px_rgba(255,255,255,0.03),0_12px_32px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.06),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_55%)]" />
      {children}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-50 size-full opacity-[0.04] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-soft-light"
      >
        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="11" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#${grainId})`} />
      </svg>
    </section>
  );
}

function FeatureCopy({
  title,
  children,
  className,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 z-20 px-5 pb-5 sm:px-7 sm:pb-7 font-sans", className)}>
      <h3 className="text-[17px] sm:text-[19px] font-extrabold leading-[1.18] tracking-tight text-zinc-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-[460px] text-[12px] sm:text-[13px] leading-[1.4] text-zinc-600 dark:text-zinc-400 font-normal">
        {children}
      </p>
    </div>
  );
}

interface DesignsPanelProps {
  brands: readonly ResearchBentoBrand[];
  selectedBrand?: number;
  defaultSelectedBrand: number;
  autoPlay: boolean;
  rotationInterval: number;
  userLabel: string;
  collaboratorLabel: string;
  title: React.ReactNode;
  description: React.ReactNode;
  onSelectedBrandChange?: (index: number) => void;
}

function DesignsPanel({
  brands,
  selectedBrand,
  defaultSelectedBrand,
  autoPlay,
  rotationInterval,
  userLabel,
  collaboratorLabel,
  title,
  description,
  onSelectedBrandChange,
}: DesignsPanelProps) {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedBrand);
  const reduceMotion = useReducedMotion();
  const isControlled = selectedBrand !== undefined;
  const selected = Math.min(Math.max(isControlled ? selectedBrand : internalSelected, 0), brands.length - 1);
  const cursorStops = brands.map((_, index) => `${12 + (76 * index) / Math.max(brands.length - 1, 1)}%`);

  const selectBrand = React.useCallback(
    (index: number) => {
      if (!isControlled) setInternalSelected(index);
      onSelectedBrandChange?.(index);
    },
    [isControlled, onSelectedBrandChange]
  );

  React.useEffect(() => {
    if (!autoPlay || reduceMotion || brands.length < 2) return;
    const interval = setInterval(() => {
      const next = (selected + 1) % brands.length;
      selectBrand(next);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [autoPlay, brands.length, reduceMotion, rotationInterval, selectBrand, selected]);

  const activeBrand = brands[selected];

  return (
    <Panel className="min-h-[360px] sm:min-h-[330px] @min-[840px]:col-span-12 @min-[840px]:min-h-[310px] @min-[840px]:row-span-1">
      {/* Background Matrix Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 grid h-[78%] grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] gap-px overflow-hidden"
        style={{ maskImage: "linear-gradient(to bottom,black 0%,black 62%,transparent 100%)" }}
      >
        {Array.from({ length: 252 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "border border-black/[0.035] bg-[#ededeb] dark:border-white/[0.018] dark:bg-[#0b0b0b]",
              LIFTED_TILES.has(index) && "bg-emerald-500/10 dark:bg-emerald-500/10",
              BRIGHT_TILES.has(index) && "bg-emerald-500/20 dark:bg-emerald-500/20"
            )}
          />
        ))}
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-[8%] z-[1] hidden h-[66%] w-[24%] rounded-full bg-emerald-500/10 blur-[48px] dark:block"
        animate={reduceMotion ? undefined : { x: ["-120%", "520%"] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[76%] bg-[radial-gradient(ellipse_at_50%_18%,transparent_12%,rgba(247,247,245,.12)_58%,#FAF9F6_100%)] dark:bg-[radial-gradient(ellipse_at_50%_18%,transparent_12%,rgba(11,12,16,.1)_58%,#0B0C10_100%)]"
      />

      {/* Interactive Brand Selector Buttons */}
      <div className="absolute inset-x-4 top-[8%] z-10 mx-auto flex max-w-[800px] items-center gap-2 sm:inset-x-7 sm:top-[10%] sm:gap-2.5">
        {brands.map((brand, index) => (
          <motion.button
            type="button"
            key={brand.name}
            onClick={() => selectBrand(index)}
            aria-label={`Select ${brand.name}`}
            aria-pressed={selected === index}
            className={cn(
              "relative flex aspect-[1/0.95] min-w-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-[14px] border p-2",
              "bg-[linear-gradient(145deg,#ffffff_0%,#f4f4f1_46%,#eaeae5_100%)] shadow-[inset_0_1px_rgba(255,255,255,.9),0_12px_24px_rgba(24,24,27,.08)]",
              "dark:bg-[linear-gradient(145deg,#1c1d24_0%,#14151a_48%,#0f1014_100%)] dark:shadow-[inset_0_1px_rgba(255,255,255,.03),0_10px_22px_rgba(0,0,0,.4)]",
              selected === index
                ? "border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]"
                : "border-black/[0.1] text-zinc-700 dark:border-white/[0.07] dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: selected === index ? -3 : [0, index % 2 ? 1.5 : -1.5, 0],
                    scale: selected === index ? 1.02 : 1,
                  }
            }
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              y: { duration: 5 + index * 0.3, delay: index * 0.2, repeat: Infinity, ease: "easeInOut" },
              scale: spring,
            }}
          >
            {selected === index && (
              <motion.span
                aria-hidden
                className="absolute inset-[12%] rounded-full bg-emerald-500/20 blur-xl dark:bg-emerald-400/[0.15]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.08, 0.9] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.span
              className="relative flex size-full items-center justify-center"
              animate={{ scale: selected === index ? 1.08 : 1 }}
              transition={spring}
            >
              <BrandMark brand={brand} />
            </motion.span>
            <span className="text-[10px] font-mono font-bold tracking-tight text-center truncate w-full mt-0.5 hidden sm:block">
              {brand.name}
            </span>
          </motion.button>
        ))}
      </div>

      <ArrowCursor
        label={userLabel}
        className="left-[25%] top-[40%]"
        targetLeft={cursorStops[selected]}
        targetTop="40%"
        delay={0.2}
      />
      <ArrowCursor
        label={collaboratorLabel}
        inverted
        className="left-[64%] top-[54%] sm:left-[70%] sm:top-[56%]"
        delay={0.9}
      />

      <FeatureCopy title={title}>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          [{activeBrand.badge}]
        </span>{" "}
        {activeBrand.subtext}. {description}
      </FeatureCopy>
    </Panel>
  );
}

interface InvoicePanelProps {
  monthlyPrice: number;
  previousPrice: number;
  currency: string;
  locale: string;
  autoPlay: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
}

function InvoicePanel({
  monthlyPrice,
  previousPrice,
  currency,
  locale,
  autoPlay,
  title,
  description,
}: InvoicePanelProps) {
  const reduceMotion = useReducedMotion();
  const [invoiceIndex, setInvoiceIndex] = React.useState(0);

  const formatPrice = React.useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }),
    [currency, locale]
  );

  const invoices = [
    { label: "Legacy Audit & CPCB Penalty Risk", price: previousPrice, previousPrice: null, accent: false },
    { label: "CircularChain Autonomous EPR Shield", price: monthlyPrice, previousPrice, accent: true },
  ];

  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    const interval = setInterval(() => {
      setInvoiceIndex((current) => (current + 1) % invoices.length);
    }, 3900);
    return () => clearInterval(interval);
  }, [autoPlay, invoices.length, reduceMotion]);

  const invoice = invoices[invoiceIndex];

  return (
    <Panel className="min-h-[420px] [container-type:inline-size] sm:min-h-[360px] @min-[840px]:col-span-7 @min-[840px]:min-h-[302px] @min-[840px]:row-span-1">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] dark:opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(circle,currentColor .65px,transparent .75px)",
          backgroundSize: "11px 11px",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden sm:inset-y-0 sm:left-auto sm:right-0 sm:h-auto sm:w-[54%]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={invoiceIndex}
            className="absolute left-[14%] top-4 h-[235px] w-[72%] overflow-hidden rounded-[14px] border border-black/[0.14] bg-[linear-gradient(145deg,#ffffff_0%,#f4f4f1_46%,#eaeae5_100%)] p-4 shadow-[inset_0_1px_rgba(255,255,255,.9),0_18px_42px_rgba(24,24,27,.12)] sm:left-auto sm:right-4 sm:h-[250px] sm:w-[90%] dark:border-white/10 dark:bg-[linear-gradient(145deg,#1c1d24_0%,#14151a_48%,#0f1014_100%)] dark:shadow-[inset_0_1px_rgba(255,255,255,.02),0_16px_36px_rgba(0,0,0,.4)] @min-[520px]:right-7 @min-[520px]:p-5"
            initial={reduceMotion ? false : { y: 270, opacity: 0, rotate: -1.25 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 285, opacity: 0, rotate: 1.1 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between text-zinc-500 dark:text-zinc-400 font-sans">
              <span className="text-[11px] font-bold uppercase tracking-wider">{invoice.label}</span>
              <span className="relative mt-0.5 size-4 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                <span className="absolute inset-1 rounded-full bg-emerald-500" />
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2 whitespace-nowrap font-sans">
              <span
                className={cn(
                  "text-[24px] font-extrabold tracking-tight @min-[520px]:text-[28px]",
                  invoice.accent ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {formatPrice.format(invoice.price)}
              </span>
              {invoice.previousPrice && (
                <span className="text-[13px] text-zinc-400 line-through @min-[520px]:text-[15px]">
                  {formatPrice.format(invoice.previousPrice)}
                </span>
              )}
            </div>

            <div className="mt-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>CPCB Form 1 Inscription</span>
                <span className="text-emerald-500 font-bold">Polygon Verified</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {INVOICE_BARS.map((width, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <motion.span
                    className="h-2 rounded-[3px] bg-black/[0.08] dark:bg-white/[0.08]"
                    style={{ width: `${width}%` }}
                    animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 3.5, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="h-2.5 w-[22%] rounded-[3px] bg-emerald-500/20 dark:bg-emerald-500/30" />
                </div>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_bottom,transparent,rgba(250,249,246,.7)_52%,#FAF9F6_100%)] dark:bg-[linear-gradient(to_bottom,transparent,rgba(11,12,16,.7)_52%,#0B0C10_100%)]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[48%] bg-[linear-gradient(to_bottom,rgba(250,249,246,0)_0%,rgba(250,249,246,.12)_24%,rgba(250,249,246,.48)_58%,rgba(250,249,246,.88)_86%,#FAF9F6_100%)] dark:bg-[linear-gradient(to_bottom,rgba(11,12,16,0)_0%,rgba(11,12,16,.12)_24%,rgba(11,12,16,.48)_58%,rgba(11,12,16,.88)_86%,#0B0C10_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-8%] -bottom-[24%] z-10 h-[48%] rounded-[50%] bg-[#FAF9F6]/75 blur-[38px] dark:bg-[#0B0C10]/75"
      />

      <FeatureCopy className="sm:right-1/2 sm:pr-3" title={title}>
        {description}
      </FeatureCopy>
    </Panel>
  );
}

interface PausePanelProps {
  paused?: boolean;
  defaultPaused: boolean;
  autoPlay: boolean;
  spotlightInterval: number;
  userLabel: string;
  title: React.ReactNode;
  activeDescription: React.ReactNode;
  pausedDescription: React.ReactNode;
  onPausedChange?: (paused: boolean) => void;
}

function PausePanel({
  paused: controlledPaused,
  defaultPaused,
  autoPlay,
  spotlightInterval,
  userLabel,
  title,
  activeDescription,
  pausedDescription,
  onPausedChange,
}: PausePanelProps) {
  const [internalPaused, setInternalPaused] = React.useState(defaultPaused);
  const [demoLit, setDemoLit] = React.useState(true);
  const reduceMotion = useReducedMotion();
  const isControlled = controlledPaused !== undefined;
  const paused = isControlled ? controlledPaused : internalPaused;
  const arrowLit = autoPlay && demoLit && !reduceMotion;

  React.useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    let offTimer: ReturnType<typeof setTimeout> | undefined;
    const illuminate = () => {
      setDemoLit(true);
      offTimer = setTimeout(() => setDemoLit(false), 1500);
    };
    const firstTimer = setTimeout(() => setDemoLit(false), 1500);
    const loopTimer = setInterval(illuminate, spotlightInterval);
    return () => {
      clearTimeout(firstTimer);
      if (offTimer) clearTimeout(offTimer);
      clearInterval(loopTimer);
    };
  }, [autoPlay, reduceMotion, spotlightInterval]);

  const toggle = () => {
    const next = !paused;
    if (!isControlled) setInternalPaused(next);
    onPausedChange?.(next);
  };

  return (
    <Panel className="min-h-[340px] sm:min-h-[320px] @min-[840px]:col-span-5 @min-[840px]:min-h-[302px] @min-[840px]:row-span-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply dark:opacity-[0.09] dark:mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%,currentColor 0 .45px,transparent .7px),radial-gradient(circle at 70% 65%,currentColor 0 .45px,transparent .75px)",
          backgroundSize: "4px 4px,5px 5px",
        }}
      />
      <div className="absolute inset-x-0 top-0 flex h-[66%] items-center justify-center">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ring) => (
          <motion.div
            key={ring}
            aria-hidden
            className="absolute border border-black/[0.07] dark:border-white/[0.04]"
            style={{
              width: 190 + ring * 23,
              height: 100 + ring * 16,
              borderRadius: 23 + ring * 3,
              opacity: Math.max(0.18, 0.72 - ring * 0.045),
            }}
            animate={reduceMotion ? undefined : { scale: [0.995, 1.008, 0.995] }}
            transition={{ duration: 5.2, delay: ring * 0.11, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <motion.button
          type="button"
          onClick={toggle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={spring}
          animate={{ scale: arrowLit ? 1.015 : 1 }}
          className={cn(
            "relative z-10 flex h-[74px] min-w-[190px] items-center justify-center overflow-hidden rounded-[22px] border px-6 text-[22px] font-extrabold tracking-tight transition-all duration-300 font-sans cursor-pointer",
            "bg-gradient-to-br from-white to-zinc-200 dark:from-[#1c1d24] dark:to-[#0f1014]",
            arrowLit
              ? "border-emerald-500 text-zinc-950 dark:text-white shadow-[0_0_30px_rgba(16,185,129,0.35)]"
              : "border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white shadow-md"
          )}
          aria-pressed={paused}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/30"
            animate={{ opacity: arrowLit ? 1 : 0 }}
            transition={{ duration: arrowLit ? 0.64 : 0.76, ease: arrowLit ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1] }}
          />
          <span className="relative flex items-center gap-2">
            <span
              className={cn(
                "size-3 rounded-full animate-pulse",
                paused ? "bg-amber-400" : "bg-emerald-500"
              )}
            />
            {paused ? "Resume Escrow" : "Pause Escrow"}
          </span>
        </motion.button>

        <ArrowCursor label={userLabel} className="left-[55%] top-[68%]" delay={0.5} active={arrowLit} />
      </div>

      <FeatureCopy title={title}>{paused ? pausedDescription : activeDescription}</FeatureCopy>
    </Panel>
  );
}

export function ResearchBentoGrid({
  monthlyPrice = 49999,
  previousPrice = 350000,
  currency = "INR",
  locale = "en-IN",
  paused,
  defaultPaused = false,
  selectedBrand,
  defaultSelectedBrand = 0,
  brands = ACTUAL_CIRCULAR_BRANDS,
  copy,
  autoPlay = true,
  brandRotationInterval = 2800,
  spotlightInterval = 4400,
  userLabel = "Smelter Operator",
  collaboratorLabel = "CPCB Auditor",
  className,
  onPausedChange,
  onSelectedBrandChange,
  ...props
}: ResearchBentoGridProps) {
  const content = { ...DEFAULT_COPY, ...copy };

  if (brands.length === 0) {
    throw new Error("ResearchBentoGrid requires at least one brand.");
  }

  return (
    <div
      {...props}
      className={cn(
        "flex h-full w-full overflow-y-auto bg-transparent p-2 text-zinc-950 [container-type:inline-size] sm:p-3",
        "dark:text-white",
        className
      )}
    >
      <div className="m-auto grid w-full max-w-[1120px] grid-cols-1 gap-3 sm:gap-4 @min-[840px]:h-[min(100%,650px)] @min-[840px]:grid-cols-12 @min-[840px]:grid-rows-2 font-sans">
        <DesignsPanel
          brands={brands}
          selectedBrand={selectedBrand}
          defaultSelectedBrand={defaultSelectedBrand}
          autoPlay={autoPlay}
          rotationInterval={brandRotationInterval}
          userLabel={userLabel}
          collaboratorLabel={collaboratorLabel}
          title={content.showcaseTitle}
          description={content.showcaseDescription}
          onSelectedBrandChange={onSelectedBrandChange}
        />
        <InvoicePanel
          monthlyPrice={monthlyPrice}
          previousPrice={previousPrice}
          currency={currency}
          locale={locale}
          autoPlay={autoPlay}
          title={content.pricingTitle}
          description={content.pricingDescription}
        />
        <PausePanel
          paused={paused}
          defaultPaused={defaultPaused}
          autoPlay={autoPlay}
          spotlightInterval={spotlightInterval}
          userLabel={userLabel}
          title={content.pauseTitle}
          activeDescription={content.activeDescription}
          pausedDescription={content.pausedDescription}
          onPausedChange={onPausedChange}
        />
      </div>
    </div>
  );
}

export default ResearchBentoGrid;
