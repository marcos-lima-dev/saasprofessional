import { MetricCard } from "./metric-card";
import { DASHBOARD_METRICS } from "@/lib/mocks";

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {DASHBOARD_METRICS.map((metric, index) => (
        <MetricCard 
          key={index}
          title={metric.title}
          value={metric.value}
          percentage={metric.percentage}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </div>
  );
}