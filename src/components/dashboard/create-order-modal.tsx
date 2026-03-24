"use client";

import { useState } from "react"; // 1. Hook para controlar o estado
import { toast } from "sonner";    // 2. Import do disparador de avisos
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
import { Plus, Loader2 } from "lucide-react"; // Loader para o efeito de girar

export function CreateOrderModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função que será chamada ao clicar em Confirmar
  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault(); // Evita que a página recarregue
    setLoading(true);

    // Simulando uma demora de rede (1.5 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setOpen(false); // Fecha o modal automaticamente

    // Dispara o alerta de sucesso!
    toast.success("Pedido criado!", {
      description: "A venda foi registrada com sucesso no sistema.",
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

      <DialogContent className="sm:max-w-[425px] bg-white">
        {/* Envolvemos tudo em um form para o 'submit' funcionar */}
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
                required // Campo obrigatório
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
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" 
                placeholder="0,00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setOpen(false)} // Fecha sem salvar
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]" 
              type="submit"
              disabled={loading} // Bloqueia cliques extras enquanto carrega
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