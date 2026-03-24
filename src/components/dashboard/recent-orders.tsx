import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RECENT_ORDERS } from "@/lib/mocks";
import { OrderStatus } from "./order-status";
import { TableActions } from "./table-actions"; // O novo componente que criamos
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentOrders() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* 1. Cabeçalho com as Ações Isoladas */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Pedidos Recentes</h3>
          <p className="text-sm text-slate-500 mt-1">Gerencie o histórico de compras.</p>
        </div>
        
        {/* Aqui entra o componente que criamos antes! */}
        <TableActions />
      </div>
      
      {/* 2. Corpo da Tabela */}
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
          {RECENT_ORDERS.map((order) => (
            <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors group">
              <TableCell className="font-medium text-slate-600">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-600">
                    {order.initials}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{order.customer}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">{order.amount}</TableCell>
              <TableCell>
                <OrderStatus status={order.status} />
              </TableCell>
              <TableCell className="text-sm text-slate-500">{order.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                  <MoreVertical size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 3. Rodapé de Paginação (Idêntico ao seu HTML de referência) */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <p className="text-sm text-slate-500">Mostrando {RECENT_ORDERS.length} de 126 pedidos</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled className="text-slate-400 cursor-not-allowed">
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