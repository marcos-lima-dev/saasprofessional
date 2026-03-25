"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Agora usando o componente instalado
import { Label } from "@/components/ui/label"; // Agora usando o componente instalado
import { toast } from "sonner";
import { Camera } from "lucide-react";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Perfil atualizado com sucesso!");
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-900">Perfil Público</h4>
        <p className="text-xs text-slate-500">Como os outros verão você no sistema.</p>
      </div>

      <form onSubmit={onSubmit} className="md:col-span-2 space-y-6 max-w-2xl">
        {/* Simulação de Upload de Foto */}
        <div className="flex items-center gap-4">
          <div className="size-16 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
            <Camera size={20} />
          </div>
          <Button type="button" variant="outline" size="sm">Alterar Foto</Button>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="display-name">Nome de Exibição</Label>
          <Input id="display-name" defaultValue="Marcos Lima" />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" readOnly defaultValue="marcos.lima@dev.com" className="bg-slate-50 text-slate-500" />
          <p className="text-[11px] text-slate-400 italic font-medium">* O e-mail não pode ser alterado por motivos de segurança.</p>
        </div>

        <Button disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </section>
  );
}