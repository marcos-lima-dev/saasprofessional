"use client";

import { useOrders } from "@/context/order-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowRight, ReceiptText } from "lucide-react";

export function RecentOrders() {
  const { orders, removeOrder } = useOrders();
  const latestOrders = [...orders].reverse().slice(0, 5);

  const handleDelete = (id: string) => {
    removeOrder(id);
    toast.success(`Pedido ${id} removido.`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <ReceiptText size={18} className="text-blue-600" />
          <h3 className="text-base font-bold text-slate-900">Histórico Recente</h3>
        </div>
        <Link href="/pedidos">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold text-xs gap-1">
            Ver tudo <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
      
      <div className="divide-y divide-slate-50 flex-1">
        {latestOrders.map((order) => (
          <div key={order.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between group gap-4">
            
            {/* 1. COLUNA PRINCIPAL (Sempre visível) */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar className="h-8 w-8 border border-blue-100 flex-shrink-0">
                <AvatarFallback className="bg-blue-50 text-blue-700 text-[10px] font-bold">
                  {order.customer.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {order.customer}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {order.id}
                </span>
              </div>
            </div>

            {/* 2. COLUNA DE DATA (Sempre visível, mas compacta no mobile) */}
            <div className="flex-shrink-0 text-right">
               <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded md:bg-transparent md:p-0">
                {order.date}
              </span>
            </div>

            {/* 3. CONTEÚDO EXTRA (Apenas Desktop / telas 'md' para cima) */}
            <div className="hidden md:flex items-center gap-6 flex-shrink-0">
              {/* Valor */}
              <p className="text-sm font-bold text-slate-700 w-24 text-right">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount)}
              </p>
              
              {/* Status */}
              <Badge 
                variant="outline" 
                className={`text-[9px] px-1.5 h-4 border-none font-bold uppercase w-16 justify-center ${
                  order.status.toLowerCase() === "pago" 
                    ? "bg-green-50 text-green-700" 
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {order.status}
              </Badge>

              {/* Ações */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteDialog 
                  title="Excluir?"
                  itemName={order.customer}
                  onConfirm={() => handleDelete(order.id)}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30">
         <p className="text-[10px] text-center text-slate-400 font-medium">
           © FinanceHub • Business Intelligence
         </p>
      </div>
    </div>
  );
}