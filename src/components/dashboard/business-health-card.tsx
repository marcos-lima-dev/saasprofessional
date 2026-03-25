"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Star, CheckCircle2, AlertCircle } from "lucide-react";

interface HealthProps {
  ordersCount: number;
  avgOrder: number;
}

export function BusinessHealthCard({ ordersCount, avgOrder }: HealthProps) {
  // Lógica de Status Baseada no Desempenho Real
  const getStatus = () => {
    // EXCELENTE: Faturamento alto e volume constante
    if (avgOrder > 1000 && ordersCount >= 5) {
      return { 
        label: "Excelente", 
        color: "text-blue-700", 
        bg: "bg-blue-50", 
        icon: <Star size={14} className="fill-blue-700" /> 
      };
    }
    // SAUDÁVEL: O patamar que você já atingiu
    if (avgOrder > 100 && ordersCount >= 3) {
      return { 
        label: "Saudável", 
        color: "text-emerald-700", 
        bg: "bg-emerald-50", 
        icon: <CheckCircle2 size={14} /> 
      };
    }
    // ATENÇÃO: Se os números caírem
    return { 
      label: "Atenção", 
      color: "text-amber-700", 
      bg: "bg-amber-50", 
      icon: <AlertCircle size={14} /> 
    };
  };

  const status = getStatus();

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
        <CardTitle className="text-sm md:text-base font-bold text-slate-800 flex items-center gap-2">
          <Activity size={18} className="text-blue-600" />
          Saúde do Negócio
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Volume de Pedidos */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium italic">Volume de Pedidos:</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
              {ordersCount}
            </span>
          </div>

          {/* Status Atual com Badge Dinâmico */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 font-medium italic">Status Atual:</span>
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${status.bg} ${status.color}`}>
              {status.icon}
              {status.label}
            </span>
          </div>
        </div>

        {/* Branding e Inteligência */}
        <div className="mt-8 p-3 rounded-lg bg-blue-50/40 border border-blue-100/50 italic text-[11px] text-blue-800 text-center font-medium leading-relaxed">
          "Dados transformados em inteligência estratégica para Marcos Lima."
        </div>
      </CardContent>
    </Card>
  );
}