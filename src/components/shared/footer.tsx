"use client";

export function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-slate-100 bg-white/50 backdrop-blur-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 flex justify-center items-center group">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <p className="text-sm text-slate-500 font-medium">
            Feito por <span className="text-slate-900 font-bold">Marcos Lima Dev</span>
          </p>
          
          {/* Divisor discreto (apenas no desktop) */}
          <div className="hidden md:block w-px h-4 bg-slate-200" />

          <a 
            href="https://www.linkedin.com/in/marcos-de-sousa-lima-1a6a6320/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/5 hover:border-[#0077b5]/20 transition-all duration-300"
          >
            <span className="text-[11px] font-bold uppercase tracking-tight">
              Conectar
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}