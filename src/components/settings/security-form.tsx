"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export function SecurityForm() {
  const [loading, setLoading] = useState(false);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success("Senha alterada!", {
      description: "Sua conta está segura agora.",
    });
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-slate-900">Segurança</h4>
        <p className="text-xs text-slate-500">Mantenha sua conta protegida.</p>
      </div>

      <form onSubmit={handlePasswordChange} className="md:col-span-2 space-y-4 max-w-2xl">
        <div className="grid gap-2">
          <Label htmlFor="current">Senha Atual</Label>
          <Input id="current" type="password" placeholder="••••••••" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new">Nova Senha</Label>
          <Input id="new" type="password" placeholder="••••••••" />
        </div>
        <Button variant="outline" disabled={loading}>
          {loading ? "Processando..." : "Atualizar Senha"}
        </Button>
      </form>
    </section>
  );
}