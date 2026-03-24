"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useOrders } from "@/context/order-context"; // 1. Importe o hook do contexto
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

export function CreateOrderModal() {
  const { addOrder } = useOrders(); // 2. Pegue a função de adicionar pedido
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 3. Estados para capturar o que o usuário digita
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulando delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 4. Envia os dados capturados para o estado global
    addOrder(customer, Number(amount));

    setLoading(false);
    setOpen(false); 
    
    // Limpa os campos para a próxima vez
    setCustomer("");
    setAmount("");

    toast.success("Pedido criado!", {
      description: `A venda para ${customer} foi registrada.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus size={18} />
          Criar Pedido
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white text-slate-900">
        <form onSubmit={handleConfirm}>
          <DialogHeader>
            <DialogTitle>Novo Pedido</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para registrar uma nova venda no sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Cliente</label>
              <input 
                id="name" 
                required
                value={customer} // 5. Liga o input ao estado
                onChange={(e) => setCustomer(e.target.value)} // Atualiza o estado ao digitar
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                placeholder="Ex: Marcos Lima"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="value" className="text-sm font-medium">Valor (R$)</label>
              <input 
                id="value" 
                type="number"
                required
                value={amount} // 6. Liga o input ao estado
                onChange={(e) => setAmount(e.target.value)} // Atualiza o estado ao digitar
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                placeholder="0,00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Confirmar Pedido"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}