import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react"; // Ícone para dar um brilho no "Pro"

export function UpgradeCard() {
  return (
    <div className="p-4 bg-slate-900 m-4 rounded-xl border border-slate-800 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={14} className="text-blue-400" />
        <p className="text-xs font-semibold text-slate-100">Plano Pro</p>
      </div>
      
      <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
        Tenha exportações ilimitadas e relatórios personalizados.
      </p>
      
      <Button 
        size="sm" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold h-8 transition-all"
      >
        Assinar Agora
      </Button>
    </div>
  );
}