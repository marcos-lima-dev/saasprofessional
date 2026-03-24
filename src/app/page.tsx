import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. Métricas (Cards) */}
      <MetricsGrid />

      {/* 2. Layout em Duas Colunas (Gráfico + Tabela no futuro, ou um abaixo do outro) */}
      <div className="grid grid-cols-1 gap-8">
        <RevenueChart />
        <RecentOrders />
      </div>
    </div>
  );
}