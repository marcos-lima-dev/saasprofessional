"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { RECENT_ORDERS as INITIAL_DATA } from "@/lib/mocks";

// Definindo o que é um Pedido
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
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_DATA as Order[]);

  const addOrder = (customer: string, amount: number) => {
    const newOrder: Order = {
      id: `#${Math.floor(Math.random() * 9000) + 1000}`, // Gera um ID aleatório
      customer,
      date: new Date().toLocaleDateString("pt-BR"),
      amount,
      status: "Pendente",
    };
    // Adiciona o novo pedido no TOPO da lista
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  return context;
};