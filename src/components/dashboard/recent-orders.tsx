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

  // No Dashboard, mostramos apenas os 5 mais recentes de forma fixa
  const latestOrders = [...orders].reverse().slice(0, 5);

  const handleDelete = (id: string) => {
    removeOrder(id);
    toast.success(`Pedido ${id} removido.`);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Cabeçalho mais clean */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <ReceiptText size={18} className="text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Últimas Atividades</h3>
        </div>
        <Link href="/pedidos">
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 font-bold text-xs gap-1">
            Ver tudo <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
      
      {/* Lista em estilo Feed (Resolve o problema do espaço apertado) */}
      <div className="divide-y divide-slate-50 flex-1">
        {latestOrders.map((order) => (
          <div key={order.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-blue-100">
                <AvatarFallback className="bg-blue-50 text-blue-700 text-xs font-bold">
                  {order.customer.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  {order.customer}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {order.id} • {order.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount)}
                </p>
                <Badge 
                  variant="outline" 
                  className={`text-[9px] px-1.5 h-4 border-none ${
                    order.status.toLowerCase() === "pago" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {order.status}
                </Badge>
              </div>

              {/* Usando o nosso DeleteDialog COMPONENTIZADO */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteDialog 
                  title="Excluir?"
                  description="Remover pedido de"
                  itemName={order.customer}
                  onConfirm={() => handleDelete(order.id)}
                />
              </div>
            </div>
          </div>
        ))}

        {latestOrders.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-sm italic">
            Nenhuma atividade registrada.
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30">
         <p className="text-[11px] text-center text-slate-500 font-medium">
           Exibindo os últimos lançamentos do FinanceHub
         </p>
      </div>
    </div>
  );
}