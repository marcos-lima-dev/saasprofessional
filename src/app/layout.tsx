import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { OrderProvider } from "@/context/order-context";
import { Footer } from "@/components/shared/footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinanceHub | Inteligência Estratégica",
  description: "Painel administrativo de alta performance desenvolvido por Marcos Lima",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <OrderProvider>
          <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
            
            {/* 1. SIDEBAR DESKTOP */}
            <div className="hidden lg:flex">
              <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              {/* 2. HEADER */}
              <Header />
              
              {/* 3. CONTEÚDO PRINCIPAL COM SCROLL */}
              <main className="flex-1 overflow-y-auto">
                <div className="flex flex-col min-h-full">
                  {/* Container do Conteúdo */}
                  <div className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto w-full space-y-8">
                      {children}
                    </div>
                  </div>

                  {/* 4. FOOTER: Posicionado no final da rolagem */}
                  <Footer />
                </div>
              </main>
            </div>
          </div>
          
          <Toaster position="top-right" richColors closeButton />
        </OrderProvider>
      </body>
    </html>
  );
}