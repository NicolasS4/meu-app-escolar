"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingBag, Star, Check, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface Turma { id: string; nome: string; }
interface ItemLoja { id: string; titulo: string; descricao: string; preco: number; icone: string; tipo: string; turma_id: string | null; }
interface Compra { id: string; item_id: string; aluno_id: string; status: string; created_at: string; profiles: { nome: string }; loja_itens: { titulo: string; preco: number } }

export default function LojaTab({ professorId }: { professorId: string }) {
  const [itens, setItens] = useState<ItemLoja[]>([]);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  
  const [novoItem, setNovoItem] = useState({ titulo: "", descricao: "", preco: 50, icone: "🎟️", tipo: "vantagem", turma_id: "" });
  const [isCreating, setIsCreating] = useState(false);

  const buscarDadosLoja = useCallback(async () => {
    // Busca Turmas
    const { data: turmasData } = await supabase.from("turmas").select("*").eq("professor_id", professorId).order("created_at", { ascending: true });
    if (turmasData) setTurmas(turmasData);

    // Busca os Itens
    const { data: itensData } = await supabase.from("loja_itens").select("*").eq("professor_id", professorId).order("preco", { ascending: true });
    if (itensData) setItens(itensData);

    // Busca as compras
    const { data: comprasData } = await supabase
      .from("compras")
      .select("*, profiles(nome), loja_itens!inner(titulo, preco, professor_id)")
      .eq("loja_itens.professor_id", professorId)
      .order("created_at", { ascending: false });

    if (comprasData) setCompras(comprasData as any);
  }, [professorId]);

  useEffect(() => {
    buscarDadosLoja();
  }, [buscarDadosLoja]);

  const handleCriarItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItem.titulo.trim()) return toast.error("Preencha o título.");
    setIsCreating(true);

    const payload = {
      professor_id: professorId,
      titulo: novoItem.titulo,
      descricao: novoItem.descricao,
      preco: novoItem.preco,
      icone: novoItem.icone,
      tipo: novoItem.tipo,
      turma_id: novoItem.turma_id === "" ? null : novoItem.turma_id
    };

    const { error } = await supabase.from("loja_itens").insert([payload]);
    if (!error) {
      toast.success("Item criado na loja!");
      setNovoItem({ titulo: "", descricao: "", preco: 50, icone: "🎟️", tipo: "vantagem", turma_id: "" });
      buscarDadosLoja();
    }
    setIsCreating(false);
  };

  const handleApagarItem = async (id: string) => {
    if (!window.confirm("Apagar este item da loja?")) return;
    await supabase.from("loja_itens").delete().eq("id", id);
    toast.success("Item apagado.");
    buscarDadosLoja();
  };

  const aprovarCompra = async (compraId: string) => {
    await supabase.from("compras").update({ status: "aprovado" }).eq("id", compraId);
    toast.success("Compra aprovada!");
    buscarDadosLoja();
  };

  const pendentes = compras.filter(c => c.status === "pendente");
  const historico = compras.filter(c => c.status !== "pendente");

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white flex items-center gap-3">
          <ShoppingBag className="text-indigo-600 dark:text-indigo-400" /> Gestão da Lojinha
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Adicionar Recompensa</h2>
            <form onSubmit={handleCriarItem} className="space-y-4">
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ícone</label>
                  <input required type="text" value={novoItem.icone} onChange={e => setNovoItem({...novoItem, icone: e.target.value})} className="w-full text-center px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] rounded-xl outline-none text-2xl text-slate-900 dark:text-white" maxLength={2} />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título do Item</label>
                  <input required type="text" value={novoItem.titulo} onChange={e => setNovoItem({...novoItem, titulo: e.target.value})} placeholder="Ex: Anular uma falta" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição</label>
                <textarea required value={novoItem.descricao} onChange={e => setNovoItem({...novoItem, descricao: e.target.value})} placeholder="Explique as regras de uso" className="w-full px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none" rows={2} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Item</label>
                  <select value={novoItem.tipo} onChange={e => setNovoItem({...novoItem, tipo: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none font-bold">
                    <option value="vantagem">Vantagem (Sala)</option>
                    <option value="skin">Acessório Pet</option>
                    <option value="borda">Moldura de Perfil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço (Pontos)</label>
                  <input required type="number" min="10" step="10" value={novoItem.preco} onChange={e => setNovoItem({...novoItem, preco: Number(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none font-bold" />
                </div>
              </div>

              {/* SELEÇÃO DE TURMA ÚNICA */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Para qual Turma?</label>
                <select value={novoItem.turma_id} onChange={e => setNovoItem({...novoItem, turma_id: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none font-bold">
                  <option value="">Todas as Turmas (Global)</option>
                  {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                </select>
              </div>

              <button type="submit" disabled={isCreating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">{isCreating ? <Loader2 className="animate-spin mx-auto" /> : "Salvar na Loja"}</button>
            </form>
          </div>

          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
            <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Prateleira da Turma</h2>
            <div className="space-y-3">
              {itens.length === 0 ? <p className="text-slate-500 text-sm">Nenhum item cadastrado.</p> : itens.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icone}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.titulo}</h4>
                      <div className="flex gap-2 items-center">
                        <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500 flex items-center gap-1"><Star size={12}/> {item.preco} pts</span>
                        <span className="text-[10px] bg-slate-200 dark:bg-[#222] text-slate-500 px-1.5 py-0.5 rounded uppercase">{item.tipo}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleApagarItem(item.id)} className="text-red-400 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPRAS DOS ALUNOS */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-500">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></span>
              Aprovações Pendentes ({pendentes.length})
            </h2>
            
            <div className="space-y-3">
              {pendentes.length === 0 ? <p className="text-slate-500 text-sm py-4">Nenhum aluno realizou compras recentes.</p> : pendentes.map(compra => (
                <div key={compra.id} className="border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/5 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">{compra.profiles.nome}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quer resgatar: <strong className="text-slate-700 dark:text-slate-200">{compra.loja_itens.titulo}</strong></p>
                    </div>
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20 px-2 py-1 rounded-md">{compra.loja_itens.preco} pts</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => aprovarCompra(compra.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"><Check size={14}/> Aprovar Uso</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Histórico Recente</h2>
            <div className="space-y-2">
              {historico.slice(0, 5).map(compra => (
                <div key={compra.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-[#222] last:border-0">
                  <span className="text-sm text-slate-600 dark:text-slate-300"><strong>{compra.profiles.nome}</strong> resgatou {compra.loja_itens.titulo}</span>
                  <span className="text-xs font-bold text-green-500">Aprovado</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}