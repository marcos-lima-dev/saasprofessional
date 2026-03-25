"use client";

import { StatsCard } from "@/components/shared/stats-card";
import { DollarSign, Users, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ReportSummaryProps {
  totalRevenue: number;
  totalClients: number;
  avgOrder: number;
}

export function ReportSummary({ totalRevenue, totalClients, avgOrder }: ReportSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard 
        label="Receita Bruta"
        value={formatCurrency(totalRevenue)}
        icon={DollarSign}
        colorClassName="text-emerald-600 bg-emerald-50"
      />
      <StatsCard 
        label="Base de Clientes"
        value={totalClients.toString()}
        icon={Users}
        colorClassName="text-blue-600 bg-blue-50"
      />
      <StatsCard 
        label="Ticket Médio"
        value={formatCurrency(avgOrder)}
        icon={TrendingUp}
        colorClassName="text-purple-600 bg-purple-50"
      />
    </div>
  );
}