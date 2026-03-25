"use client";

import { Search, Menu, User, Bell, ChevronDown } from "lucide-react";
import { useOrders } from "@/context/order-context";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { search, setSearch } = useOrders();

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0">
      
     <div className="flex items-center gap-4 flex-1">
        
       <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-64 bg-[#101322]">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 w-full max-w-[400px] focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all group">
          <Search size={18} className="text-slate-400 group-focus-within:text-blue-500" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LADO DIREITO: Notificações e Usuário */}
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-400 hover:text-slate-600 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>

        <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-slate-100">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-700">Marcos Lima</span>
            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">Admin</span>
          </div>
          
          <div className="size-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors overflow-hidden">
            <User size={20} />
          </div>
          <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}