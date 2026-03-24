import { Bell } from "lucide-react";
import { SearchInput } from "./search-input";
import { UserNav } from "./user-nav";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-900">Painel de Controle</h2>
        <SearchInput />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </Button>
        
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        
        <UserNav />
      </div>
    </header>
  );
}