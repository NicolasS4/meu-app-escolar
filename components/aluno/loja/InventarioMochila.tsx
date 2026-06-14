"use client";

import { CheckCircle2, Clock, Shirt, CircleOff, Sparkles, Store } from "lucide-react";
import { CATALOGO_GLOBAL, CATALOGO_SECRETO } from "./catalogo";

interface InventarioMochilaProps {
  inventario: string[];
  aluno: any;
  compras: any[];
  onEquipar: (itemId: string, tipoItem: string) => void;
  onDesequipar: (itemId: string, tipoItem: string) => void;
}

export default function InventarioMochila({ inventario, aluno, compras, onEquipar, onDesequipar }: InventarioMochilaProps) {
  
  const itensCompletos = inventario.reduce((acc, itemId) => {
    const itemCat = CATALOGO_GLOBAL.find(i => i.id === itemId || i.titulo === itemId) || 
                    CATALOGO_SECRETO.find(i => i.id === itemId || i.titulo === itemId);
    if (itemCat) acc.push({ itemId, itemCat });
    return acc;
  }, [] as { itemId: string, itemCat: any }[]);

  const acessorios = itensCompletos.filter(i => i.itemCat.tipo === 'acessorios');
  const molduras = itensCompletos.filter(i => i.itemCat.tipo === 'molduras');

  const renderItemCard = (itemId: string, itemCat: any) => {
    const isEquipado = 
      aluno.skin_equipada === itemId || 
      aluno.borda_equipada === itemId ||
      aluno.skin_equipada === itemCat.id ||
      aluno.borda_equipada === itemCat.id;
    
    return (
      <div key={itemId} className={`border p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${isEquipado ? "border-red-400 bg-red-50 dark:bg-red-500/10" : "border-slate-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a]"}`}>
        <span className="text-3xl">{itemCat.icone}</span>
        
        <span className="text-xs font-bold text-center text-slate-700 dark:text-slate-200">{itemCat.titulo}</span>
        
        {itemCat.raridade && (
          <span className="text-[9px] font-black uppercase text-purple-500 bg-purple-500/10 px-1.5 rounded">
            {itemCat.raridade}
          </span>
        )}
        
        <button 
          // 🔥 ENVIANDO O ITEM_ID ORIGINAL PARA PASSAR PELA TRAVA DE SEGURANÇA!
          onClick={() => isEquipado ? onDesequipar(itemId, itemCat.tipo) : onEquipar(itemId, itemCat.tipo)}
          className={`mt-2 w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            isEquipado ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30" : "bg-slate-100 hover:bg-slate-200 dark:bg-[#333] dark:hover:bg-[#444] text-slate-700 dark:text-slate-300"
          }`}
        >
          {isEquipado ? <><CircleOff size={14}/> Desequipar</> : <><Shirt size={14}/> Equipar</>}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-4">
      <section>
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-[#222] pb-2">
          <div className="p-1.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500 rounded-lg">
            <Shirt size={16} />
          </div>
          <h3 className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider text-sm">Meus Acessórios</h3>
        </div>
        {acessorios.length === 0 ? <p className="text-sm text-slate-400 dark:text-slate-500 italic">Você ainda não tem nenhum acessório.</p> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {acessorios.map(item => renderItemCard(item.itemId, item.itemCat))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-[#222] pb-2">
          <div className="p-1.5 bg-amber-100 dark:bg-amber-500/20 text-amber-500 rounded-lg">
            <Sparkles size={16} />
          </div>
          <h3 className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider text-sm">Minhas Molduras</h3>
        </div>
        {molduras.length === 0 ? <p className="text-sm text-slate-400 dark:text-slate-500 italic">Você ainda não tem nenhuma moldura.</p> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {molduras.map(item => renderItemCard(item.itemId, item.itemCat))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-[#222] pb-2">
          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-lg">
            <Store size={16} />
          </div>
          <h3 className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider text-sm">Pedidos ao Professor</h3>
        </div>
        {compras.length === 0 ? <p className="text-sm text-slate-400 dark:text-slate-500 italic">Nenhum pedido realizado.</p> : (
          <div className="space-y-2">
            {compras.map(compra => (
              <div key={compra.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{compra.loja_itens?.icone}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">{compra.loja_itens?.titulo}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{new Date(compra.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                {compra.status === "aprovado" ? (
                  <div className="text-emerald-600 dark:text-emerald-400 font-black text-xs flex items-center gap-1"><CheckCircle2 size={14}/> Liberado</div>
                ) : (
                  <div className="text-orange-500 font-black text-xs flex items-center gap-1"><Clock size={14}/> Em análise</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}