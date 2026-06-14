"use client";

import { useState, useEffect } from "react";
// Olha o PenTool adicionado aqui no import! 👇
import { Loader2, Save, Trash2, Layers, BookOpen, CheckCircle2, ChevronDown, AlertCircle, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface ConfiguracaoAvaliacoesProps {
  professorId: string;
}

export default function ConfiguracaoAvaliacoes({ professorId }: ConfiguracaoAvaliacoesProps) {
  const [turmas, setTurmas] = useState<any[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<string>("");
  const [configs, setConfigs] = useState<any[]>([]);
  
  const [isLoadingTurmas, setIsLoadingTurmas] = useState(true);
  const [isLoadingConfigs, setIsLoadingConfigs] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [semestre, setSemestre] = useState<number>(1);
  const [quantidadeProvas, setQuantidadeProvas] = useState<number>(2);

  useEffect(() => {
    const fetchTurmas = async () => {
      setIsLoadingTurmas(true);
      const { data, error } = await supabase
        .from("turmas")
        .select("id, nome")
        .eq("professor_id", professorId)
        .order("nome");
        
      if (error) {
        console.error("Erro ao buscar turmas:", error);
        toast.error("Falha ao carregar suas turmas.");
      } else if (data) {
        setTurmas(data);
      }
      setIsLoadingTurmas(false);
    };

    if (professorId) fetchTurmas();
  }, [professorId]);

  useEffect(() => {
    const fetchConfigs = async () => {
      if (!selectedTurma) {
        setConfigs([]);
        return;
      }
      setIsLoadingConfigs(true);
      const { data, error } = await supabase
        .from("avaliacoes_config")
        .select("*")
        .eq("turma_id", selectedTurma)
        .order("semestre", { ascending: true });

      if (error) {
        console.error("Erro ao buscar configurações:", error);
        toast.error("Erro ao carregar os semestres.");
      } else if (data) {
        setConfigs(data);
        if (data.length > 0) {
          const maxSemestre = Math.max(...data.map(c => c.semestre));
          setSemestre(maxSemestre + 1);
        } else {
          setSemestre(1);
        }
      }
      setIsLoadingConfigs(false);
    };

    fetchConfigs();
  }, [selectedTurma]);

  const handleSaveConfig = async () => {
    if (!selectedTurma) return toast.error("Selecione uma turma primeiro!");
    if (semestre < 1 || quantidadeProvas < 1) return toast.error("Valores inválidos!");

    setIsSaving(true);

    try {
      const configExistente = configs.find(c => c.semestre === semestre);

      if (configExistente) {
        const { error } = await supabase
          .from("avaliacoes_config")
          .update({ quantidade_provas: quantidadeProvas })
          .eq("id", configExistente.id);
        if (error) throw error;
        toast.success(`Semestre ${semestre} atualizado!`);
      } else {
        const { error } = await supabase
          .from("avaliacoes_config")
          .insert({
            turma_id: selectedTurma,
            semestre: semestre,
            quantidade_provas: quantidadeProvas
          });
        if (error) throw error;
        toast.success(`Semestre ${semestre} salvo com sucesso!`);
      }

      const { data } = await supabase
        .from("avaliacoes_config")
        .select("*")
        .eq("turma_id", selectedTurma)
        .order("semestre", { ascending: true });
      
      if (data) {
        setConfigs(data);
        const maxSemestre = Math.max(...data.map(c => c.semestre));
        setSemestre(maxSemestre + 1);
      }

    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configuração.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfig = async (id: string, sem: number) => {
    if (!confirm(`Atenção: Remover o Semestre ${sem} pode apagar as notas lançadas nele futuramente. Deseja continuar?`)) return;
    
    const { error } = await supabase.from("avaliacoes_config").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao remover.");
    } else {
      toast.success("Semestre removido.");
      setConfigs(configs.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 text-white rounded-2xl">
          <Layers size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Estrutura do Ano Letivo</h2>
          <p className="text-slate-500 dark:text-slate-400">Configure os períodos de avaliação de cada turma.</p>
        </div>
      </div>

      {/* SELEÇÃO DE TURMA */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 block">
          1. Selecione a Turma
        </label>
        
        {isLoadingTurmas ? (
          <div className="flex items-center gap-3 text-indigo-500 p-4">
            <Loader2 className="animate-spin" size={24} /> Carregando turmas...
          </div>
        ) : turmas.length === 0 ? (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/30">
            <AlertCircle size={20} />
            <span className="font-medium">Nenhuma turma encontrada. Você precisa criar uma turma antes de configurar o diário.</span>
          </div>
        ) : (
          <div className="relative">
            <select 
              value={selectedTurma}
              onChange={(e) => setSelectedTurma(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-4 pr-12 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all cursor-pointer font-bold text-lg shadow-inner"
            >
              <option value="" disabled>-- Clique para escolher uma turma --</option>
              {turmas.map(t => (
                <option key={t.id} value={t.id}>{t.nome}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={24} />
          </div>
        )}
      </div>

      {selectedTurma && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORMULÁRIO DE ADIÇÃO */}
          <div className="lg:col-span-1 bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm h-fit">
            <h3 className="font-black text-lg mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500" /> Adicionar Período
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                  Semestre / Bimestre
                </label>
                <div className="flex items-center relative">
                  <span className="absolute left-4 text-slate-400 font-black">Nº</span>
                  <input 
                    type="number" min="1" max="10"
                    value={semestre} onChange={(e) => setSemestre(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 p-4 pl-12 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none dark:text-white font-bold text-lg transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                  Quantidade de Provas
                </label>
                <input 
                  type="number" min="1" max="20"
                  value={quantidadeProvas} onChange={(e) => setQuantidadeProvas(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none dark:text-white font-bold text-lg transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-2 ml-1">
                  Ex: Se for 2, a planilha terá as colunas "Prova 1" e "Prova 2".
                </p>
              </div>

              <button 
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl font-black transition-all disabled:opacity-70 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {configs.find(c => c.semestre === semestre) ? 'Atualizar Semestre' : 'Salvar Semestre'}
              </button>
            </div>
          </div>

          {/* LISTA DE CONFIGURAÇÕES */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-black text-lg mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-500" /> Períodos Configurados
            </h3>

            {isLoadingConfigs ? (
              <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>
            ) : configs.length === 0 ? (
              <div className="text-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 bg-slate-50 dark:bg-[#111111]">
                <Layers className="mx-auto mb-4 opacity-30" size={48} />
                <p className="font-medium">Nenhuma estrutura definida.</p>
                <p className="text-sm mt-1">Crie o primeiro período no painel ao lado para liberar a Planilha de Notas.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {configs.map((config) => (
                    <motion.div 
                      key={config.id}
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center justify-between bg-white dark:bg-[#111111] border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-2xl shadow-inner">
                          {config.semestre}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Semestre {config.semestre}</h4>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            {/* Aqui está o componente que estava causando o erro */}
                            <PenTool size={14} /> {config.quantidade_provas} {config.quantidade_provas === 1 ? 'Prova configurada' : 'Provas configuradas'}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteConfig(config.id, config.semestre)}
                        className="p-3 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                        title="Remover Semestre"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </motion.div>
      )}
    </div>
  );
}