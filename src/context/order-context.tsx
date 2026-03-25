"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { RECENT_ORDERS as INITIAL_ORDERS } from "@/lib/mocks";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: "Pendente" | "Pago" | "Cancelado";
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  spent: number;
}

interface OrderContextType {
  orders: Order[];
  clients: Client[]; // Agora é calculado automaticamente
  search: string;
  setSearch: (value: string) => void;
  addOrder: (customer: string, amount: number) => void;
  removeOrder: (id: string) => void;
  // Note: removeClient agora removerá todos os pedidos daquele cliente
  removeClient: (customerName: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS as Order[]);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("@saas-admin:orders");
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("@saas-admin:orders", JSON.stringify(orders));
    }
  }, [orders, mounted]);

  // 🔥 A MÁGICA ESTÁ AQUI:
  // Varremos todos os pedidos e montamos a lista de clientes única.
  const clients = useMemo(() => {
    const clientMap = new Map<string, Client>();

    orders.forEach((order) => {
      const existing = clientMap.get(order.customer);
      if (existing) {
        existing.spent += order.amount;
      } else {
        clientMap.set(order.customer, {
          id: `CL-${order.customer.substring(0, 3).toUpperCase()}`,
          name: order.customer,
          email: `${order.customer.toLowerCase().replace(/\s+/g, ".")}@financehub.com`,
          phone: "(21) 99999-0000",
          status: "Ativo",
          spent: order.amount,
        });
      }
    });

    return Array.from(clientMap.values());
  }, [orders]);

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

  const removeOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const removeClient = (customerName: string) => {
    // Para remover um cliente desta lógica, removemos os pedidos dele
    setOrders((prev) => prev.filter((o) => o.customer !== customerName));
  };

  if (!mounted) return null;

  return (
    <OrderContext.Provider value={{ orders, clients, search, setSearch, addOrder, removeOrder, removeClient }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  return context;
};