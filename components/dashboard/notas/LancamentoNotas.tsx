"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, FileSpreadsheet, Users, ChevronDown, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface LancamentoNotasProps {
  professorId: string;
}

interface Aluno { id: string; nome: string; }

export default function LancamentoNotas({ professorId }: LancamentoNotasProps) {
  const [turmas, setTurmas] = useState<any[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<string>("");
  const [configs, setConfigs] = useState<any[]>([]);
  const [selectedSemestre, setSelectedSemestre] = useState<number | "">("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [notas, setNotas] = useState<Record<string, Record<number, string>>>({});
  const [extras, setExtras] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchTurmas = async () => {
      const { data } = await supabase.from("turmas").select("id, nome").eq("professor_id", professorId).order("nome");
      if (data) setTurmas(data);
    };
    fetchTurmas();
  }, [professorId]);

  useEffect(() => {
    const fetchTurmaData = async () => {
      if (!selectedTurma) { setConfigs([]); setAlunos([]); setSelectedSemestre(""); return; }
      setIsLoading(true);
      const { data: configsData } = await supabase.from("avaliacoes_config").select("*").eq("turma_id", selectedTurma).order("semestre");
      if (configsData) setConfigs(configsData);
      const { data: alunosData } = await supabase.from("profiles").select("id, nome").eq("role", "aluno").eq("turma_id", selectedTurma).order("nome");
      if (alunosData) setAlunos(alunosData);
      setIsLoading(false);
    };
    fetchTurmaData();
  }, [selectedTurma]);

  useEffect(() => {
    const fetchNotas = async () => {
      if (!selectedTurma || !selectedSemestre) { setNotas({}); setExtras({}); return; }
      setIsLoading(true);
      const { data } = await supabase.from("notas_alunos").select("*").eq("turma_id", selectedTurma).eq("semestre", selectedSemestre);
      const notasCarregadas: Record<string, Record<number, string>> = {};
      const extrasCarregados: Record<string, string> = {};
      if (data) {
        data.forEach(reg => {
          if (!notasCarregadas[reg.aluno_id]) notasCarregadas[reg.aluno_id] = {};
          notasCarregadas[reg.aluno_id][reg.prova_numero] = reg.nota ? reg.nota.toString() : "";
          if (reg.prova_numero === 1 && reg.pontos_extras) extrasCarregados[reg.aluno_id] = reg.pontos_extras.toString();
        });
      }
      setNotas(notasCarregadas); setExtras(extrasCarregados); setIsLoading(false);
    };
    fetchNotas();
  }, [selectedTurma, selectedSemestre]);

  const handleNotaChange = (alunoId: string, provaNum: number, valor: string) => {
    if (!/^[0-9.,]*$/.test(valor)) return;
    setNotas(prev => ({ ...prev, [alunoId]: { ...(prev[alunoId] || {}), [provaNum]: valor.replace(',', '.') } }));
  };

  const handleExtraChange = (alunoId: string, valor: string) => {
    if (!/^[0-9.,]*$/.test(valor)) return;
    setExtras(prev => ({ ...prev, [alunoId]: valor.replace(',', '.') }));
  };

  const handleSave = async () => {
    const configAtual = configs.find(c => c.semestre === selectedSemestre);
    if (!configAtual || alunos.length === 0) return;
    setIsSaving(true);
    const registrosParaSalvar: any[] = [];
    alunos.forEach(aluno => {
      for (let p = 1; p <= configAtual.quantidade_provas; p++) {
        registrosParaSalvar.push({
          aluno_id: aluno.id, turma_id: selectedTurma, semestre: selectedSemestre,
          prova_numero: p, nota: parseFloat(notas[aluno.id]?.[p]) || 0,
          pontos_extras: p === 1 ? (parseFloat(extras[aluno.id]) || 0) : 0
        });
      }
    });
    try {
      const { error } = await supabase.from("notas_alunos").upsert(registrosParaSalvar, { onConflict: 'aluno_id, turma_id, semestre, prova_numero' });
      if (error) throw error;
      toast.success("Diário salvo com sucesso!", { icon: "📊" });
    } catch (error) { toast.error("Erro ao salvar as notas."); } finally { setIsSaving(false); }
  };

  const calcularMedia = (alunoId: string, qtd: number) => {
    let soma = 0;
    for (let p = 1; p <= qtd; p++) soma += parseFloat(notas[alunoId]?.[p] || "0");
    const media = (soma / qtd) + parseFloat(extras[alunoId] || "0");
    return isNaN(media) ? 0 : media;
  };

  const configAtual = configs.find(c => c.semestre === selectedSemestre);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 text-white rounded-2xl">
          <FileSpreadsheet size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Diário de Classe</h2>
          <p className="text-gray-600 dark:text-gray-300">Lance as notas e pontos extras dos seus alunos.</p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex-1">
          <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Selecione a Turma</label>
          <div className="relative">
            <select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)} className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl p-4 pr-12 focus:border-indigo-500 outline-none transition-all cursor-pointer font-bold shadow-sm">
              <option value="" disabled>-- Turma --</option>
              {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Período (Semestre/Bimestre)</label>
          <div className="relative">
            <select value={selectedSemestre} onChange={(e) => setSelectedSemestre(Number(e.target.value))} disabled={!selectedTurma || configs.length === 0} className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl p-4 pr-12 focus:border-indigo-500 outline-none transition-all cursor-pointer font-bold disabled:opacity-50 shadow-sm">
              <option value="" disabled>-- Selecione o Período --</option>
              {configs.map(c => <option key={c.semestre} value={c.semestre}>Semestre {c.semestre}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* TABELA DE NOTAS */}
      {selectedTurma && selectedSemestre && configAtual && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={40} />
            </div>
          )}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-200 dark:bg-gray-900">
            <h3 className="font-black text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <Users size={20} className="text-indigo-500" /> Notas da Turma
            </h3>
            <button onClick={handleSave} disabled={isSaving || isLoading} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-70 shadow-lg shadow-indigo-600/20 active:scale-95">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Salvar Planilha
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            {alunos.length === 0 ? (
               <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                 <AlertCircle className="mb-3 opacity-50" size={32} />
                 <p>Nenhum aluno matriculado.</p>
               </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600">
                    <th className="p-4 font-black text-gray-700 dark:text-gray-300 text-sm uppercase sticky left-0 bg-gray-200 dark:bg-gray-900 z-10">Aluno</th>
                    {Array.from({ length: configAtual.quantidade_provas }).map((_, i) => (
                      <th key={i} className="p-4 font-black text-gray-700 dark:text-gray-300 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Prova {i + 1}</th>
                    ))}
                    <th className="p-4 font-black text-yellow-600 dark:text-yellow-400 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Extras</th>
                    <th className="p-4 font-black text-indigo-600 dark:text-indigo-400 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Média Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {alunos.map((aluno) => {
                    const media = calcularMedia(aluno.id, configAtual.quantidade_provas);
                    const estaAprovado = media >= 6;
                    return (
                      <tr key={aluno.id} className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors group">
                        <td className="p-4 font-bold text-gray-900 dark:text-white sticky left-0 bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/50 transition-colors shadow-[1px_0_0_0_rgba(0,0,0,0.05)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">{aluno.nome}</td>
                        {Array.from({ length: configAtual.quantidade_provas }).map((_, i) => {
                          const p = i + 1;
                          return (
                            <td key={p} className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                              <input type="text" placeholder="--" value={notas[aluno.id]?.[p] || ""} onChange={(e) => handleNotaChange(aluno.id, p, e.target.value)} className="w-16 p-2 text-center bg-gray-200 dark:bg-gray-700 border border-transparent focus:border-indigo-500 rounded-lg outline-none font-bold text-gray-900 dark:text-white transition-all focus:bg-gray-100 dark:focus:bg-gray-600" />
                            </td>
                          );
                        })}
                        <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center bg-yellow-100/80 dark:bg-yellow-900/40">
                          <input type="text" placeholder="+0" value={extras[aluno.id] || ""} onChange={(e) => handleExtraChange(aluno.id, e.target.value)} className="w-16 p-2 text-center bg-yellow-100 dark:bg-yellow-800/50 border border-transparent focus:border-yellow-500 rounded-lg outline-none font-bold text-yellow-800 dark:text-yellow-300 transition-all placeholder:text-yellow-500 dark:placeholder:text-yellow-600" />
                        </td>
                        <td className="p-4 border-l border-gray-200 dark:border-gray-700 text-center">
                          <span className={`inline-block px-3 py-1 rounded-lg font-black text-sm ${media === 0 ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : estaAprovado ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/30 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-300'}`}>{media.toFixed(1)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}