"use client";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LifeBuoy, 
  Box 
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { SidebarSection } from "./sidebar-section";
import { UpgradeCard } from "./upgrade-card";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#101322] flex flex-col border-r border-slate-800 shrink-0 h-screen">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Box size={20} />
        </div>
        <h1 className="text-white text-lg font-bold tracking-tight">SaaS Admin</h1>
      </div>

      {/* Seção de Navegação */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        <SidebarSection title="Menu Principal">
          {/* Note: Removemos o 'active'. O SidebarItem agora usa o usePathname() internamente */}
          <SidebarItem icon={LayoutDashboard} label="Painel" href="/" />
          <SidebarItem icon={ShoppingCart} label="Pedidos" href="/pedidos" />
          <SidebarItem icon={Users} label="Clientes" href="/clientes" />
          <SidebarItem icon={BarChart3} label="Relatórios" href="/relatorios" />
        </SidebarSection>

        <div className="pt-4 border-t border-slate-800/50">
          <SidebarSection title="Sistema">
            <SidebarItem icon={Settings} label="Configurações" href="/configuracoes" />
            <SidebarItem icon={LifeBuoy} label="Suporte" href="/suporte" />
          </SidebarSection>
        </div>
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="mt-auto">
        <UpgradeCard />
      </div>
    </aside>
  );
}