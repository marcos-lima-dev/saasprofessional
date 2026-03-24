import { RecentOrders } from "@/components/dashboard/recent-orders";
import { TableActions } from "@/components/dashboard/table-actions";

export default function PedidosPage() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho da Página de Pedidos */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gerenciamento de Pedidos</h1>
        <p className="text-slate-500 text-sm">
          Visualize, filtre e gerencie todas as transações da sua plataforma.
        </p>
      </div>

      {/* Aqui está a mágica: Reutilizamos o componente RecentOrders! 
        No futuro, este componente poderia receber uma propriedade "full" 
        para mostrar mais colunas ou dados reais de uma API.
      */}
      <div className="w-full">
        <RecentOrders />
      </div>
    </div>
  );
}