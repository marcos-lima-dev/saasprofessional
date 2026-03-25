"use client";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho do Relatório */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios Detalhados</h1>
          <p className="text-sm text-slate-500 font-medium">
            Análise de desempenho do FinanceHub.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
          <Download size={16} /> Exportar PDF
        </Button>
      </div>

      {/* Grid de Conteúdo */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Gráfico Ocupa 2 colunas no desktop */}
        <div className="md:col-span-2">
          <RevenueChart />
        </div>

        {/* Card de Resumo Lateral */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-slate-800">Métricas do Mês</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={18} /></div>
                <span className="text-slate-600 text-sm font-medium">Total Bruto</span>
              </div>
              <span className="font-bold text-slate-900">R$ 45.200</span>
            </div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={18} /></div>
                <span className="text-slate-600 text-sm font-medium">Novos Leads</span>
              </div>
              <span className="font-bold text-slate-900">+124</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={18} /></div>
                <span className="text-slate-600 text-sm font-medium">Crescimento</span>
              </div>
              <span className="font-bold text-green-600">+12.5%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}