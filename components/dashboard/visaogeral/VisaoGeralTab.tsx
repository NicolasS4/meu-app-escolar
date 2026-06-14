"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

// Nossos sub-componentes modulares
import Header from "./Header";
import KpiCards from "./KpiCards";
import SystemStatus from "./SystemStatus";
import HallDaFama from "./halldafama/HallDaFama";

interface VisaoGeralProps {
  professorId: string;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function VisaoGeralTab({ professorId, theme, setTheme }: VisaoGeralProps) {
  const [stats, setStats] = useState({
    turmas: 0,
    alunos: 0,
    pontosTotais: 0,
    ofensivasAtivas: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEstatisticasGlobais = async () => {
      setIsLoading(true);

      try {
        // 1. Conta Turmas
        const { count: countTurmas } = await supabase
          .from("turmas")
          .select("*", { count: "exact", head: true })
          .eq("professor_id", professorId);
        
        // 2. Busca Dados dos Alunos (para contagem, pontos e ofensivas)
        const { data: alunosData } = await supabase
          .from("profiles")
          .select("pontos, streak_atual")
          .eq("role", "aluno")
          .eq("professor_id", professorId);

        let sumPontos = 0;
        let countOfensivas = 0;

        if (alunosData) {
          alunosData.forEach(aluno => {
            sumPontos += Number(aluno.pontos || 0);
            if (Number(aluno.streak_atual) > 0) {
              countOfensivas += 1;
            }
          });
        }

        setStats({
          turmas: countTurmas || 0,
          alunos: alunosData ? alunosData.length : 0,
          pontosTotais: sumPontos,
          ofensivasAtivas: countOfensivas
        });

      } catch (error) {
        console.error("Erro ao buscar estatísticas", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstatisticasGlobais();
  }, [professorId]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <Loader2 className="animate-spin mb-4 text-indigo-500" size={40} />
        <p className="font-bold animate-pulse text-gray-600 dark:text-gray-300">Carregando painel de inteligência...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. Header (Título e Botão de Tema) */}
      <Header theme={theme} setTheme={setTheme} />

      {/* 2. Métricas de Negócio / Gamificação */}
      <KpiCards 
        totalTurmas={stats.turmas}
        totalAlunos={stats.alunos}
        totalPontos={stats.pontosTotais}
        alunosEmOfensiva={stats.ofensivasAtivas}
      />

      {/* 3. Métricas Técnicas (Servidor / Banco) */}
<SystemStatus professorId={professorId} />
      
      {/* 4. Hall da Fama (Módulo de Ranking) */}
      <HallDaFama professorId={professorId} />

    </div>
  );
}