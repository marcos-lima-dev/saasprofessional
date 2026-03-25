"use client";

import { useOrders } from "@/context/order-context";
import { StatsCard } from "@/components/shared/stats-card";
import { NewOrderModal } from "@/components/shared/new-order-modal";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { orders, clients } = useOrders();

  // --- CÁLCULOS TOTAIS EM TEMPO REAL ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const totalClients = clients.length;
  const totalOrders = orders.length;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-8">
      {/* 1. HEADER COM BOAS-VINDAS E AÇÃO PRINCIPAL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, Marcos Lima</h1>
          <p className="text-sm text-slate-500 font-medium">Bem-vindo de volta ao FinanceHub.</p>
        </div>
        
        {/* Usando o nosso recurso comum de criação de pedido */}
        <NewOrderModal>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-md py-6 px-6 text-lg font-bold transition-all hover:scale-[1.05]">
            <Plus size={20} /> Criar Pedido
          </Button>
        </NewOrderModal>
      </div>

      {/* 2. MÉTRICAS (USANDO O RECURSO COMUM StatsCard) */}
      {/* Aqui substituímos o MetricsGrid antigo para ter controle total dos dados nesta página */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          label="Receita Total"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
          icon={DollarSign}
          colorClassName="text-emerald-600 bg-emerald-50"
        />
        <StatsCard 
          label="Clientes"
          value={totalClients}
          icon={Users}
          colorClassName="text-blue-600 bg-blue-50"
        />
        <StatsCard 
          label="Vendas"
          value={totalOrders}
          icon={ShoppingBag}
          colorClassName="text-purple-600 bg-purple-50"
        />
        <StatsCard 
          label="Ticket Médio"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(averageTicket)}
          icon={TrendingUp}
          colorClassName="text-amber-600 bg-amber-50"
        />
      </div>

      {/* 3. GRÁFICO E LISTA RECENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}