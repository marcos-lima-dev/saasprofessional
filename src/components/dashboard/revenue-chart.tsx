"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { REVENUE_DATA } from "@/lib/mocks";
import { useEffect, useState } from "react";
import { ChartFilter } from "./chart-filter";
import { RevenueChartSkeleton } from "./revenue-chart-skeleton";

export function RevenueChart() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return <RevenueChartSkeleton />;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Faturamento Semanal</h3>
          <p className="text-sm text-slate-500">Acompanhe o desempenho das vendas</p>
        </div>
        <ChartFilter />
      </div>

      {/* Container com altura garantida para evitar erro de width/height -1 */}
      <div className="h-[300px] w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="day" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10} 
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(v) => `R$${v}`} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
              }} 
            />
            <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}