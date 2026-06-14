"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, UserPlus, Flame, Loader2, X, Tag, Trash2, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface Turma { id: string; nome: string; }
interface Aluno { 
  id: string; 
  nome: string; 
  streak_atual: number | null; 
  ultima_presenca: string | null; 
  pontos: number | null; 
  turma_id: string | null;
  cla_id: string | null; // <-- Adicionado para detectar se o aluno tem Clã
}
interface Ticket { id: string; student_id: string; note_text: string; created_at: string; }

export default function AlunosTab({ professorId }: { professorId: string }) {
  const [subTab, setSubTab] = useState<"lista" | "novo">("lista");
  
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoadingAlunos, setIsLoadingAlunos] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState<string>(""); 

  const [novoAluno, setNovoAluno] = useState({ nome: "", email: "", senha: "", turma_id: "" });
  const [isCreatingAluno, setIsCreatingAluno] = useState(false);

  // Modal Tickets
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [novoTicketText, setNovoTicketText] = useState("");
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const buscarDadosIniciais = useCallback(async () => {
    const { data: t } = await supabase.from("turmas").select("*").eq("professor_id", professorId).order("created_at", { ascending: true });
    if (t) setTurmas(t);
  }, [professorId]);

  const buscarAlunos = useCallback(async (turmaIdFiltro?: string) => {
    setIsLoadingAlunos(true);
    // Adicionado cla_id no select
    let query = supabase.from("profiles").select("id, nome, streak_atual, ultima_presenca, pontos, turma_id, cla_id").eq("role", "aluno").eq("professor_id", professorId).order("nome", { ascending: true });
    if (turmaIdFiltro) query = query.eq("turma_id", turmaIdFiltro);
    
    const { data } = await query;
    if (data) setAlunos(data);
    setIsLoadingAlunos(false);
  }, [professorId]);

  useEffect(() => {
    buscarDadosIniciais();
    buscarAlunos();
  }, [buscarDadosIniciais, buscarAlunos]);

  const handleCriarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoAluno.turma_id) return toast.error("Selecione uma turma.");

    setIsCreatingAluno(true);
    try {
      const response = await fetch("/api/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novoAluno, professor_id: professorId }),
      });
      if (!response.ok) throw new Error();
      toast.success("Conta de aluno criada com sucesso!");
      setNovoAluno({ nome: "", email: "", senha: "", turma_id: "" });
      buscarAlunos(turmaSelecionada);
      setSubTab("lista");
    } catch (error) {
      toast.error("Falha ao matricular aluno.");
    } finally {
      setIsCreatingAluno(false);
    }
  };

  const handleApagarAluno = async (id: string, nome: string) => {
    if (!window.confirm(`ATENÇÃO: Deseja apagar definitivamente a conta de ${nome}?`)) return;
    const alunosAntigos = [...alunos];
    setAlunos(alunos.filter(a => a.id !== id));

    try {
      const response = await fetch(`/api/alunos?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      toast.success("Aluno removido.");
    } catch (error) {
      toast.error("Erro ao apagar aluno.");
      setAlunos(alunosAntigos); 
    }
  };

  const handleDarPresenca = async (aluno: Aluno) => {
    const novoStreak = (aluno.streak_atual || 0) + 1;
    setAlunos(alunos.map(a => a.id === aluno.id ? { ...a, streak_atual: novoStreak } : a));
    await supabase.from("profiles").update({ streak_atual: novoStreak, ultima_presenca: new Date().toISOString() }).eq("id", aluno.id);
    toast.success(`Fogo subiu para ${novoStreak} dias 🔥`);
  };

  const handleZerarPresenca = async (aluno: Aluno) => {
    if (!window.confirm(`Você tem certeza que deseja zerar a ofensiva (fogo) de ${aluno.nome} por motivo de falta?`)) return;
    
    setAlunos(alunos.map(a => a.id === aluno.id ? { ...a, streak_atual: 0 } : a));
    await supabase.from("profiles").update({ streak_atual: 0 }).eq("id", aluno.id);
    toast("Ofensiva zerada devido à falta.", { icon: "🧊" });
  };

  // A MÁGICA DOS PONTOS ACONTECE AQUI!
  const handleDarPontos = async (aluno: Aluno) => {
    // Se tiver Clã recebe 13, se não tiver recebe 10
    const pontosGanhos = aluno.cla_id ? 13 : 10;
    const novosPontos = (aluno.pontos || 0) + pontosGanhos;
    
    setAlunos(alunos.map(a => a.id === aluno.id ? { ...a, pontos: novosPontos } : a));
    await supabase.from("profiles").update({ pontos: novosPontos }).eq("id", aluno.id);
    
    if (aluno.cla_id) {
      toast.success(`+13 Pontos para ${aluno.nome}! (Bônus de Clã Ativado 🛡️)`);
    } else {
      toast.success(`+10 Pontos para ${aluno.nome}! ⭐`);
    }
  };

  const abrirModalTickets = async (aluno: Aluno) => {
    setAlunoSelecionado(aluno);
    setIsModalOpen(true);
    setIsLoadingTickets(true);
    const { data } = await supabase.from("student_notes").select("*").eq("student_id", aluno.id).order("created_at", { ascending: false });
    setTickets(data || []);
    setIsLoadingTickets(false);
  };

  const handleCriarTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoTicketText.trim() || !alunoSelecionado) return;
    const { data } = await supabase.from("student_notes").insert([{ student_id: alunoSelecionado.id, teacher_id: professorId, note_text: novoTicketText }]).select().single();
    if (data) { setTickets([data, ...tickets]); setNovoTicketText(""); }
  };

  const handleDeletarTicket = async (ticketId: string) => {
    await supabase.from("student_notes").delete().eq("id", ticketId);
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white flex items-center justify-between">
          Gestão de Alunos
        </h1>
      </header>

      <div className="flex gap-4 border-b border-slate-200 dark:border-[#333] pb-4">
        <button onClick={() => setSubTab("lista")} className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${subTab === "lista" ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}>
          <Users size={18} /> Lista da Turma
        </button>
        <button onClick={() => setSubTab("novo")} className={`flex items-center gap-2 px-4 py-2 font-bold transition-colors ${subTab === "novo" ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"}`}>
          <UserPlus size={18} /> Matricular Novo
        </button>
      </div>

      {subTab === "lista" && (
        <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
          <div className="mb-6 flex gap-4 items-center">
            <div className="w-72">
              <select value={turmaSelecionada} onChange={(e) => { setTurmaSelecionada(e.target.value); buscarAlunos(e.target.value); }} className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer">
                <option value="">Todas as Turmas</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {isLoadingAlunos ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-500 dark:text-slate-400" /></div> 
            : alunos.length === 0 ? <div className="text-center py-10 text-slate-500 dark:text-slate-400">Nenhum aluno encontrado.</div>
            : alunos.map((aluno) => (
              <div key={aluno.id} className="flex flex-col 2xl:flex-row 2xl:items-center justify-between p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] hover:border-indigo-200 dark:hover:border-indigo-500/30 rounded-2xl transition-colors gap-4 2xl:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 rounded-full flex items-center justify-center font-black uppercase text-xl shrink-0">{aluno.nome.charAt(0)}</div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">{aluno.nome}</h3>
                    
                    <select 
                      value={aluno.turma_id || ""} 
                      onChange={async (e) => {
                        const novoId = e.target.value;
                        await supabase.from("profiles").update({ turma_id: novoId }).eq("id", aluno.id);
                        setAlunos(alunos.map(a => a.id === aluno.id ? { ...a, turma_id: novoId } : a));
                        toast.success("Aluno transferido de turma!");
                      }}
                      className="text-xs font-bold bg-slate-200 dark:bg-[#333] text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md mt-1 cursor-pointer outline-none border border-slate-300 dark:border-[#444]"
                    >
                      <option value="" disabled>Sem Turma</option>
                      {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
                    </select>

                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-1 font-bold mr-2"><Flame size={20} className={aluno.streak_atual && aluno.streak_atual > 0 ? "animate-pulse text-orange-500" : "text-slate-300 dark:text-slate-600"} /><span className={aluno.streak_atual && aluno.streak_atual > 0 ? "text-orange-500" : "text-slate-400 dark:text-slate-500"}>{aluno.streak_atual || 0}</span></div>
                  <button onClick={() => handleApagarAluno(aluno.id, aluno.nome)} className="px-3 py-2 text-red-500 dark:text-red-500/80 hover:text-red-700 bg-white dark:bg-[#222] border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors" title="Apagar Aluno"><Trash2 size={18} /></button>
                  <button onClick={() => abrirModalTickets(aluno)} className="px-4 py-2 bg-white dark:bg-[#222] border border-slate-300 dark:border-[#444] text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#333] transition-colors">Tickets</button>
                  
                  {/* BOTÃO DE PONTOS DINÂMICO! */}
                  <button onClick={() => handleDarPontos(aluno)} className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 transition-colors border ${aluno.cla_id ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-200 dark:border-yellow-500/20 hover:bg-yellow-100 dark:hover:bg-yellow-500/30"}`}>
                    ⭐ {aluno.cla_id ? "+13 (Clã)" : "+10"}
                  </button>
                  
                  <div className="flex items-center rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                     <button onClick={() => handleZerarPresenca(aluno)} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 text-sm font-semibold flex items-center gap-1 transition-colors border-r border-slate-200 dark:border-slate-700" title="Zerar Fogo (Falta)">
                        <ShieldAlert size={16} /> Falta
                     </button>
                     <button onClick={() => handleDarPresenca(aluno)} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-sm font-semibold transition-colors">
                        + Presença
                     </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "novo" && (
        <div className="max-w-md bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
          {turmas.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400 py-6">Você precisa criar uma turma antes de matricular alunos.</div>
          ) : (
            <form onSubmit={handleCriarAluno} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Turma do Aluno</label><select required value={novoAluno.turma_id} onChange={e => setNovoAluno({...novoAluno, turma_id: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"><option value="">Selecione uma turma...</option>{turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}</select></div>
              <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Nome Completo</label><input required type="text" value={novoAluno.nome} onChange={e => setNovoAluno({...novoAluno, nome: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50" /></div>
              <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">E-mail de Acesso</label><input required type="email" value={novoAluno.email} onChange={e => setNovoAluno({...novoAluno, email: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50" /></div>
              <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Senha Inicial</label><input required type="text" value={novoAluno.senha} onChange={e => setNovoAluno({...novoAluno, senha: e.target.value})} className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50" /></div>
              <button type="submit" disabled={isCreatingAluno} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center transition-colors mt-2">{isCreatingAluno ? <Loader2 className="animate-spin" /> : "Matricular Aluno"}</button>
            </form>
          )}
        </div>
      )}

      {/* MODAL TICKETS */}
      {isModalOpen && alunoSelecionado && (
        <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#111111] rounded-3xl w-full max-w-lg shadow-2xl dark:border dark:border-[#333] flex flex-col max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#222] bg-white dark:bg-[#111111]">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400"><Tag size={24} /><h2 className="text-xl font-bold">Tickets: {alunoSelecionado.nome}</h2></div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><X size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-3 bg-slate-50 dark:bg-[#0a0a0a]">
              {isLoadingTickets ? <div className="flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div> 
              : tickets.length === 0 ? <p className="text-center text-slate-400 text-sm py-4">Nenhum ticket registrado.</p>
              : tickets.map(ticket => (
                <div key={ticket.id} className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-slate-200 dark:border-[#333] flex justify-between items-start gap-4 shadow-sm">
                  <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">{ticket.note_text}</p>
                  <button onClick={() => handleDeletarTicket(ticket.id)} className="text-red-400 hover:text-red-600 dark:hover:text-red-500/80 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-100 dark:border-[#222] bg-white dark:bg-[#111111]">
              <form onSubmit={handleCriarTicket} className="flex gap-2">
                <input type="text" value={novoTicketText} onChange={e => setNovoTicketText(e.target.value)} placeholder="Nova anotação..." className="flex-1 px-4 py-3 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] text-slate-800 dark:text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/50" />
                <button type="submit" disabled={!novoTicketText.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors">Salvar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}