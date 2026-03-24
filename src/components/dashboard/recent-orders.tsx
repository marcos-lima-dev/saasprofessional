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
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/order-context"; // 1. Importe o hook do contexto

export function RecentOrders() {
  const { orders } = useOrders(); // 2. Pegue os pedidos do estado global (cérebro)

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
          {/* 3. Agora usamos 'orders' em vez de RECENT_ORDERS */}
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors group">
              <TableCell className="font-medium text-slate-600">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center font-bold text-xs text-blue-600">
                    {/* Pegamos a primeira letra do nome como inicial */}
                    {order.customer.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{order.customer}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-slate-600">
                {/* Formatando o valor para real */}
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount)}
              </TableCell>
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