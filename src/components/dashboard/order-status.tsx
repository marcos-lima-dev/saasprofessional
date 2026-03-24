import { Badge } from "@/components/ui/badge"; // Usando ShadCN

export function OrderStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pago: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    pendente: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    cancelado: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  };

  return (
    <Badge className={`capitalize font-bold border-none ${styles[status] || ""}`}>
      <span className="size-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </Badge>
  );
}