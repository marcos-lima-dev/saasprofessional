"use client";

import { useOrders } from "@/context/order-context";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ReceiptText, 
  DollarSign, 
  Package, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { NewOrderModal } from "@/components/shared/new-order-modal";
import { StatsCard } from "@/components/shared/stats-card"; // Nosso novo componente

export default function OrdersPage() {
  const { orders, removeOrder, search } = useOrders();

  // --- CÁLCULOS DINÂMICOS PARA OS CARDS ---
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const pendingOrders = orders.filter(o => o.status.toLowerCase() === "pendente").length;
  const paidOrders = orders.filter(o => o.status.toLowerCase() === "pago").length;

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteOrder = (id: string) => {
    removeOrder(id);
    toast.success(`Pedido ${id} removido com sucesso.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
          <p className="text-sm text-slate-500 font-medium">Gerencie as vendas do FinanceHub.</p>
        </div>
        
        <NewOrderModal>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto shadow-sm transition-all">
            <ShoppingBag size={16} /> Novo Pedido
          </Button>
        </NewOrderModal>
      </div>

      {/* 2. GRID DE RESUMO (StatsCards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          label="Receita Total"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
          icon={DollarSign}
          description="Volume total bruto"
          colorClassName="text-emerald-600 bg-emerald-50"
        />
        <StatsCard 
          label="Qtd. Pedidos"
          value={orders.length}
          icon={Package}
          description="Total processado"
          colorClassName="text-blue-600 bg-blue-50"
        />
        <StatsCard 
          label="Pendentes"
          value={pendingOrders}
          icon={Clock}
          description="Aguardando ação"
          colorClassName="text-amber-600 bg-amber-50"
        />
        <StatsCard 
          label="Pagos"
          value={paidOrders}
          icon={CheckCircle2}
          description="Vendas concluídas"
          colorClassName="text-purple-600 bg-purple-50"
        />
      </div>

      {/* 3. TABELA DE PEDIDOS */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <ReceiptText size={20} className="text-blue-600" />
            Histórico Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto custom-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="w-[120px] py-4">ID</TableHead>
                    <TableHead className="min-w-[200px]">Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px] text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50/30 transition-colors">
                      <TableCell className="font-mono text-xs font-bold text-blue-600">
                        {order.id}
                      </TableCell>
                      <TableCell className="font-bold text-slate-800">
                        {order.customer}
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {order.date}
                      </TableCell>
                      <TableCell className="font-bold text-slate-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`px-2 py-0.5 text-[10px] ${
                            order.status.toLowerCase() === "pago" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <DeleteDialog 
                          title="Excluir pedido?"
                          description="Você está removendo o pedido"
                          itemName={order.id}
                          onConfirm={() => handleDeleteOrder(order.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="p-16 text-center text-slate-400">
              Nenhum pedido encontrado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}