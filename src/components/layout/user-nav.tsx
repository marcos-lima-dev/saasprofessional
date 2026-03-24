import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserNav() {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-semibold text-slate-900 leading-none">Marcos Lima</p>
        <p className="text-xs text-slate-500 mt-1">Administrador</p>
      </div>
      <Avatar className="size-9 border border-blue-600/20">
        <AvatarImage src="https://github.com/marcoslima.png" alt="Marcos" />
        <AvatarFallback className="bg-blue-600/10 text-blue-600 font-bold">ML</AvatarFallback>
      </Avatar>
    </div>
  );
}