"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Shield, Users, Swords, Plus, Check, X, Edit2, Crown } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ClaMasterTabProps {
  alunoId: string;
  turmaId: string;
  claIdAtual: string | null;
  atualizarDadosGlobais: () => void;
}

export default function ClaMasterTab({ alunoId, turmaId, claIdAtual, atualizarDadosGlobais }: ClaMasterTabProps) {
  const [activeTab, setActiveTab] = useState<"meu_cla" | "ranking">("meu_cla");

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* HEADER DAS ABAS DE CLÃ */}
      <div className="flex bg-slate-200/60 dark:bg-slate-900/60 p-1.5 rounded-2xl w-fit backdrop-blur-md mb-6">
        <button onClick={() => setActiveTab("meu_cla")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "meu_cla" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
          <Shield size={16} /> Meu Clã
        </button>
        <button onClick={() => setActiveTab("ranking")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === "ranking" ? "bg-indigo-600 text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
          <Swords size={16} /> Ranking de Clãs
        </button>
      </div>

      {activeTab === "meu_cla" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {claIdAtual ? (
            <PainelMeuCla alunoId={alunoId} turmaId={turmaId} claId={claIdAtual} atualizarDadosGlobais={atualizarDadosGlobais} />
          ) : (
            <PainelSemCla alunoId={alunoId} turmaId={turmaId} atualizarDadosGlobais={atualizarDadosGlobais} />
          )}
        </motion.div>
      )}

      {activeTab === "ranking" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <RankingClas turmaId={turmaId} />
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE 1: ALUNO NÃO TEM CLÃ (Criar / Convites)
// ==========================================
function PainelSemCla({ alunoId, turmaId, atualizarDadosGlobais }: any) {
  const [nomeCla, setNomeCla] = useState("");
  const [convites, setConvites] = useState<any[]>([]);

  useEffect(() => {
    buscarConvites();
  }, [alunoId]);

  const buscarConvites = async () => {
    const { data } = await supabase
      .from("cla_convites")
      // CORREÇÃO AQUI: Trazendo o ID do clã também para poder entrar nele!
      .select("id, clas(id, nome)") 
      .eq("receiver_id", alunoId)
      .eq("status", "pendente");
    if (data) setConvites(data);
  };

  const criarCla = async () => {
    if (nomeCla.length < 3) return toast.error("O nome deve ter pelo menos 3 letras.");
    
    // 1. Cria o Clã
    const { data: novoCla, error: errCla } = await supabase.from("clas").insert({ nome: nomeCla, criador_id: alunoId, turma_id: turmaId }).select().single();
    if (errCla || !novoCla) return toast.error("Erro ao criar clã.");

    // 2. Atualiza o perfil do aluno com o ID do novo clã
    await supabase.from("profiles").update({ cla_id: novoCla.id }).eq("id", alunoId);
    
    toast.success("Clã fundado com sucesso! 🛡️");
    atualizarDadosGlobais(); 
  };

  const responderConvite = async (conviteId: string, aceitar: boolean, claId: string) => {
    await supabase.from("cla_convites").update({ status: aceitar ? "aceito" : "recusado" }).eq("id", conviteId);
    
    if (aceitar) {
      await supabase.from("profiles").update({ cla_id: claId }).eq("id", alunoId);
      toast.success("Você entrou no clã! (+30% de Pontos Ativado)");
      atualizarDadosGlobais();
    } else {
      toast("Convite recusado.");
      buscarConvites();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* CRIAR CLÃ */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <Shield size={48} className="mx-auto text-indigo-500 mb-4" />
        <h3 className="text-2xl font-black mb-2">Fundar um Clã</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Membros de clãs ganham <strong className="text-emerald-500">+30% de Pontos</strong> em todas as atividades!</p>
        
        <input 
          type="text" placeholder="Nome do Clã (Ex: Os Vingadores)" value={nomeCla} onChange={(e) => setNomeCla(e.target.value)}
          className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold mb-4 outline-none focus:border-indigo-500"
        />
        <button onClick={criarCla} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 rounded-xl transition-all">Criar Clã</button>
      </div>

      {/* CONVITES RECEBIDOS */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Users className="text-indigo-500"/> Convites Recebidos ({convites.length})</h3>
        <div className="space-y-3">
          {convites.length === 0 ? (
            <p className="text-slate-500 italic text-sm">Nenhum convite pendente. Peça para um líder te convidar!</p>
          ) : (
            convites.map(c => (
              <div key={c.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-lg">{c.clas?.nome}</span>
                <div className="flex gap-2">
                  <button onClick={() => responderConvite(c.id, true, c.clas.id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"><Check size={18}/></button>
                  <button onClick={() => responderConvite(c.id, false, c.clas.id)} className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"><X size={18}/></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE 2: ALUNO JÁ TEM CLÃ (Gerenciar)
// ==========================================
function PainelMeuCla({ alunoId, turmaId, claId, atualizarDadosGlobais }: any) {
  const [cla, setCla] = useState<any>(null);
  const [membros, setMembros] = useState<any[]>([]);
  const [colegasDisponiveis, setColegasDisponiveis] = useState<any[]>([]); // Colegas sem clã
  
  const [isEditing, setIsEditing] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [colegaSelecionadoId, setColegaSelecionadoId] = useState(""); // Substitui a digitação por Select

  useEffect(() => { 
    buscarDadosDoCla(); 
    buscarColegasSemCla();
  }, [claId, turmaId]);

  const buscarDadosDoCla = async () => {
    const { data: dadosCla } = await supabase.from("clas").select("*").eq("id", claId).single();
    const { data: dadosMembros } = await supabase.from("profiles").select("id, nome, pontos").eq("cla_id", claId).order("pontos", { ascending: false });
    if (dadosCla) { setCla(dadosCla); setNovoNome(dadosCla.nome); }
    if (dadosMembros) setMembros(dadosMembros);
  };

  // Busca apenas colegas da mesma turma que não possuem clã (cla_id = null)
  const buscarColegasSemCla = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, nome")
      .eq("turma_id", turmaId)
      .eq("role", "aluno")
      .is("cla_id", null) // Condição vital!
      .neq("id", alunoId)
      .order("nome");
    
    if (data) setColegasDisponiveis(data);
  };

  const editarNome = async () => {
    await supabase.from("clas").update({ nome: novoNome }).eq("id", claId);
    setIsEditing(false);
    toast.success("Nome do clã atualizado!");
    buscarDadosDoCla();
  };

  const convidarMembro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colegaSelecionadoId) return toast.error("Selecione um colega da lista.");

    const { error } = await supabase.from("cla_convites").insert({ cla_id: claId, sender_id: alunoId, receiver_id: colegaSelecionadoId });
    if (error) {
      toast.error("Convite já enviado anteriormente.");
    } else {
      toast.success("Convite enviado com sucesso!");
      // Remove o colega da lista visual para evitar spam de cliques
      setColegasDisponiveis(prev => prev.filter(c => c.id !== colegaSelecionadoId));
      setColegaSelecionadoId("");
    }
  };

  const sairDoCla = async () => {
    if (cla?.criador_id === alunoId) {
      if(confirm("Você é o líder. Sair apagará o Clã inteiro. Tem certeza?")) {
        await supabase.from("clas").delete().eq("id", claId);
        await supabase.from("profiles").update({ cla_id: null }).eq("id", alunoId);
      } else return;
    } else {
      await supabase.from("profiles").update({ cla_id: null }).eq("id", alunoId);
    }
    toast("Você saiu do clã.");
    atualizarDadosGlobais();
  };

  const totalPontos = membros.reduce((acc, m) => acc + (m.pontos || 0), 0);
  const isLider = cla?.criador_id === alunoId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* DETALHES DO CLÃ */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            {isEditing ? (
              <div className="flex items-center gap-2 mb-2">
                <input value={novoNome} onChange={e => setNovoNome(e.target.value)} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg font-black text-2xl outline-none" autoFocus />
                <button onClick={editarNome} className="p-2 bg-indigo-600 text-white rounded-lg"><Check size={20}/></button>
              </div>
            ) : (
              <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2 flex items-center gap-3">
                {cla?.nome} {isLider && <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-indigo-500"><Edit2 size={20}/></button>}
              </h2>
            )}
            <p className="text-emerald-500 font-bold bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 rounded-full w-fit text-sm">
              Buff Ativo: +30% de Pontos Diários
            </p>
          </div>
          <div className="text-right bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Poder do Clã</p>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{totalPontos} pts</p>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users /> Membros ({membros.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {membros.map(m => (
            <div key={m.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold flex items-center gap-2">
                {m.id === cla?.criador_id && <Crown size={16} className="text-yellow-500" />} {m.nome}
              </span>
              <span className="text-slate-500 font-bold text-sm">{m.pontos} pts</span>
            </div>
          ))}
        </div>

        <button onClick={sairDoCla} className="mt-8 text-rose-500 font-bold hover:underline text-sm">
          {isLider ? "Desfazer Clã (Líder)" : "Sair do Clã"}
        </button>
      </div>

      {/* PAINEL DE CONVITE (SÓ LÍDER) COM SELECT */}
      <div className="lg:col-span-4 space-y-6">
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 ${!isLider && "opacity-50 pointer-events-none"}`}>
          <h3 className="font-black mb-4">Recrutar Colega</h3>
          <form onSubmit={convidarMembro} className="space-y-4">
            
            {/* NOVO: SELECT EM VEZ DE INPUT LIVRE */}
            <div className="relative">
              <select 
                value={colegaSelecionadoId} 
                onChange={e => setColegaSelecionadoId(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold outline-none focus:border-indigo-500 appearance-none cursor-pointer"
              >
                <option value="" disabled>-- Selecione um Aluno Sem Clã --</option>
                {colegasDisponiveis.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={!colegaSelecionadoId} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-black py-3 rounded-xl transition-all">
              <Plus size={20} /> Enviar Convite
            </button>

            {colegasDisponiveis.length === 0 && (
              <p className="text-xs text-orange-500 font-bold text-center">Todos da turma já possuem um clã!</p>
            )}
          </form>
          {!isLider && <p className="text-xs text-center mt-4 text-slate-500">Apenas o líder pode convidar.</p>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE 3: RANKING GERAL DE CLÃS DA TURMA
// ==========================================
function RankingClas({ turmaId }: { turmaId: string }) {
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data } = await supabase.from("vw_cla_ranking").select("*").eq("turma_id", turmaId).order("pontos_totais", { ascending: false });
      if (data) setRanking(data);
    };
    fetchRanking();
  }, [turmaId]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Swords className="text-indigo-500"/> Ranking de Poder dos Clãs</h3>
      
      {ranking.length === 0 ? (
        <p className="text-slate-500 italic text-center py-10">Nenhum clã fundado nesta turma ainda.</p>
      ) : (
        <div className="space-y-4">
          {ranking.map((cla, index) => (
            <div key={cla.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black w-8 text-center">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}</span>
                <div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-white">{cla.nome}</h4>
                  <p className="text-sm text-slate-500 font-bold">{cla.total_membros} Membros</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-none">{cla.pontos_totais}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pontos Totais</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}