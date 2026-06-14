// components/dashboard/TrabalhosTab.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Briefcase, Calendar, Trash2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface Projeto { id: string; titulo: string; descricao: string; prazo: string; turma_id: string; }
interface Turma { id: string; nome: string; }

export default function TrabalhosTab({ professorId }: { professorId: string }) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  
  const [novoProjeto, setNovoProjeto] = useState({ titulo: "", descricao: "", prazo: "", turma_id: "" });
  const [projetoExpandido, setProjetoExpandido] = useState<string | null>(null);
  const [modoEquipes, setModoEquipes] = useState<"auto" | "manual">("auto");
  const [equipesProjeto, setEquipesProjeto] = useState<any[]>([]);
  
  const [qtdSorteio, setQtdSorteio] = useState(2);
  const [alunosDaTurmaSelecionada, setAlunosDaTurmaSelecionada] = useState<any[]>([]);
  const [novaEquipeNome, setNovaEquipeNome] = useState("");
  const [alunosSelecionadosManual, setAlunosSelecionadosManual] = useState<string[]>([]);

  const buscarDados = useCallback(async () => {
    const { data: t } = await supabase.from("turmas").select("*").eq("professor_id", professorId).order("created_at", { ascending: true });
    if (t) setTurmas(t);
    const { data: p } = await supabase.from("projetos").select("*").eq("professor_id", professorId).order("created_at", { ascending: false });
    if (p) setProjetos(p);
  }, [professorId]);

  useEffect(() => { buscarDados(); }, [buscarDados]);

  const handleCriarProjeto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoProjeto.turma_id) return toast.error("Selecione uma turma.");
    
    const { data, error } = await supabase.from("projetos").insert([{ ...novoProjeto, professor_id: professorId }]).select().single();
    if (!error && data) {
      toast.success("Trabalho criado!");
      setProjetos([data, ...projetos]);
      setNovoProjeto({ titulo: "", descricao: "", prazo: "", turma_id: "" });
    }
  };

  const handleApagarProjeto = async (id: string) => {
    if (!window.confirm("Apagar este trabalho e todas as equipes dele?")) return;
    await supabase.from("projetos").delete().eq("id", id);
    setProjetos(projetos.filter(p => p.id !== id));
    toast.success("Trabalho apagado.");
  };

  const recarregarEquipes = async (projetoId: string) => {
    const { data: eqs } = await supabase.from("equipes").select("*").eq("projeto_id", projetoId).order("nome");
    if (!eqs) return setEquipesProjeto([]);
    
    const { data: membros } = await supabase.from("equipe_alunos").select("equipe_id, aluno_id, profiles(nome)").in("equipe_id", eqs.map(e => e.id));
    
    const equipesMontadas = eqs.map(e => ({
      ...e,
      membros: membros?.filter(m => m.equipe_id === e.id) || []
    }));
    setEquipesProjeto(equipesMontadas);
  };

  const abrirProjeto = async (projetoId: string, turmaId: string) => {
    if (projetoExpandido === projetoId) return setProjetoExpandido(null);
    setProjetoExpandido(projetoId);
    setModoEquipes("auto"); 
    setNovaEquipeNome("");
    setAlunosSelecionadosManual([]);
    
    const { data: alunosTurma } = await supabase.from("profiles").select("id, nome").eq("turma_id", turmaId).eq("role", "aluno").order("nome");
    if (alunosTurma) setAlunosDaTurmaSelecionada(alunosTurma);
    await recarregarEquipes(projetoId);
  };

  const handleSortearEquipes = async (projetoId: string) => {
    toast.loading("Embaralhando alunos...", { id: "sorteio" });
    await supabase.from("equipes").delete().eq("projeto_id", projetoId); 

    if (alunosDaTurmaSelecionada.length === 0) return toast.error("A turma está vazia.", { id: "sorteio" });

    const shuffled = [...alunosDaTurmaSelecionada].sort(() => Math.random() - 0.5);
    const numGrupos = Math.min(qtdSorteio, shuffled.length);
    const groups: typeof alunosDaTurmaSelecionada[] = Array.from({ length: numGrupos }, () => []);
    
    shuffled.forEach((aluno, i) => groups[i % numGrupos].push(aluno));

    for (let i = 0; i < numGrupos; i++) {
      const { data: equipe } = await supabase.from("equipes").insert({ projeto_id: projetoId, nome: `Equipe ${i + 1}` }).select().single();
      if (equipe && groups[i].length > 0) {
        const relacoes = groups[i].map(a => ({ equipe_id: equipe.id, aluno_id: a.id }));
        await supabase.from("equipe_alunos").insert(relacoes);
      }
    }
    toast.success("Equipes sorteadas!", { id: "sorteio" });
    await recarregarEquipes(projetoId);
  };

  const handleCriarEquipeManual = async (projetoId: string) => {
    if (!novaEquipeNome.trim() || alunosSelecionadosManual.length === 0) return toast.error("Nome da equipe e alunos são obrigatórios.");
    const { data: equipe, error } = await supabase.from("equipes").insert({ projeto_id: projetoId, nome: novaEquipeNome }).select().single();
    if (error || !equipe) return toast.error("Erro ao criar equipe.");

    const relacoes = alunosSelecionadosManual.map(id => ({ equipe_id: equipe.id, aluno_id: id }));
    await supabase.from("equipe_alunos").insert(relacoes);

    toast.success("Equipe criada!");
    setNovaEquipeNome("");
    setAlunosSelecionadosManual([]);
    await recarregarEquipes(projetoId);
  };

  const handleApagarEquipeUnica = async (equipeId: string, projetoId: string) => {
    await supabase.from("equipes").delete().eq("id", equipeId);
    toast.success("Equipe removida.");
    await recarregarEquipes(projetoId);
  };

  const toggleAlunoManual = (id: string) => {
    setAlunosSelecionadosManual(prev => prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="mb-8"><h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Trabalhos em Equipe</h1></header>

      {/* CRIAR PROJETO */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
        <h2 className="text-lg font-bold mb-4">Criar Novo Trabalho</h2>
        <form onSubmit={handleCriarProjeto} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Título do Trabalho</label>
            <input required type="text" value={novoProjeto.titulo} onChange={e => setNovoProjeto({...novoProjeto, titulo: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Instruções aos Alunos</label>
            <textarea required value={novoProjeto.descricao} onChange={e => setNovoProjeto({...novoProjeto, descricao: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" rows={3} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Turma Responsável</label>
            <select required value={novoProjeto.turma_id} onChange={e => setNovoProjeto({...novoProjeto, turma_id: e.target.value})} className="w-full mt-1 px-4 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl outline-none">
              <option value="">Selecione...</option>
              {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Prazo de Entrega</label>
            <input required type="date" value={novoProjeto.prazo} onChange={e => setNovoProjeto({...novoProjeto, prazo: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl outline-none dark:[color-scheme:dark]" />
          </div>
          <div className="col-span-2 flex justify-end mt-2">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-bold transition-colors">Criar e Enviar para Turma</button>
          </div>
        </form>
      </div>

      {/* LISTA DE PROJETOS */}
      <div className="grid grid-cols-1 gap-4">
        {projetos.map(p => {
          const alunosComEquipeIds = equipesProjeto.flatMap(eq => eq.membros.map((m: any) => m.aluno_id));
          const alunosSemEquipe = alunosDaTurmaSelecionada.filter(a => !alunosComEquipeIds.includes(a.id));

          return (
            <div key={p.id} className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] overflow-hidden">
              <div className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1a1a1a] transition-colors flex justify-between items-center" onClick={() => abrirProjeto(p.id, p.turma_id)}>
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2"><Briefcase size={20} className="text-indigo-500"/> {p.titulo}</h3>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1"><Calendar size={14}/> Entrega: {new Date(p.prazo).toLocaleDateString('pt-BR')} | Turma: {turmas.find(t=>t.id===p.turma_id)?.nome}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleApagarProjeto(p.id); }} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><Trash2 size={20}/></button>
              </div>

              {projetoExpandido === p.id && (
                <div className="p-6 bg-slate-50 dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-[#222]">
                  <p className="text-slate-700 dark:text-slate-300 mb-6 whitespace-pre-wrap">{p.descricao}</p>
                  
                  <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-[#333]">
                    <button onClick={() => setModoEquipes("auto")} className={`pb-3 font-bold text-sm transition-colors ${modoEquipes === "auto" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>🎲 Sorteio Automático</button>
                    <button onClick={() => setModoEquipes("manual")} className={`pb-3 font-bold text-sm transition-colors ${modoEquipes === "manual" ? "border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>🛠️ Montar Manualmente</button>
                  </div>

                  {modoEquipes === "auto" && (
                    <div className="flex items-end gap-4 bg-indigo-50 dark:bg-indigo-500/5 p-4 rounded-xl border border-indigo-100 dark:border-indigo-500/20 mb-6">
                      <div>
                        <label className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Qtd Equipes</label>
                        <input type="number" min="1" max="20" value={qtdSorteio} onChange={e => setQtdSorteio(Number(e.target.value))} className="w-full mt-1 px-4 py-2 bg-white dark:bg-black border border-indigo-200 dark:border-[#333] rounded-lg font-bold" />
                      </div>
                      <button onClick={() => handleSortearEquipes(p.id)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Sortear Alunos</button>
                    </div>
                  )}

                  {modoEquipes === "manual" && (
                    <div className="mb-6 bg-white dark:bg-[#111111] p-5 rounded-xl border border-slate-200 dark:border-[#333]">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-4">Criar Equipe Personalizada</h4>
                      <div className="flex gap-4 mb-4">
                        <input type="text" value={novaEquipeNome} onChange={e => setNovaEquipeNome(e.target.value)} placeholder="Nome da equipe" className="flex-1 px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-lg" />
                        <button onClick={() => handleCriarEquipeManual(p.id)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold">Salvar Equipe</button>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Alunos Disponíveis ({alunosSemEquipe.length})</label>
                        <div className="flex flex-wrap gap-2">
                          {alunosSemEquipe.map(aluno => (
                            <div key={aluno.id} onClick={() => toggleAlunoManual(aluno.id)} className={`cursor-pointer px-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center gap-2 ${alunosSelecionadosManual.includes(aluno.id) ? 'bg-indigo-100 dark:bg-indigo-500/30 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'bg-slate-50 dark:bg-[#1a1a1a] text-slate-600 dark:text-slate-400'}`}>
                              {alunosSelecionadosManual.includes(aluno.id) && <CheckCircle2 size={14} />} {aluno.nome}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {equipesProjeto.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {equipesProjeto.map(eq => (
                        <div key={eq.id} className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#333] p-4 rounded-xl relative group">
                          <button onClick={() => handleApagarEquipeUnica(eq.id, p.id)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"><Trash2 size={14} /></button>
                          <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 border-b border-slate-100 dark:border-[#333] pb-2">{eq.nome}</h4>
                          <ul className="space-y-1.5">
                            {eq.membros.map((m: any, i: number) => (
                              <li key={i} className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-slate-300"><div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div> {m.profiles?.nome || 'Aluno Removido'}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}