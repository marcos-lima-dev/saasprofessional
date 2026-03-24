"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ChartFilter() {
  return (
    <Select defaultValue="7d">
      <SelectTrigger className="w-[160px] bg-slate-50 border-slate-200 text-slate-600 font-medium focus:ring-blue-600/20">
        <SelectValue placeholder="Selecionar período" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="24h">Últimas 24 horas</SelectItem>
        <SelectItem value="7d">Últimos 7 dias</SelectItem>
        <SelectItem value="30d">Últimos 30 dias</SelectItem>
        <SelectItem value="90d">Últimos 3 meses</SelectItem>
      </SelectContent>
    </Select>
  );
}