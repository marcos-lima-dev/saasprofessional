"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">
          <LifeBuoy size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Central de Ajuda</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Precisa de uma mãozinha com o sistema? Escolha um canal abaixo para falar com nosso time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: MessageCircle, title: "Chat Online", desc: "Resposta em até 5 min", color: "text-green-600", bg: "bg-green-50" },
          { icon: Mail, title: "E-mail", desc: "suporte@masterchef.ia", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Phone, title: "WhatsApp", desc: "(21) 9999-9999", color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((item, i) => (
          <Card key={i} className="hover:shadow-lg transition-all cursor-pointer border-slate-200 group">
            <CardContent className="pt-8 text-center space-y-3">
              <div className={`mx-auto size-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg">Perguntas Frequentes (FAQ)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            <details className="group p-4 cursor-pointer">
              <summary className="font-semibold text-slate-700 list-none flex justify-between items-center">
                Como exportar meus relatórios para PDF?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-500 mt-3 pl-2 border-l-2 border-blue-500">
                Basta acessar a aba "Relatórios" e clicar no botão azul "Exportar PDF" no canto superior direito.
              </p>
            </details>
            <details className="group p-4 cursor-pointer">
              <summary className="font-semibold text-slate-700 list-none flex justify-between items-center">
                Onde vejo os detalhes dos meus clientes?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="text-sm text-slate-500 mt-3 pl-2 border-l-2 border-blue-500">
                Você pode encontrar a lista completa na seção "Clientes" do menu lateral.
              </p>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}