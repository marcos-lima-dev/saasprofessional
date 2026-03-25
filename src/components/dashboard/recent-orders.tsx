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
import { Trash2 } from "lucide-react"; // Importamos a lixeira
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/order-context";
import { toast } from "sonner"; // Para o aviso de exclusão

// Importações do Alert Dialog do ShadCN
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
  const { orders, removeOrder } = useOrders(); // Agora pegamos também o removeOrder

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
          {orders.map((order) => (
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
                    {/* Adicionamos o "order.amount || 0" para evitar o NaN */}
                    {new Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(order.amount || 0)}
            </TableCell>
              <TableCell>
                <OrderStatus status={order.status} />
              </TableCell>
              <TableCell className="text-sm text-slate-500">{order.date}</TableCell>
              
              {/* Célula de Ações com AlertDialog */}
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
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <p className="text-sm text-slate-500">Mostrando {orders.length} pedidos</p>
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