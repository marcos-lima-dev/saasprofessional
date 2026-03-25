"use client";

import { useOrders } from "@/context/order-context";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Phone, User, Users, TrendingUp, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { StatsCard } from "@/components/shared/stats-card"; // Reutilizando nosso componente!

export default function ClientsPage() {
  const { clients, removeClient, search } = useOrders();

  // --- CÁLCULOS DINÂMICOS PARA OS CARDS ---
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === "Ativo").length;
  const totalSpent = clients.reduce((acc, client) => acc + client.spent, 0);
  const averageSpent = totalClients > 0 ? totalSpent / totalClients : 0;

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    removeClient(id);
    toast.success(`Cliente ${name} removido com sucesso.`);
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-sm text-slate-500 font-medium">Gestão de usuários da base.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto shadow-sm transition-all">
          <UserPlus size={16} /> Novo Cliente
        </Button>
      </div>

      {/* GRID DE RESUMO - REUTILIZANDO COMPONENTES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          label="Total de Clientes"
          value={totalClients}
          icon={Users}
          description="Base cadastrada"
          colorClassName="text-blue-600 bg-blue-50"
        />
        <StatsCard 
          label="Gasto Médio"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(averageSpent)}
          icon={TrendingUp}
          description="Por cliente"
          colorClassName="text-emerald-600 bg-emerald-50"
        />
        <StatsCard 
          label="Clientes Ativos"
          value={activeClients}
          icon={UserCheck}
          description="Status ativo"
          colorClassName="text-purple-600 bg-purple-50"
        />
      </div>

      {/* TABELA DE DADOS */}
      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            Base de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto custom-scrollbar">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="min-w-[200px] py-4">Cliente</TableHead>
                    <TableHead className="min-w-[180px]">Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Gasto Total</TableHead>
                    <TableHead className="w-[100px] text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-slate-50/30 transition-colors">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{client.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">ID: {client.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1.5"><Mail size={12} /> {client.email}</span>
                          <span className="flex items-center gap-1.5"><Phone size={12} /> {client.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-slate-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.spent)}
                      </TableCell>
                      
                      <TableCell className="text-center">
                        <DeleteDialog 
                          title="Excluir cliente?"
                          description="Você está prestes a remover permanentemente o cliente"
                          itemName={client.name}
                          onConfirm={() => handleDelete(client.id, client.name)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredClients.length === 0 && (
            <div className="p-16 text-center text-slate-400">
              Nenhum cliente encontrado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}