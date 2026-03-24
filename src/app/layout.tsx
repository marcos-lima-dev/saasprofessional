import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner"; // 1. Importe o Toaster

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
    <html lang="pt-BR"> {/* Ajustado para Português */}
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-[#f6f6f8]">
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-y-auto">
            <Header />
            
            <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
              {children}
            </main>
          </div>
        </div>
        
        {/* 2. O Toaster deve ficar aqui, fora da estrutura de layout principal */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}