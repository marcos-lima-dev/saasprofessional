"use client";

import { useRef, useState } from "react";
import { useOrders } from "@/context/order-context";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ReportSummary } from "@/components/shared/report-summary";
import { BusinessHealthCard } from "@/components/dashboard/business-health-card";
import { Download, FileBarChart2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportElementToPDF } from "@/lib/utils";
import { toast } from "sonner";

export default function ReportsPage() {
  const { orders, clients } = useOrders();
  const reportRef = useRef<HTMLDivElement>(null);
  const [showChartInReport, setShowChartInReport] = useState(true);

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

  const handleDownload = async () => {
    const toastId = toast.loading("Gerando relatório profissional...");
    try {
      // O nome do arquivo agora inclui o nome do projeto
      await exportElementToPDF(reportRef, "financehub-executivo-marcos");
      toast.success("PDF gerado com sucesso!", { id: toastId });
    } catch (err) {
      toast.error("Erro ao gerar PDF.", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full p-4 md:p-8">
      
      {/* HEADER MELHORADO (Resposta à image_a49f42.png) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-100">
            <FileBarChart2 size={26} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Relatórios</h1>
            <button 
              onClick={() => setShowChartInReport(!showChartInReport)}
              className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
            >
              {showChartInReport ? <EyeOff size={12}/> : <Eye size={12}/>}
              {showChartInReport ? "Ocultar gráfico no PDF" : "Mostrar gráfico no PDF"}
            </button>
          </div>
        </div>

        <Button 
          onClick={handleDownload} 
          className="bg-blue-600 hover:bg-blue-700 h-11 w-11 md:w-auto md:px-4 rounded-full md:rounded-lg shadow-md gap-2"
        >
          <Download size={20} className="md:size-4" />
          <span className="hidden md:inline">Exportar PDF</span>
        </Button>
      </div>

      {/* ÁREA DE CAPTURA */}
      <div 
        ref={reportRef} 
        className="p-6 md:p-10 space-y-8 bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">FinanceHub</h2>
            <p className="text-sm text-slate-500 font-medium">Relatório de Desempenho • {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">Uso Interno</span>
          </div>
        </div>

        <ReportSummary 
          totalRevenue={totalRevenue} 
          totalClients={clients.length} 
          avgOrder={avgOrder} 
        />

        <div className="grid gap-8 md:grid-cols-3">
          {/* GRÁFICO CONDICIONAL: Se estiver cortando, você pode ocultar aqui */}
          {showChartInReport && (
            <div className="md:col-span-2 bg-slate-50/30 p-4 rounded-xl border border-slate-100 min-h-[350px]">
              <h3 className="text-sm font-bold text-slate-700 mb-4 px-2">Fluxo de Faturamento Semana</h3>
              <RevenueChart />
            </div>
          )}
          
          <div className={showChartInReport ? "md:col-span-1" : "md:col-span-3"}>
            <BusinessHealthCard ordersCount={orders.length} avgOrder={avgOrder} />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] text-slate-400 italic">
            "Dados transformados em inteligência estratégica para Marcos Lima."
          </p>
          <p className="text-[10px] text-slate-300">FinanceHub v1.0</p>
        </div>
      </div>
    </div>
  );
}