"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertTriangle, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Importando nossos novos sub-componentes!
import Header from "./Header";
import AnalyticsFilters from "./AnalyticsFilters";
import AnalyticsDashboard from "./AnalyticsDashboard";
import IndividualBi from "./IndividualBi";
import AnalyticsTable from "./AnalyticsTable";

interface AnalyticsBIProps {
  professorId: string;
}

export default function AnalyticsBI({ professorId }: AnalyticsBIProps) {
  const [turmas, setTurmas] = useState<any[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<string>("");
  
  const [configs, setConfigs] = useState<any[]>([]);
  const [selectedSemestre, setSelectedSemestre] = useState<number | "">("");
  
  const [alunos, setAlunos] = useState<any[]>([]);
  const [notasGlobais, setNotasGlobais] = useState<any[]>([]);
  
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
      if (!selectedTurma) {
        setConfigs([]); setAlunos([]); setSelectedSemestre(""); return;
      }
      setIsLoading(true);
      const { data: configsData } = await supabase.from("avaliacoes_config").select("*").eq("turma_id", selectedTurma).order("semestre");
      if (configsData) setConfigs(configsData);

      const { data: alunosData } = await supabase.from("profiles").select("id, nome").eq("role", "aluno").eq("turma_id", selectedTurma).order("nome");
      if (alunosData) setAlunos(alunosData);
      
      setIsLoading(false);
    };
    fetchTurmaData();
  }, [selectedTurma]);

  const fetchNotas = useCallback(async () => {
    if (!selectedTurma || !selectedSemestre) {
      setNotasGlobais([]); setNotas({}); setExtras({}); return;
    }
    setIsLoading(true);
    const { data } = await supabase.from("notas_alunos").select("*").eq("turma_id", selectedTurma).eq("semestre", selectedSemestre);
    
    const notasCarregadas: Record<string, Record<number, string>> = {};
    const extrasCarregados: Record<string, string> = {};

    if (data) {
      setNotasGlobais(data);
      data.forEach(reg => {
        if (!notasCarregadas[reg.aluno_id]) notasCarregadas[reg.aluno_id] = {};
        notasCarregadas[reg.aluno_id][reg.prova_numero] = reg.nota ? reg.nota.toString() : "";
        if (reg.prova_numero === 1 && reg.pontos_extras) {
          extrasCarregados[reg.aluno_id] = reg.pontos_extras.toString();
        }
      });
    } else {
      setNotasGlobais([]);
    }

    setNotas(notasCarregadas);
    setExtras(extrasCarregados);
    setIsLoading(false);
  }, [selectedTurma, selectedSemestre]);

  useEffect(() => { fetchNotas(); }, [fetchNotas]);

  const handleNotaChange = (alunoId: string, provaNum: number, valor: string) => {
    if (!/^[0-9.,]*$/.test(valor)) return;
    const formatado = valor.replace(',', '.');
    setNotas(prev => ({ ...prev, [alunoId]: { ...(prev[alunoId] || {}), [provaNum]: formatado } }));
  };

  const handleExtraChange = (alunoId: string, valor: string) => {
    if (!/^[0-9.,]*$/.test(valor)) return;
    const formatado = valor.replace(',', '.');
    setExtras(prev => ({ ...prev, [alunoId]: formatado }));
  };

  const handleSave = async () => {
    const configAtual = configs.find(c => c.semestre === selectedSemestre);
    if (!configAtual || alunos.length === 0) return;

    setIsSaving(true);
    const registrosParaSalvar: any[] = [];

    alunos.forEach(aluno => {
      for (let p = 1; p <= configAtual.quantidade_provas; p++) {
        const valorNota = parseFloat(notas[aluno.id]?.[p]) || 0;
        const valorExtra = p === 1 ? (parseFloat(extras[aluno.id]) || 0) : 0;
        registrosParaSalvar.push({
          aluno_id: aluno.id, turma_id: selectedTurma, semestre: selectedSemestre,
          prova_numero: p, nota: valorNota, pontos_extras: valorExtra
        });
      }
    });

    try {
      const { error } = await supabase.from("notas_alunos").upsert(registrosParaSalvar, { onConflict: 'aluno_id, turma_id, semestre, prova_numero' });
      if (error) throw error;
      toast.success("Notas salvas e gráfico atualizado!", { icon: "📊" });
      fetchNotas(); 
    } catch (error) {
      toast.error("Erro ao salvar as notas.");
    } finally {
      setIsSaving(false);
    }
  };

  const calcularMedia = (alunoId: string, quantidadeProvas: number) => {
    let soma = 0;
    for (let p = 1; p <= quantidadeProvas; p++) soma += parseFloat(notas[alunoId]?.[p] || "0");
    const media = (soma / quantidadeProvas) + parseFloat(extras[alunoId] || "0");
    return isNaN(media) ? 0 : media;
  };

  const dashboardData = useMemo(() => {
    if (!selectedSemestre || alunos.length === 0 || notasGlobais.length === 0) return null;
    const configAtual = configs.find(c => c.semestre === selectedSemestre);
    if (!configAtual) return null;

    let somaTurma = 0, aprovados = 0, melhorAluno = { nome: "-", media: -1 };
    let totalNotasLançadas = 0;
    
    const dadosGrafico = alunos.map(aluno => {
      const notasAluno = notasGlobais.filter(n => n.aluno_id === aluno.id);
      let somaNotas = 0, pontosExtras = 0;

      notasAluno.forEach(n => {
        if (n.nota > 0) totalNotasLançadas++;
        somaNotas += Number(n.nota || 0);
        if (n.prova_numero === 1) pontosExtras = Number(n.pontos_extras || 0);
      });

      const mediaFinal = Number(((somaNotas / configAtual.quantidade_provas) + pontosExtras).toFixed(1));
      somaTurma += (isNaN(mediaFinal) ? 0 : mediaFinal);
      if (mediaFinal >= 6.0) aprovados++;
      if (mediaFinal > melhorAluno.media) melhorAluno = { nome: aluno.nome, media: mediaFinal };

      return { nome: aluno.nome.split(" ")[0], nomeCompleto: aluno.nome, media: isNaN(mediaFinal) ? 0 : mediaFinal, aprovado: mediaFinal >= 6.0 };
    });

    if (totalNotasLançadas === 0) return null;
    dadosGrafico.sort((a, b) => b.media - a.media);

    return { grafico: dadosGrafico, mediaTurma: (somaTurma / alunos.length).toFixed(1), taxaAprovacao: ((aprovados / alunos.length) * 100).toFixed(0), melhorAluno };
  }, [alunos, notasGlobais, selectedSemestre, configs]);

  const configAtual = configs.find(c => c.semestre === selectedSemestre);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      <Header />

      <AnalyticsFilters 
        turmas={turmas} selectedTurma={selectedTurma} setSelectedTurma={setSelectedTurma}
        configs={configs} selectedSemestre={selectedSemestre} setSelectedSemestre={setSelectedSemestre}
      />

      {isLoading && <div className="flex justify-center p-12"><Loader2 className="animate-spin text-purple-500" size={40} /></div>}

      {!isLoading && dashboardData && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <AnalyticsDashboard dashboardData={dashboardData} />
          <IndividualBi dashboardData={dashboardData} />
        </motion.div>
      )}

      {selectedTurma && selectedSemestre && configAtual && (
        <AnalyticsTable 
          alunos={alunos} configAtual={configAtual} notas={notas} extras={extras}
          handleNotaChange={handleNotaChange} handleExtraChange={handleExtraChange}
          handleSave={handleSave} isSaving={isSaving} isLoading={isLoading} calcularMedia={calcularMedia}
        />
      )}

      {!isLoading && !dashboardData && selectedTurma && selectedSemestre && configAtual && notasGlobais.length === 0 && (
         <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 mt-8">
           <FileSpreadsheet className="mb-4 opacity-50 text-purple-500" size={48} />
           <p className="font-bold text-lg text-gray-800 dark:text-gray-200">Pronto para lançar notas</p>
           <p className="text-sm mt-1 max-w-sm text-gray-600 dark:text-gray-400">A tabela de notas está vazia. Preencha as notas acima e salve para gerar o gráfico de desempenho.</p>
         </div>
      )}
    </div>
  );
}