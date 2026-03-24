import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  return (
    <div className="relative w-72 group">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" 
        size={18} 
      />
      <Input 
        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-blue-600/20 transition-all placeholder:text-slate-400" 
        placeholder="Buscar dados, pedidos..." 
      />
    </div>
  );
}