import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { OrderProvider } from "@/context/order-context"; // 1. Importe o Provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaaS Professional Dashboard",
  description: "Aprendizado passo a passo com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. Envolva toda a estrutura com o OrderProvider */}
        <OrderProvider>
          <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-y-auto">
              <Header />
              
              <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
                {children}
              </main>
            </div>
          </div>
          
          <Toaster position="top-right" richColors closeButton />
        </OrderProvider>
      </body>
    </html>
  );
}