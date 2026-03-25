import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { OrderProvider } from "@/context/order-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS Professional Dashboard",
  description: "Painel administrativo responsivo com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* Adicionei o suppressHydrationWarning para evitar erros de extensões do Chrome */}
      <body className={inter.className} suppressHydrationWarning>
        <OrderProvider>
          <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
            
            {/* 1. SIDEBAR DESKTOP: Agora ela se esconde em telas menores que 'lg' (1024px) */}
            <div className="hidden lg:flex">
              <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
              {/* 2. HEADER: Ele agora contém o botão de menu para mobile */}
              <Header />
              
              {/* 3. CONTEÚDO PRINCIPAL: Ajustamos o padding (p-4 no mobile, p-8 no desktop) */}
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto w-full space-y-8">
                  {children}
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