import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Motor de exportação de PDF do FinanceHub - Versão Final Profissional
 */
export const exportElementToPDF = async (
  elementRef: React.RefObject<HTMLDivElement | null>,
  fileName: string = "financehub-relatorio"
) => {
  const element = elementRef.current;
  if (!element) return;

  // Salva os estilos originais
  const originalWidth = element.style.width;
  const originalMinWidth = element.style.minWidth;

  try {
    // 1. FORÇA O LAYOUT DESKTOP AGRESSIVAMENTE
    // Usamos 1280px para garantir que o Tailwind ative o modo 'md' ou 'lg'
    element.style.setProperty("width", "1280px", "important");
    element.style.setProperty("min-width", "1280px", "important");

    await document.fonts.ready;
    // Delay estratégico para o navegador processar a mudança de largura
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 2. CONVERTE PARA PNG
    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: "#ffffff",
      pixelRatio: 2, 
      width: 1280, // Força a largura também na captura
      filter: (node) => {
        const tagName = node.tagName ? node.tagName.toLowerCase() : "";
        return tagName !== "button"; 
      }
    });

    // 3. RESTAURA O LAYOUT ORIGINAL PARA O USUÁRIO
    element.style.width = originalWidth;
    element.style.minWidth = originalMinWidth;

    // 4. CONFIGURA O PDF EM MODO PAISAGEM (A4)
    // Deitado é o melhor formato para Dashboards
    const pdf = new jsPDF("l", "mm", "a4");
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calcula a proporção para caber na página mantendo o aspecto
    pdf.addImage(dataUrl, "PNG", 10, 10, pdfWidth - 20, 0, undefined, "FAST");
    
    const timestamp = new Date().getTime();
    pdf.save(`${fileName}-${timestamp}.pdf`);
    
    return true;
  } catch (error) {
    // Limpeza em caso de erro
    if (element) {
      element.style.width = originalWidth;
      element.style.minWidth = originalMinWidth;
    }
    console.error("🔥 [PDF Engine] Falha na exportação:", error);
    throw error;
  }
};