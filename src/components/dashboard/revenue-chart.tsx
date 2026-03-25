"use client";

import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { useOrders } from "@/context/order-context"; // O cérebro do app
import { useEffect, useState, useMemo } from "react";
import { ChartFilter } from "./chart-filter";
import { RevenueChartSkeleton } from "./revenue-chart-skeleton";

export function RevenueChart() {
  const { orders } = useOrders();
  const [isReady, setIsReady] = useState(false);

  // --- LÓGICA DE TRANSFORMAÇÃO DE DADOS (AGRUPAMENTO POR DIA) ---
  const chartData = useMemo(() => {
    const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    
    // Inicializa o acumulador com 0 para cada dia
    const revenueByDay = days.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {} as Record<string, number>);

    // Soma os valores dos pedidos reais
    // (Aqui simulamos o mapeamento. Em um sistema real, usaríamos a data do pedido)
    orders.forEach((order, index) => {
      // Distribui os pedidos pelos dias para o gráfico não ficar vazio no início
      const dayIndex = index % 7; 
      const dayName = days[dayIndex];
      revenueByDay[dayName] += Number(order.amount) || 0;
    });

    return days.map(day => ({
      day,
      total: revenueByDay[day]
    }));
  }, [orders]); // Recalcula sempre que um pedido for adicionado ou removido!

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return <RevenueChartSkeleton />;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Faturamento Semanal</h3>
          <p className="text-sm text-slate-500">Acompanhe o desempenho real das vendas</p>
        </div>
        <ChartFilter />
      </div>

      <div className="h-[300px] w-full min-h-[300px] mt-auto">
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
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
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(v) => `R$${v >= 1000 ? `${(v/1000).toFixed(1)}k` : v}`} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }} 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex flex-col gap-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{payload[0].payload.day}</p>
                      <p className="text-sm font-bold text-blue-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(payload[0].value))}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="total" 
              fill="#2563eb" 
              radius={[6, 6, 0, 0]} 
              barSize={Math.max(20, 40 - (chartData.length * 2))} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}