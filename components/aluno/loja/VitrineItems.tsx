"use client";

import { CheckCircle2, Star } from "lucide-react";

interface VitrineItemsProps {
  itens: any[];
  inventario: string[];
  pontosAluno: number;
  onComprar: (item: any) => void;
}

export default function VitrineItems({ itens, inventario, pontosAluno, onComprar }: VitrineItemsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {itens.map(item => {
        const jaPossui = inventario.includes(item.titulo);
        return (
          <div key={item.id} className="border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#1a1a1a] p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            {jaPossui && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase">Na Mochila</div>}
            <div>
              <div className="text-5xl mb-4 text-center py-4 bg-white dark:bg-black rounded-xl border border-slate-100 dark:border-[#222]">{item.icone}</div>
              <h3 className="font-bold text-lg text-center text-slate-800 dark:text-white">{item.titulo}</h3>
              <p className="text-xs text-slate-500 text-center mb-6">{item.descricao}</p>
            </div>
            <button 
              onClick={() => onComprar(item)} 
              disabled={jaPossui || pontosAluno < item.preco} 
              className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 ${jaPossui ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-500" : pontosAluno >= item.preco ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-200 dark:bg-[#222] text-slate-400 cursor-not-allowed"}`}
            >
              {jaPossui ? <><CheckCircle2 size={18}/> Adquirido</> : <><Star size={18} /> {item.preco} pts</>}
            </button>
          </div>
        )
      })}
    </div>
  );
}