import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  icon: LucideIcon;
  trend: "up" | "down" | "neutral";
}

export function MetricCard({ title, value, percentage, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
          <Icon size={20} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {percentage}
        </span>
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
  );
}