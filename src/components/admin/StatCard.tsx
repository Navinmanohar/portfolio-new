"use client";

import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  trend?: string;
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-foreground/40 font-medium">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-medium text-foreground">{value}</div>
      {trend && (
        <div className="text-[11px] text-foreground/30 mt-1">{trend}</div>
      )}
    </div>
  );
}
