"use client";

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AppearanceForm() {
  const handleUpdate = () => {
    toast.info("Em breve!", {
      description: "O suporte a temas personalizados será liberado na versão 2.0.",
    });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-900">Aparência</h4>
        <p className="text-xs text-slate-500">Personalize o visual do seu painel.</p>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="grid gap-3">
          <Label>Tema do Sistema</Label>
          <div className="flex gap-4">
            {/* Tema Claro */}
            <div className="flex flex-col gap-2 cursor-pointer">
              <div className="w-40 h-24 rounded-lg bg-slate-100 border-2 border-blue-600 p-3 flex flex-col gap-2 shadow-sm">
                <div className="h-2 w-full bg-slate-200 rounded animate-pulse" />
                <div className="h-2 w-2/3 bg-slate-200 rounded animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-center text-blue-600">Claro (Ativo)</span>
            </div>

            {/* Tema Escuro (Simulado) */}
            <div className="flex flex-col gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
              <div className="w-40 h-24 rounded-lg bg-slate-900 border border-slate-800 p-3 flex flex-col gap-2 shadow-sm">
                <div className="h-2 w-full bg-slate-800 rounded" />
                <div className="h-2 w-2/3 bg-slate-800 rounded" />
              </div>
              <span className="text-xs font-medium text-center text-slate-500">Escuro</span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" onClick={handleUpdate}>Atualizar Preferências</Button>
      </div>
    </section>
  );
}