"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  colorClassName?: string;
}

export function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  description, 
  trend,
  colorClassName = "text-blue-600 bg-blue-50"
}: StatsCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg", colorClassName)}>
            <Icon size={20} />
          </div>
          {trend && (
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded-full",
              trend.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}>
              {trend.value}
            </span>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
          {description && (
            <p className="text-xs text-slate-400 mt-1 font-medium">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}