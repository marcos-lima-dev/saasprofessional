import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[438px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[180px] bg-slate-100" />
          <Skeleton className="h-4 w-[240px] bg-slate-100" />
        </div>
        <Skeleton className="h-10 w-[160px] bg-slate-100" />
      </div>

      <div className="flex items-end justify-between gap-4 h-[280px] pt-10">
        <Skeleton className="h-[60%] w-full bg-slate-100" />
        <Skeleton className="h-[40%] w-full bg-slate-100" />
        <Skeleton className="h-[85%] w-full bg-slate-100" />
        <Skeleton className="h-[55%] w-full bg-slate-100" />
        <Skeleton className="h-[30%] w-full bg-slate-100" />
        <Skeleton className="h-[45%] w-full bg-slate-100" />
        <Skeleton className="h-[70%] w-full bg-slate-100" />
      </div>
    </div>
  );
}