import { CUSTOMERS } from "@/lib/mocks";
import { OrderStatus } from "@/components/dashboard/order-status";
import { TableActions } from "@/components/dashboard/table-actions";
import { User, Mail, Calendar } from "lucide-react";

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Meus Clientes</h1>
          <p className="text-sm text-slate-500">Gerencie sua base de usuários ativos.</p>
        </div>
        <TableActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CUSTOMERS.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="size-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <User size={24} />
              </div>
              <OrderStatus status={customer.status} />
            </div>

            <h3 className="font-bold text-slate-900 text-lg">{customer.name}</h3>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={14} />
                Visto por último: {customer.lastActive}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Plano {customer.plan}</span>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}