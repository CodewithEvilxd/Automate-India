"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Link from "next/link";
import { ArrowRight, BarChart3, Plus } from "lucide-react";
import { formatCategoryName } from "@/components/CategoryBadge";

export default function DashboardChart({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-80 w-full bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 flex flex-col justify-between relative manifest-grid overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 z-10">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#4E9B6F]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
              Carbon Abatement by Material Class
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#8B9188]">
            EPA WARM MODEL
          </span>
        </div>

        <div className="my-auto text-center py-8 z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-dashed border-[#4E9B6F]/40 flex items-center justify-center mb-3 bg-[#10140F]">
            <BarChart3 className="w-5 h-5 text-[#4E9B6F]" />
          </div>
          <p className="font-display text-lg font-bold text-[#EDEAE0] mb-1">
            Ledger is empty
          </p>
          <p className="text-[#8B9188] text-sm max-w-sm mx-auto mb-4">
            List your first material to open an on-chain ledger entry and plot carbon abatement.
          </p>
          <Link
            href="/list"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#4E9B6F] hover:bg-[#64B587] text-[#10140F] font-mono text-xs uppercase tracking-wider font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List First Material</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="border-t border-[#2E362C] pt-2.5 flex items-center justify-between font-mono text-[10px] text-[#8B9188] z-10">
          <span>CO₂e / Material Category</span>
          <span>Awaiting Transactions</span>
        </div>
      </div>
    );
  }

  // Aggregate by category
  const aggregatedData = data.reduce((acc: any, curr: any) => {
    const cat = curr.category || "mixed";
    if (!acc[cat]) {
      acc[cat] = {
        name: formatCategoryName(cat),
        rawCategory: cat,
        co2Saved: 0,
        weight: 0,
        count: 0,
      };
    }
    acc[cat].co2Saved += curr.co2_saved_kg || 0;
    acc[cat].weight += curr.estimated_weight_kg || 0;
    acc[cat].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).sort(
    (a: any, b: any) => b.co2Saved - a.co2Saved
  );

  return (
    <div className="h-80 w-full bg-[#1B211A] border border-[#2E362C] rounded-[6px] p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-[#2E362C] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#4E9B6F]" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#EDEAE0] font-semibold">
            Carbon Abatement by Material Class
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#8B9188] px-2 py-0.5 rounded bg-[#10140F] border border-[#2E362C]">
          EPA WARM Standard
        </span>
      </div>

      <div className="flex-1 w-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="#8B9188"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={{ stroke: "#2E362C" }}
            />
            <YAxis
              stroke="#8B9188"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={{ stroke: "#2E362C" }}
              tickFormatter={(v) => `${v}kg`}
            />
            <Tooltip
              cursor={{ fill: "rgba(78, 155, 111, 0.08)" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry: any = payload[0].payload;
                  return (
                    <div className="bg-[#10140F] border border-[#4E9B6F] p-3 rounded-[4px] shadow-xl text-xs font-mono">
                      <p className="font-bold text-[#EDEAE0] mb-1.5 uppercase border-b border-[#2E362C] pb-1">
                        {entry.name}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between gap-4 text-[#8B9188]">
                          <span>CO₂ Saved:</span>
                          <span className="text-[#4E9B6F] font-bold font-data">
                            {entry.co2Saved.toFixed(1)} kg
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-[#8B9188]">
                          <span>Total Weight:</span>
                          <span className="text-[#EDEAE0] font-data">
                            {entry.weight.toFixed(1)} kg
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-[#8B9188]">
                          <span>Lots Listed:</span>
                          <span className="text-[#D98A3D] font-data">
                            {entry.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="co2Saved" radius={[2, 2, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#4E9B6F" : index % 2 === 0 ? "#3E7B58" : "#2E5C42"}
                  stroke="#2E362C"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-[#2E362C] pt-2.5 flex items-center justify-between font-mono text-[10px] text-[#8B9188]">
        <span>Aggregated physical recovery</span>
        <span className="text-[#4E9B6F]">All values verified by Agent 2</span>
      </div>
    </div>
  );
}
