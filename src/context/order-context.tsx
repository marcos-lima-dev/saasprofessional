"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { RECENT_ORDERS as INITIAL_DATA } from "@/lib/mocks";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "Pendente" | "Pago" | "Cancelado";
}

interface OrderContextType {
  orders: Order[];
  addOrder: (customer: string, amount: number) => void;
  removeOrder: (id: string) => void; // 1. Adicionamos a assinatura da função
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_DATA as Order[]);

  const addOrder = (customer: string, amount: number) => {
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`,
      customer,
      date: new Date().toLocaleDateString("pt-BR"),
      amount,
      status: "Pendente",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // 2. A Mágica do "Delete":
  // Filtramos a lista e mantemos apenas quem NÃO tem o ID que queremos apagar
  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    // 3. Não esqueça de passar a função no Provider!
    <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  return context;
};