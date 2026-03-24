"use client"; // 1. OBRIGATÓRIO no Next.js para usar Hooks de navegação

import Link from "next/link";
import { usePathname } from "next/navigation"; // 2. O "sensor" de rota
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
        ${isActive 
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }
      `}
    >
      <Icon 
        size={18} 
        className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`} 
      />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}