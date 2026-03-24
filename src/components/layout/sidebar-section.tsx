interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="pb-4">
      {/* Título da seção (estilo idêntico ao seu HTML de referência) */}
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
        {title}
      </p>
      
      {/* Aqui dentro entrarão os SidebarItems */}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}