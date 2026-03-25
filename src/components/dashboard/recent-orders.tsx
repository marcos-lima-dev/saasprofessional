"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "./order-status";
import { TableActions } from "./table-actions";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/order-context";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RecentOrders() {
  // 1. Pegamos orders, removeOrder e agora também o SEARCH do contexto
  const { orders, removeOrder, search } = useOrders();

  // 2. Lógica de Filtro: filtramos a lista antes de fazer o .map()
  // Ela busca pelo nome do cliente ou pelo ID do pedido
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.toLowerCase();
    return (
      order.customer.toLowerCase().includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm)
    );
  });

  function handleDelete(id: string) {
    removeOrder(id);
    toast.error("Pedido removido!", {
      description: `O pedido ${id} foi excluído do sistema.`,
    });
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Pedidos Recentes</h3>
          <p className="text-sm text-slate-500 mt-1">Gerencie o histórico de compras.</p>
        </div>
        
        <TableActions />
      </div>
      
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">Cliente</TableHead>
            <TableHead className="font-bold">Valor</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Data</TableHead>
            <TableHead className="text-right font-bold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 3. Se houver pedidos filtrados, mostramos a lista. Se não, avisamos. */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <TableCell className="font-medium text-slate-600">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-600">
                      {order.customer.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{order.customer}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-600">
                  {/* Correção do NaN: forçamos Number() e garantimos 0 se for vazio */}
                  {new Intl.NumberFormat('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                  }).format(Number(order.amount) || 0)}
                </TableCell>
                <TableCell>
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="text-sm text-slate-500">{order.date}</TableCell>
                
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir este pedido?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover o pedido de <strong>{order.customer}</strong>? 
                          Essa ação é permanente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(order.id)}
                          className="bg-red-600 hover:bg-red-700 text-white border-none"
                        >
                          Confirmar Exclusão
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-slate-500 italic">
                Nenhum pedido encontrado para "{search}".
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
        {/* Mostra quantos pedidos estão visíveis no momento */}
        <p className="text-sm text-slate-500">
          Mostrando {filteredOrders.length} de {orders.length} pedidos
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-slate-600 hover:bg-white border-slate-200">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="text-slate-600 hover:bg-white border-slate-200">
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}