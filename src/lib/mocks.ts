import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ClipboardCheck 
} from "lucide-react";

export const DASHBOARD_METRICS = [
  {
    title: "Receita Total",
    value: "R$ 45.200,00",
    percentage: "+12.5%",
    icon: DollarSign,
    trend: "up" as const,
  },
  {
    title: "Novas Ordens",
    value: "126",
    percentage: "-2.4%",
    icon: ShoppingBag,
    trend: "down" as const,
  },
  {
    title: "Usuários Ativos",
    value: "8,432",
    percentage: "+5.7%",
    icon: Users,
    trend: "up" as const,
  },
  {
    title: "Tarefas Pendentes",
    value: "12",
    percentage: "+3.1%",
    icon: ClipboardCheck,
    trend: "neutral" as const,
  },
];

export const RECENT_ORDERS = [
  {
    id: "#ORD-001",
    customer: "Lourdes Lima",
    initials: "LL",
    amount: "R$ 250,00",
    status: "pago",
    date: "24 Out, 2023",
  },
  {
    id: "#ORD-002",
    customer: "Pérola Cristina Pet",
    initials: "PCP",
    amount: "R$ 120,00",
    status: "pendente",
    date: "24 Out, 2023",
  },
  {
    id: "#ORD-003",
    customer: "Senhor Madureira",
    initials: "SM",
    amount: "R$ 450,00",
    status: "pago",
    date: "23 Out, 2023",
  },
];

export const CUSTOMERS = [
  {
    id: "1",
    name: "Marcos Lima",
    email: "marcos@exemplo.com",
    plan: "Pro",
    status: "pago", // Reusando a lógica de cores!
    lastActive: "2 horas atrás",
  },
  {
    id: "2",
    name: "Lourdes Silva",
    email: "lourdes@exemplo.com",
    plan: "Free",
    status: "pendente",
    lastActive: "1 dia atrás",
  },
  {
    id: "3",
    name: "Pérola Cristina",
    email: "perola@exemplo.com",
    plan: "Pro",
    status: "pago",
    lastActive: "Agora",
  },
];

export const REVENUE_DATA = [
  { day: "Seg", total: 4000 },
  { day: "Ter", total: 3000 },
  { day: "Qua", total: 5000 },
  { day: "Qui", total: 2780 },
  { day: "Sex", total: 1890 },
  { day: "Sáb", total: 2390 },
  { day: "Dom", total: 3490 },
];