"use client";

import { useState } from "react";
import { useOrders } from "@/context/order-context";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface NewOrderModalProps {
  children?: React.ReactNode; // Permite passar qualquer botão como gatilho
}

export function NewOrderModal({ children }: NewOrderModalProps) {
  const { addOrder } = useOrders();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer || !amount) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    // Simula um pequeno delay para dar sensação de processamento
    setTimeout(() => {
      addOrder(customer, parseFloat(amount));
      toast.success(`Pedido para ${customer} criado com sucesso!`);
      setLoading(false);
      setOpen(false);
      // Limpa os campos
      setCustomer("");
      setAmount("");
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <ShoppingBag size={16} /> Novo Pedido
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="text-blue-600" size={20} />
            Lançar Novo Pedido
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Nome do Cliente</Label>
            <Input 
              id="customer" 
              placeholder="Ex: Lico Ghost Pet" 
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="focus-visible:ring-blue-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Pedido (R$)</Label>
            <Input 
              id="amount" 
              type="number" 
              step="0.01"
              placeholder="0,00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus-visible:ring-blue-600"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Criar Pedido"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}