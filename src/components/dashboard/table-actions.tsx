import { Search } from "lucide-react";
import { CreateOrderModal } from "./create-order-modal"; // Importe o modal aqui

export function TableActions() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 md:w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Buscar pedidos..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
        />
      </div>
      
      {/* Trocamos o botão <Button> pelo nosso Modal */}
      <CreateOrderModal />
    </div>
  );
}